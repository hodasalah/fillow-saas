import { faBolt, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PrimaryBtn } from '../../../../components/buttons';
import Card from '../../../../components/card';
import TabGroup from '../../../../components/tabGroup';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setLoading } from '../../../../store/slices/loadingSlice';
import { Project } from '../../../../types';
import { fetchProjects } from '../../../../utils/fetchProjects';
import NewProject from './NewProject';

const Projects = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
	const [error, setError] = useState<string | null>(null);
	const [projects, setProjects] = useState<Project[]>([]);
	const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	const [activeTab, setActiveTab] = useState<string>('All Status');
	const TABS = [
		{ id: 'All Status' as string, label: 'All Status' },
		{ id: 'On Progress' as string, label: 'On Progress' },
		{ id: 'Pending' as string, label: 'Pending' },
		{ id: 'Closed' as string, label: 'Closed' },
	];

	const dispatch = useAppDispatch();

	const activeData = useMemo(() => {
		if (activeTab === 'All Status') return projects;
		return projects.filter((project) => project.status === activeTab);
	}, [activeTab, projects]);

	const handleDropdownToggle = (projectId: string) => {
		setOpenDropdownId((prevId) =>
			prevId === projectId ? null : projectId,
		);
	};
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpenDropdownId(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const formatDate = (date: Date | Timestamp) => {
		if (date instanceof Timestamp) {
			date = date.toDate(); // Convert Timestamp to Date
		}
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		return date.toLocaleString('en-US', options);
	};

	useEffect(() => {
		dispatch(setLoading(true));
		fetchProjects()
			.then((projectsData) => {
				setProjects(projectsData);
				setError(null);
				console.log(projectsData);
			})
			.catch((error) => {
				console.error('Error fetching projects:', error);
				setError(error.message || 'Failed to fetch projects');
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	}, [dispatch]);

	const handleProjectAdded = (newProject: Project) => {
		setProjects((prevProjects) => [...prevProjects, newProject]);
		setOpenDropdownId(null);
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
				} w-full bg-body-bg text-[0.875rem] min-h-[calc(100vh-5.3rem)]  pt-[--dz-header-height] h-full`}
		>
			{isOverlayOpen && (
				<NewProject
					onClose={() => setIsOverlayOpen(false)}
					onProjectAdded={handleProjectAdded}
				/>
			)}
			<div className='md:pl-[1.875rem] md:pr-[1.875rem] pt-[1.875rem] p-[0.9375rem] flex  justify-center'>
				<div className='flex justify-between w-full'>
					<TabGroup
						tabs={TABS}
						activeTab={activeTab}
						onTabChange={setActiveTab}
					/>
					<div className='flex items-center max-w-[150px]'>
						<PrimaryBtn onBtnClick={() => setIsOverlayOpen(true)}>
							+ New Project
						</PrimaryBtn>
					</div>
				</div>
			</div>
			{/* projects cards here */}
			<div className='w-full grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:pl-[1.875rem] md:pr-[1.875rem] pt-[1.875rem] p-[0.9375rem]'>
				{error && <div className='text-red-500'>{error}</div>}
				{activeData.length == 0 && (
					<div className='px-4'>No Projects here</div>
				)}
				{activeData.map((project) => (
					<Card key={project.id}>
						<div className='w-full py-3  px-6 grid grid-cols-1 md:grid-cols-[35%_1fr_1fr_1fr_1fr] gap-4 items-center relative'>
							{/* block 1 project info name /desc /createdAt */}
							<div className='flex flex-col justify-center'>
								<div>
									<p className='text-primary mb-0 font-bold'>
										{project.name}
									</p>
									<h6 className='max-w-[75%] text-[--text-dark]  text-sm overflow-hidden whitespace-nowrap text-ellipsis'>
										{project.description}
									</h6>
								</div>
								<div className='text-gray-500 text-sm'>
									Created at: {formatDate(project.startDate)}
								</div>
							</div>
							{/* block 2 client info */}
							<div className='flex items-center gap-2'>
								<img
									src={project.client.image}
									alt={project.client.name}
									className='w-8 h-8 rounded-full bg-black'
								/>
								<div>
									<p className='mb-0 text-gray-500 text-sm'>
										Client
									</p>
									<h6 className='mb-0'>
										{project.client.name}
									</h6>
								</div>
							</div>
							{/* block 3 person in charge info */}
							<div className='flex items-center gap-2'>
								<img
									src={project.personInCharge.image}
									alt={project.personInCharge.name}
									className='w-8 h-8 rounded-full bg-black'
								/>
								<div>
									<p className='mb-0 text-gray-500 text-sm'>
										Person in charge
									</p>
									<h6 className='mb-0'>
										{project.personInCharge.name}
									</h6>
								</div>
							</div>
							{/* block 4 project Deadline */}
							<div className='flex items-center gap-2'>
								<div className='w-8 h-8 rounded-full bg-primary  flex items-center justify-center'>
									<FontAwesomeIcon
										icon={faBolt}
										className='text-white text-[1.2rem]'
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
							<div className='flex justify-end items-center relative'>
								<span
									className={`text-xs px-2 py-1 rounded-full ${
										project.status === 'On Progress'
											? 'bg-blue-100 text-blue-500'
											: project.status === 'Pending'
											? 'bg-yellow-100 text-yellow-500'
											: 'bg-green-100 text-green-500'
									}`}
								>
									{project.status}
								</span>
								<div
									className='relative ml-2'
									ref={dropdownRef}
								>
									<FontAwesomeIcon
										icon={faEllipsisVertical}
										className='text-gray-500 cursor-pointer'
										onClick={() =>
											handleDropdownToggle(project.id)
										}
									/>
									{openDropdownId === project.id && (
										<div className='absolute right-0 top-6 bg-dark border border-gray-300 rounded-md shadow-md z-10'>
											<ul className='py-2'>
												<li className='px-4 py-2 hover:bg-gray-700 hover:text-white cursor-pointer'>
													Edit
												</li>
												<li className='px-4 py-2 hover:bg-gray-700 hover:text-white cursor-pointer'>
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
