import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../../../firebase';
import { useAppDispatch } from '../../../../hooks/hooks';
import { setLoading } from '../../../../store/slices/loadingSlice';
import { Project } from '../../../../types';

interface ProjectFormData {
	name: string;
	description: string;
	clientName: string;
	clientImage: string;
	personInChargeName: string;
	personInChargeImage: string;
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
		clientName: '',
		clientImage: '',
		personInChargeName: '',
		personInChargeImage: '',
		deadline: null,
		status: 'Pending',
	});
	const dispatch = useAppDispatch();

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
			const docRef = await addDoc(collection(db, 'projects'), {
				name: projectFormData.name,
				description: projectFormData.description,
				client: {
					name: projectFormData.clientName,
					image: projectFormData.clientImage,
				},
				personInCharge: {
					name: projectFormData.personInChargeName,
					image: projectFormData.personInChargeImage,
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
					name: projectFormData.clientName,
					image: projectFormData.clientImage,
				},
				personInCharge: {
					name: projectFormData.personInChargeName,
					image: projectFormData.personInChargeImage,
				},
				deadline: projectFormData.deadline!,
				status: projectFormData.status,
				createdAt: new Date(),
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
						htmlFor='clientName'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Client Name
					</label>
					<input
						type='text'
						id='clientName'
						name='clientName'
						value={projectFormData.clientName}
						onChange={handleInputChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='clientImage'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Client Image URL
					</label>
					<input
						type='text'
						id='clientImage'
						name='clientImage'
						value={projectFormData.clientImage}
						onChange={handleInputChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='personInChargeName'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Person in Charge Name
					</label>
					<input
						type='text'
						id='personInChargeName'
						name='personInChargeName'
						value={projectFormData.personInChargeName}
						onChange={handleInputChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='personInChargeImage'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Person in Charge Image URL
					</label>
					<input
						type='text'
						id='personInChargeImage'
						name='personInChargeImage'
						value={projectFormData.personInChargeImage}
						onChange={handleInputChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
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
