import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TabGroup from '../../../../components/TabGroup';
import { PrimaryBtn } from '../../../../components/buttons';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setLoading } from '../../../../store/slices/loadingSlice';
import { Project } from '../../../../types';
import Card from '../../../../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

// Desc: Projects page
const Projects = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
	const [error, setError] = useState<string | null>(null);
	const [projects, setProjects] = useState<Project[]>([]);
	const [data, setData] = useState<Project[]>([]);

	const [activeTab, setActiveTab] = useState<string>('All Status');
	const TABS = [
		{ id: 'All Status' as string, label: 'All Status' },
		{ id: 'On Progress' as string, label: 'On Progress' },
		{ id: 'Pending' as string, label: 'Pending' },
		{ id: 'Closed' as string, label: 'Closed' },
	];

	const dispatch = useAppDispatch();
	const fetchProjects = useCallback(async () => {
		dispatch(setLoading(true));
		setError(null);
		try {
			const response = await fetch('/datas/projects.json');
			if (!response.ok) {
				throw new Error('Failed to fetch projects');
			}
			const data = await response.json();

			setProjects(
				data.projects.map((project: Project) => ({
					...project,
					id: uuidv4(),
				})),
			);
		} catch (error: any) {
			console.error('Error fetching projects:', error);
			setError(error.message);
		} finally {
			dispatch(setLoading(false));
		}
	}, [dispatch]);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	const activeData = useMemo(() => {
		if (activeTab === 'All Status') return projects;
		return projects.filter((project) => project.status === activeTab);
	}, [activeTab, projects]);

	useEffect(() => {
		setData(projects);
	}, [projects]);

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
			<div className='md:pl-[1.875rem] md:pr-[1.875rem] pt-[1.875rem] p-[0.9375rem] flex  justify-center'>
				<div className='flex justify-between w-full'>
					<TabGroup
						tabs={TABS}
						activeTab={activeTab}
						onTabChange={setActiveTab}
					/>
					<div className='flex items-center max-w-[150px]'>
						<PrimaryBtn>+ New Project</PrimaryBtn>
					</div>
				</div>
			</div>
			{/* projects cards here */}
			<div className='w-full'>
				{error && <div className='text-red-500'>{error}</div>}
				{activeData.length == 0 && (
					<div className='px-4'>No Projects here</div>
				)}
				{activeData.map((project) => (
					<Card key={project.id}>
						<div className='py-3 px-4'>
							{/* includes 5 blocks */}
							{/* block 1 project info name /desc /createdAt */}
							<div>
								<p className='text-primary mb-0'>
									{project.name}
								</p>
								<h6 className='text-[--text-dark]'>
									{project.desc}
								</h6>
								<p className='mb-0'>{project.createdAt}</p>
							</div>

							{/* block 2 client info */}
							<div className='flex items-center gap-2'>
								<img
									src={project.clientImg}
									alt={project.clientName}
									className='w-8 h-8 rounded-full bg-black'
								/>
								<div>
									<p className='mb-0'>Client</p>
									<h6 className='mb-0'>
										{project.clientName}
									</h6>
								</div>
							</div>
							{/* block 3 person in charge info */}
							<div className='flex items-center gap-2'>
								<img
									src={project.chargerImg}
									alt={project.chargerName}
									className='w-8 h-8 rounded-full bg-black'
								/>
								<div>
									<p className='mb-0'>Person in charge</p>
									<h6 className='mb-0'>
										{project.chargerName}
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
									<p>Deadline</p>
									<h6>{project.deadline}</h6>
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
