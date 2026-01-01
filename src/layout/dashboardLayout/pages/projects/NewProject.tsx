import { faBriefcase, faCalendar, faTasks, faTimes, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
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
    onProjectUpdated?: (updatedProject: Project) => void;
    projectToEdit?: Project | null;
}

const NewProject: React.FC<NewProjectProps> = ({ onClose, onProjectAdded, onProjectUpdated, projectToEdit }) => {
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

    useEffect(() => {
        if (projectToEdit) {
            setProjectFormData({
                name: projectToEdit.name,
                description: projectToEdit.description,
                clientId: projectToEdit.client.id || '', 
                personInChargeId: projectToEdit.personInCharge.id || '',
                deadline: projectToEdit.deadline,
                status: projectToEdit.status,
            });
        }
    }, [projectToEdit]);

    // Fetch clients
    useEffect(() => {
        const loadClients = async () => {
            try {
                const clientsData = await fetchClients();
                setClients(clientsData);
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
    }, [dispatch]);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

    const handleSubmit = async () => {
        try {
            dispatch(setLoading(true));
            // Find selected users
            const selectedClient = allUsers.find((user) => user.uid === projectFormData.clientId);
            const selectedPersonInCharge = allUsers.find((user) => user.uid === projectFormData.personInChargeId);

            const projectPayload = {
                name: projectFormData.name,
                description: projectFormData.description,
                client: {
                    name: selectedClient?.name || '',
                    image: selectedClient?.profilePicture || '',
                    id: projectFormData.clientId,
                },
                personInCharge: {
                    name: selectedPersonInCharge?.name || '',
                    image: selectedPersonInCharge?.profilePicture || '',
                    id: projectFormData.personInChargeId,
                },
                deadline: projectFormData.deadline,
                status: projectFormData.status,
            };

            if (!projectFormData.deadline) {
                // simple validation
                // you might want to show error
            }

            if (projectToEdit) {
                // Update existing project
                const projectRef = doc(db, 'projects', projectToEdit.id);
                
                // We need to match the structure that updateDoc expects
                // Using 'any' cast for payload to avoid strict type mismatch with partial updates if necessary
                await updateDoc(projectRef, {
                    ...projectPayload,
                });
                
                const updatedProject: Project = {
                    ...projectToEdit,
                    ...projectPayload,
                    deadline: projectFormData.deadline!,
                    client: projectPayload.client, 
                    personInCharge: projectPayload.personInCharge
                } as Project;

                if (onProjectUpdated) onProjectUpdated(updatedProject);

            } else {
                // Add new project
                const currentDate = new Date();
                const docRef = await addDoc(collection(db, 'projects'), {
                    ...projectPayload,
                    createdAt: serverTimestamp(),
                    members: [],
                    ownerId: '',
                    startDate: currentDate,
                    endDate: null,
                    tags: [] 
                });

                const newProject: Project = {
                    id: docRef.id,
                    ...projectPayload,
                    deadline: projectFormData.deadline!,
                    startDate: currentDate, 
                    endDate: null,
                    members: [],
                    ownerId: '',
                    tags: []
                } as Project;

                onProjectAdded(newProject);
            }
            onClose();
        } catch (e) {
            console.error('Error saving project: ', e);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-200'>
            <div 
                className='bg-white dark:bg-[#1e1e2d] w-full max-w-2xl rounded-2xl shadow-2xl transform transition-all animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className='px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-white/5'>
                    <div>
                        <h2 className='text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>
                            {projectToEdit ? 'Edit Project' : 'Create New Project'}
                        </h2>
                        <p className='text-gray-500 dark:text-gray-400 text-sm mt-1'>
                            {projectToEdit ? 'Update project details and status' : 'Fill in the details to kickstart a new initiative'}
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 transition-colors'
                    >
                        <FontAwesomeIcon icon={faTimes} className="text-xl" />
                    </button>
                </div>

                {/* Body */}
                <div className='p-8 overflow-y-auto custom-scrollbar space-y-6'>
                    
                    {/* Project Name Group */}
                    <div className="space-y-4">
                        <div className="relative group">
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">Project Name</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400">
                                    <FontAwesomeIcon icon={faBriefcase} />
                                </span>
                                <input
                                    type='text'
                                    name='name'
                                    value={projectFormData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Website Redesign"
                                    className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium'
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">Description</label>
                            <textarea
                                name='description'
                                value={projectFormData.description}
                                onChange={handleInputChange}
                                placeholder="Describe the project goals and requirements..."
                                rows={3}
                                className='w-full p-4 bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none'
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Client Select */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">Client</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <select
                                    name='clientId'
                                    value={projectFormData.clientId}
                                    onChange={handleInputChange}
                                    className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer'
                                >
                                    <option value=''>Select Client</option>
                                    {clients.map((user) => (
                                        <option key={user.uid} value={user.uid}>{user.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Person In Charge Select */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">Lead</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400">
                                    <FontAwesomeIcon icon={faUsers} />
                                </span>
                                <select
                                    name='personInChargeId'
                                    value={projectFormData.personInChargeId}
                                    onChange={handleInputChange}
                                    className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer'
                                >
                                    <option value=''>Select Leader</option>
                                    {allUsers.map((user) => (
                                        <option key={user.uid} value={user.uid}>{user.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Deadline Input */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">Deadline</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400">
                                    <FontAwesomeIcon icon={faCalendar} />
                                </span>
                                <input
                                    type='date'
                                    name='deadline'
                                    value={projectFormData.deadline ? new Date(projectFormData.deadline).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleDateChange(e.target.value ? new Date(e.target.value) : null)}
                                    className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none'
                                />
                            </div>
                        </div>

                        {/* Status Select */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">Status</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400">
                                    <FontAwesomeIcon icon={faTasks} />
                                </span>
                                <select
                                    name='status'
                                    value={projectFormData.status}
                                    onChange={handleInputChange}
                                    className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer'
                                >
                                    <option value='Pending'>Pending</option>
                                    <option value='On Progress'>On Progress</option>
                                    <option value='Closed'>Closed</option>
                                    <option value='Completed'>Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className='p-6 bg-gray-50/50 dark:bg-white/5 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3'>
                    <button
                        onClick={onClose}
                        className='px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 transition-all'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all'
                    >
                        {projectToEdit ? 'Save Changes' : 'Create Project'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProject;
