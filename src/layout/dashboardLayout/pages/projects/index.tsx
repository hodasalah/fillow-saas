import { faBolt, faCheck, faDatabase, faEllipsisVertical, faTrash, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { PrimaryBtn } from '../../../../components/buttons';
import Card from '../../../../components/card';
import TabGroup from '../../../../components/tabGroup';
import { db } from '../../../../firebase';
import { useAppSelector } from '../../../../hooks/hooks';
import { Project } from '../../../../types';
import { fetchProjects } from '../../../../utils/fetchProjects';
import { seedClients } from '../../../../utils/seedClients';
import { seedProjects } from '../../../../utils/seedProjects';
import NewProject from './NewProject';

const Projects = () => {
    const mode = useAppSelector((state) => state.sidebar.mode);
    const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
    const [error, setError] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

    const [activeTab, setActiveTab] = useState<string>('All Status');
    const TABS = [
        { id: 'All Status' as string, label: 'All Status' },
        { id: 'Overdue' as string, label: 'Overdue' },
        { id: 'On Progress' as string, label: 'On Progress' },
        { id: 'Pending' as string, label: 'Pending' },
        { id: 'Closed' as string, label: 'Closed' },
        { id: 'Completed' as string, label: 'Completed' },
    ];

    const formatStatus = (status: string) => {
        if (!status) return '';
        const normalized = status.toLowerCase().trim();
        if (normalized === 'in-progress' || normalized === 'inprogress' || normalized === 'on progress') {
            return 'On Progress';
        }
        // Capitalize first letter of each word
        return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const isProjectOverdue = (project: Project) => {
        const now = new Date();
        let deadlineDate = project.deadline;
        
        if (deadlineDate instanceof Timestamp) {
            deadlineDate = deadlineDate.toDate();
        } else if (typeof deadlineDate === 'string') {
            deadlineDate = new Date(deadlineDate);
        }

        const isOverdue = deadlineDate && deadlineDate instanceof Date && deadlineDate < now;
        const isFinished = project.status === 'Closed' || project.status === 'Completed' || project.status === 'Pending';
        
        return isOverdue && !isFinished;
    };

    const activeData = useMemo(() => {
        if (activeTab === 'All Status') return projects;
        if (activeTab === 'Overdue') {
            return projects.filter(isProjectOverdue);
        }
        return projects.filter((project) => {
            const status = formatStatus(project.status);
            return status && status.toLowerCase() === activeTab.toLowerCase();
        });
    }, [activeTab, projects]);

    const handleDropdownToggle = (projectId: string) => {
        setOpenDropdownId((prevId) =>
            prevId === projectId ? null : projectId,
        );
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if ((event.target as HTMLElement).closest('.dropdown-container')) return;
            setOpenDropdownId(null);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const formatDate = (date: Date | Timestamp) => {
        if (!date) return 'N/A';
        if (date instanceof Timestamp) {
            date = date.toDate();
        }
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return date.toLocaleString('en-US', options);
    };



    const getBadgeStyles = (project: Project) => {
        const now = new Date();
        let deadlineDate = project.deadline;
        
        if (deadlineDate instanceof Timestamp) {
            deadlineDate = deadlineDate.toDate();
        } else if (typeof deadlineDate === 'string') {
            deadlineDate = new Date(deadlineDate);
        }

        const isOverdue = deadlineDate && deadlineDate instanceof Date && deadlineDate < now;
        const formattedStatus = formatStatus(project.status);
        const isFinished = ['Closed', 'Completed', 'Pending'].includes(formattedStatus);

        if (isOverdue && !isFinished) {
            return 'bg-red-100 text-red-700 border-red-200';
        }

        switch (formattedStatus) {
            case 'On Progress':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Closed':
                return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'Completed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const loadProjects = () => {
        setIsLoading(true);
        fetchProjects()
        .then((projectsData) => {
            setProjects(projectsData);
            setError(null);
        })
        .catch((error) => {
            console.error('Error fetching projects:', error);
            setError(error.message || 'Failed to fetch projects');
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleProjectAdded = (newProject: Project) => {
        setProjects((prevProjects) => [newProject, ...prevProjects]);
        setIsOverlayOpen(false);
    };
    
    const handleProjectUpdated = (updatedProject: Project) => {
        setProjects((prevProjects) => 
            prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p)
        );
        setIsOverlayOpen(false);
        setProjectToEdit(null);
    };

    const handleEditClick = (project: Project) => {
        setProjectToEdit(project);
        setIsOverlayOpen(true);
        setOpenDropdownId(null);
    };

    const handleSeedData = async () => {
        setIsLoading(true);
        await seedProjects(5);
        await loadProjects();
        setIsLoading(false);
    };

    const handleSeedClients = async () => {
        setIsLoading(true);
        await seedClients(5);
        setIsLoading(false);
        // Simple alert for now, could be improved with toast
        window.alert('Seeded 5 fake clients successfully!');
    };

    const handleDeleteProject = async (projectId: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                setIsLoading(true);
                await deleteDoc(doc(db, 'projects', projectId));
                setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
                setOpenDropdownId(null);
            } catch (error) {
                console.error('Error deleting project:', error);
                setError('Failed to delete project');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleBulkDelete = async () => {
        if (selectedProjects.length === 0) return;
        if (window.confirm(`Are you sure you want to delete ${selectedProjects.length} projects?`)) {
            try {
                setIsLoading(true);
                // Use Promise.all for simplicity as batch has a limit of 500
                const deletePromises = selectedProjects.map((id) => deleteDoc(doc(db, 'projects', id)));
                await Promise.all(deletePromises);
                
                setProjects((prevProjects) => prevProjects.filter((p) => !selectedProjects.includes(p.id)));
                setSelectedProjects([]);
                setOpenDropdownId(null);
            } catch (error) {
                console.error('Error deleting projects:', error);
                setError('Failed to delete selected projects');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const toggleSelection = (projectId: string) => {
        setSelectedProjects((prev) => 
            prev.includes(projectId) 
                ? prev.filter((id) => id !== projectId) 
                : [...prev, projectId]
        );
    };

    const handleNewProjectClick = () => {
        setProjectToEdit(null);
        setIsOverlayOpen(true);
    };

    return (
        <div
            className={`
                ${
                    isMobileView
                        ? 'px-3'
                        : mode === 'wide'
                        ? 'pl-[var(--dz-sidebar-width)]'
                        : 'pl-[var(--dz-sidebar-width-mobile)]'
                } w-full bg-body-bg text-[0.875rem] min-h-[calc(100vh-5.3rem)] pt-[--dz-header-height] h-full`}
        >
            {isOverlayOpen && (
                <NewProject
                    onClose={() => {
                        setIsOverlayOpen(false);
                        setProjectToEdit(null);
                    }}
                    onProjectAdded={handleProjectAdded}
                    onProjectUpdated={handleProjectUpdated}
                    projectToEdit={projectToEdit}
                />
            )}
            <div className='sticky top-[var(--dz-header-height)] z-10 bg-body-bg pl-0 md:pl-[1.875rem] md:pr-[1.875rem] pt-[1.875rem] p-[0.9375rem] flex justify-center pb-4 transition-all'>
                <div className='flex justify-between w-full items-center flex-wrap gap-4'>
                    <TabGroup
                        tabs={TABS}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                    <div className='flex items-center gap-3'>
                        
                        {selectedProjects.length > 0 && (
                            <button 
                                onClick={handleBulkDelete}
                                className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded-xl inline-flex items-center gap-2 transition-all animate-in fade-in slide-in-from-right-4 duration-300"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                <span>Delete ({selectedProjects.length})</span>
                            </button>
                        )}

                        <button 
                            onClick={handleSeedData}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center gap-2 transition-colors"
                        >
                            <FontAwesomeIcon icon={faDatabase} />
                            <span>Seed Data</span>
                        </button>
                        <button 
                            onClick={handleSeedClients}
                            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-2 px-4 rounded inline-flex items-center gap-2 transition-colors"
                        >
                            <FontAwesomeIcon icon={faUserGroup} />
                            <span>Seed Clients</span>
                        </button>
                        <div className='w-[150px]'>
                            <PrimaryBtn onBtnClick={handleNewProjectClick}>
                                + New Project
                            </PrimaryBtn>
                        </div>
                    </div>
                </div>
            </div>
            {/* projects cards here */}
            <div className='w-full grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:pl-[1.875rem] md:pr-[1.875rem] pt-[1.875rem] p-[0.9375rem]'>
                {isLoading && (
                    <div className="col-span-full flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {!isLoading && error && <div className='text-red-500 col-span-full'>{error}</div>}
                {!isLoading && !error && activeData.length === 0 && (
                    <div className='px-4 text-gray-500 col-span-full'>No projects found. Try seeding data!</div>
                )}
                {!isLoading && activeData.map((project) => (
                    <Card key={project.id}>
                        <div className={`w-full py-3 px-6 grid grid-cols-1 md:grid-cols-[35%_1fr_1fr_1fr_1fr] gap-4 items-center relative transition-colors ${selectedProjects.includes(project.id) ? 'bg-primary/5' : ''}`}>
                            
                            {/* Selection Checkbox */}
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:block">
                                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={`check-${project.id}`}>
                                    <input
                                        type="checkbox"
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10"
                                        id={`check-${project.id}`}
                                        checked={selectedProjects.includes(project.id)}
                                        onChange={() => toggleSelection(project.id)}
                                    />
                                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                                    </span>
                                </label>
                            </div>

                             {/* Mobile selection overlay/wrapper would be needed properly, but relying on grid shift for now or specific placement */}
                             {/* For this layout (grid-cols-[35%_...]) we need to adjust padding or column sizes if we inject a column at start. 
                                 However, to avoid breaking the grid drastically, I will use absolute positioning or just add it to the first block padding.
                             */}

                            {/* block 1 project info name /desc /createdAt - Added padding-left for checkbox */}
                            <div className='flex flex-col justify-center overflow-hidden md:pl-8'> 
                                <div>
                                    <p className='text-primary mb-0 font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
                                        {project.name}
                                    </p>
                                    <h6 className='text-[--text-dark] text-sm overflow-hidden whitespace-nowrap text-ellipsis'>
                                        {project.description}
                                    </h6>
                                </div>
                                <div className='text-gray-500 text-sm mt-1'>
                                    Created at: {formatDate(project.startDate)}
                                </div>
                            </div>
                            {/* block 2 client info */}
                            <div className='flex items-center gap-2 overflow-hidden'>
                                <img
                                    src={project.client.image || 'https://via.placeholder.com/150'}
                                    alt={project.client.name}
                                    className='w-8 h-8 rounded-full bg-gray-200 object-cover flex-shrink-0'
                                />
                                <div className="overflow-hidden">
                                    <p className='mb-0 text-gray-500 text-sm'>
                                        Client
                                    </p>
                                    <h6 className='mb-0 whitespace-nowrap overflow-hidden text-ellipsis'>
                                        {project.client.name}
                                    </h6>
                                </div>
                            </div>
                            {/* block 3 person in charge info */}
                            <div className='flex items-center gap-2 overflow-hidden'>
                                <img
                                    src={project.personInCharge.image || 'https://via.placeholder.com/150'}
                                    alt={project.personInCharge.name}
                                    className='w-8 h-8 rounded-full bg-gray-200 object-cover flex-shrink-0'
                                />
                                <div className="overflow-hidden">
                                    <p className='mb-0 text-gray-500 text-sm'>
                                        Person in charge
                                    </p>
                                    <h6 className='mb-0 whitespace-nowrap overflow-hidden text-ellipsis'>
                                        {project.personInCharge.name}
                                    </h6>
                                </div>
                            </div>
                            {/* block 4 project Deadline */}
                            <div className='flex items-center gap-2'>
                                <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                                    <FontAwesomeIcon
                                        icon={faBolt}
                                        className='text-primary text-[1rem]'
                                    />
                                </div>
                                <div>
                                    <p className='text-gray-500 text-sm'>
                                        Deadline
                                    </p>
                                    <h6>{formatDate(project.deadline)}</h6>
                                </div>
                            </div>
                            {/* block 5 project status and dropdown */}
                            <div className='flex justify-end items-center relative gap-2'>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full border whitespace-nowrap ${getBadgeStyles(project)}`}
                                >
                                    {isProjectOverdue(project) ? 'Overdue' : formatStatus(project.status)}
                                </span>
                                <div
                                    className='relative dropdown-container'
                                >
                                    <button 
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                        onClick={() => handleDropdownToggle(project.id)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faEllipsisVertical}
                                            className='text-gray-500'
                                        />
                                    </button>
                                    {openDropdownId === project.id && (
                                        <div className='absolute right-0 top-10 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg z-20 w-32 overflow-hidden animate-in fade-in zoom-in-95 duration-100'>
                                            <ul className='py-1'>
                                                <li 
                                                    className='px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 text-sm cursor-pointer transition-colors block text-left'
                                                    onClick={() => handleEditClick(project)}
                                                >
                                                    Edit
                                                </li>
                                                <li 
                                                    className='px-4 py-2 hover:bg-red-50 text-red-600 dark:hover:bg-red-900/10 text-sm cursor-pointer transition-colors block text-left'
                                                    onClick={() => handleDeleteProject(project.id)}
                                                >
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Projects;
