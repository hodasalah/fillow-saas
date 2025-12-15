import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import { useAppDispatch } from '../../../../hooks/hooks';
import { setLoading } from '../../../../store/slices/loadingSlice';
import { Project, User } from '../../../../types';
import { fetchUsers } from '../../../../utils/fetchUsers';
import { fetchClients } from '../../../../utils/userUtils';

interface ProjectFormData {
	name: string;
	description: string;
	clientId: string;
	personInChargeId: string;
	deadline: Date | null;
	status: string;
}

interface NewProjectProps {
	onClose: () => void;
	onProjectAdded: (newProject: Project) => void;
}

const NewProject: React.FC<NewProjectProps> = ({ onClose, onProjectAdded }) => {
	const [projectFormData, setProjectFormData] = useState<ProjectFormData>({
		name: '',
		description: '',
		clientId: '',
		personInChargeId: '',
		deadline: null,
		status: 'Pending',
	});
	const [clients, setClients] = useState<User[]>([]);
	const [allUsers, setAllUsers] = useState<User[]>([]);
	const dispatch = useAppDispatch();

	// Fetch clients
	useEffect(() => {
		const loadClients = async () => {
			try {
				const clientsData = await fetchClients();
				setClients(clientsData);
				//console.log(clientsData);
			} catch (error) {
				console.error('Error loading clients:', error);
			}
		};

		loadClients();
	}, []);

	// Fetch all users
	useEffect(() => {
		const loadAllUsers = async () => {
			try {
				const actionResult = await dispatch(fetchUsers());
				const usersData = fetchUsers.fulfilled.match(actionResult)
					? actionResult.payload
					: [];
				setAllUsers(usersData as User[]);
			} catch (error) {
				console.error('Error loading all users:', error);
			}
		};

		loadAllUsers();
	}, []);
	const handleInputChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
			| React.ChangeEvent<HTMLSelectElement>,
	) => {
		const { name, value } = event.target;
		setProjectFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleDateChange = (date: Date | null) => {
		setProjectFormData((prevData) => ({
			...prevData,
			deadline: date,
		}));
	};

	const handleSaveProject = async () => {
		try {
			dispatch(setLoading(true));
			// Find the selected client and person in charge details
			const selectedClient = allUsers.find(
				(user) => user.uid === projectFormData.clientId,
			);
			const selectedPersonInCharge = allUsers.find(
				(user) => user.uid === projectFormData.personInChargeId,
			);

			const docRef = await addDoc(collection(db, 'projects'), {
				name: projectFormData.name,
				description: projectFormData.description,
				client: {
					name: selectedClient?.name || '',
					image: selectedClient?.image || '',
					id: projectFormData.clientId,
				},
				personInCharge: {
					name: selectedPersonInCharge?.name || '',
					image: selectedPersonInCharge?.image || '',
					id: projectFormData.personInChargeId,
				},
				deadline: projectFormData.deadline,
				status: projectFormData.status,
				createdAt: serverTimestamp(),
				members: [],
				ownerId: '',
			});
			console.log('Document written with ID: ', docRef.id);

			// Create the new project object to pass to the parent component
			const newProject: Project = {
				id: docRef.id,
				name: projectFormData.name,
				description: projectFormData.description,
				client: {
					name: selectedClient?.name || '',
					image: selectedClient?.image || '',
					id: projectFormData.clientId,
				},
				personInCharge: {
					name: selectedPersonInCharge?.name || '',
					image: selectedPersonInCharge?.image || '',
					id: projectFormData.personInChargeId,
				},
				deadline: projectFormData.deadline!,
				status: projectFormData.status,
				startDate: new Date(),
				members: [],
				ownerId: '',
			};

			onProjectAdded(newProject);
			onClose();
		} catch (e) {
			console.error('Error adding document: ', e);
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white p-8 rounded-lg w-[500px]'>
				<h2 className='text-2xl font-bold mb-4'>New Project</h2>
				<div className='mb-4'>
					<label
						htmlFor='name'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Project Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={projectFormData.name}
						onChange={handleInputChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='description'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={projectFormData.description}
						onChange={handleInputChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='clientId'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Client
					</label>
					<select
						id='clientId'
						name='clientId'
						value={projectFormData.clientId}
						onChange={handleInputChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select a Client</option>
						{clients.map((user) => (
							<option
								key={user.uid}
								value={user.uid}
							>
								{user.name}
							</option>
						))}
					</select>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='personInChargeId'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Person in Charge
					</label>
					<select
						id='personInChargeId'
						name='personInChargeId'
						value={projectFormData.personInChargeId}
						onChange={handleInputChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select a Person in Charge</option>
						{allUsers.map((user) => (
							<option
								key={user.uid}
								value={user.uid}
							>
								{user.name}
							</option>
						))}
					</select>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='deadline'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Deadline
					</label>
					<input
						type='date'
						id='deadline'
						name='deadline'
						onChange={(e) =>
							handleDateChange(
								e.target.value
									? new Date(e.target.value)
									: null,
							)
						}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='status'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Status
					</label>
					<select
						id='status'
						name='status'
						value={projectFormData.status}
						onChange={handleInputChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value='Pending'>Pending</option>
						<option value='On Progress'>On Progress</option>
						<option value='Closed'>Closed</option>
					</select>
				</div>
				<div className='flex justify-end'>
					<button
						onClick={onClose}
						className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
					>
						Cancel
					</button>
					<button
						onClick={handleSaveProject}
						className='bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewProject;
