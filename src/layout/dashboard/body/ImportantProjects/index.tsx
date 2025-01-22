import { useCallback, useEffect, useState } from 'react';
import { PrimaryOutlineBtn } from '../../../../components/buttons';
import Card from '../../../../components/Card';
import { useAppDispatch } from '../../../../hooks/hooks';
import { setLoading } from '../../../../store/slices/loadingSlice';
import ProjectItem from './ProjectItem';

export interface Project {
	id: number;
	name: string;
	category: string;
	description: string;
	image: string;
	tags: Tag[];
	progress: number;
	deadline: string;

	// Add other project properties here
}
export interface Tag {
	name: string;
	color: string;
	bg: string;
}
const ImportantProjects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [error, setError] = useState<string | null>(null);
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
			dispatch(setLoading(false));
			setProjects(data.projects);
		} catch (error) {
			console.error('Error fetching projects:', error);
			setError('Failed to fetch projects Please try again later.');
		} finally {
			dispatch(setLoading(false));
		}
	}, [dispatch]);

	useEffect(() => {
		fetchProjects();
	}, []);

	const MAX_RETRIES = 3;
	const [retryCount, setRetryCount] = useState(0);

	const handleRetry = async () => {
		if (retryCount >= MAX_RETRIES) {
			setError('Maximum retry attempts reached. Please try again later.');
			return;
		}
		setRetryCount((prev) => prev + 1);
		setError(null);
		try {
			await fetchProjects();
		} catch (error) {
			console.error('Retry attempt failed:', error);
			setError('Retry attempt failed. Please try again later.');
		}
	};
	return (
		<div>
			<Card>
				<div className='w-full p-[1.875rem]'>
					<div className=''>
						<h4 className='mb-0 text-xl font-semibold text-[var(--text-dark)] capitalize mt-0'>
							Important Projects
						</h4>
						<span className='text-sm'>
							Check your Important Projects here
						</span>
					</div>
					{/* if there is an error */}
					{error && (
						<div className='p-4 text-center bg-red-100'>
							<p className='text-red-500'>{error}</p>
							<button
								onClick={handleRetry}
								className='mt-2 px-4 py-2 bg-[var(--primary)] text-white rounded-md'
							>
								Retry
							</button>
						</div>
					)}
					{/* projects */}
					<div className='pt-3 pb-0'>
						{projects.map((project) => (
							<ProjectItem
								key={project.id}
								project={project}
							/>
						))}
					</div>
					{/* Pin Other Projects btn */}
					<div className='mt-4'>
						<PrimaryOutlineBtn>
							Pin Other Projects
						</PrimaryOutlineBtn>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ImportantProjects;
