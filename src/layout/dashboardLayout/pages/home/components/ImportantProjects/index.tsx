import { memo } from 'react';
import { PrimaryOutlineBtn } from '../../../../../../components/buttons';
import Card from '../../../../../../components/card';
import { Project } from '../../../../../../types';
import ProjectItem from './ProjectItem';

interface ImportantProjectsProps {
	projects: Project[];
}

const ImportantProjects = memo(({ projects }: ImportantProjectsProps) => {
	const importantProjects = projects.slice(0, 5); // Show only top 5 projects

	return (
		<div className='w-full shadow-custom-shadow'>
			<Card>
				<div className='p-[1.875rem] pb-0 w-full'>
					<div className='flex justify-between items-center mb-4'>
						<div>
							<h4 className='mb-0 text-xl font-semibold text-[var(--text-dark)] capitalize mt-0'>
								Important Projects
							</h4>
							<span className='text-sm'>
								Ongoing projects requiring attention
							</span>
						</div>
						<div className='max-w-fit'>
							<div className='w-36 h-12'>
								<PrimaryOutlineBtn>View More</PrimaryOutlineBtn>
							</div>
						</div>
					</div>
					<div className='space-y-4'>
						{importantProjects.map((project) => (
							<ProjectItem
								key={project.id}
								project={project}
							/>
						))}
					</div>
				</div>
			</Card>
		</div>
	);
});

ImportantProjects.displayName = 'ImportantProjects';

export default ImportantProjects;
