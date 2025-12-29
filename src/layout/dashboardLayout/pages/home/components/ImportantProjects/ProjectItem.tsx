import { FC, memo } from 'react';
import DropdownDelEditBtn from '../../../../../../components/dropdownDelEditBtn';
import ProgressBar from '../../../../../../components/progressBar';
import { Project } from '../../../../../../types';
import ProjectTag from './ProjectTag';



interface ProjectItemProps {
	project: Project;
}

const ProjectItem: FC<ProjectItemProps> = memo(({ project }) => {
	const progress = Math.round(
		((new Date().getTime() - new Date(project.startDate).getTime()) /
			(new Date(project.deadline).getTime() -
				new Date(project.startDate).getTime())) *
			100,
	);

	return (
		<div className='w-full border-b border-[var(--border)] last:border-b-0 pb-4 last:pb-0'>
			<div className='flex items-center justify-between mb-2'>
				<div className='flex items-center'>
					<img
						src={project.client?.image || '/assets/fallback.png'}
						alt={project.client?.name || 'Client'}
						className='w-10 h-10 rounded-full object-cover'
					/>
					<div className='ml-3'>
						<h5 className='text-base font-medium text-[var(--text-dark)]'>
							{project.name}
						</h5>
						<p className='text-sm text-[var(--text-light)]'>
							{project.description}
						</p>
					</div>
				</div>
				<div className='flex items-center gap-4'>
					<span className='text-sm text-[var(--text-light)]'>
						{new Date(project.deadline).toLocaleDateString()}
					</span>
					<DropdownDelEditBtn
						links={[
							{ id: 'edit', name: 'Edit' },
							{ id: 'delete', name: 'Delete' },
						]}
						onEditBtn={() => {}}
						onDeleteBtn={() => {}}
					/>
				</div>
			</div>
			<div className='mt-2'>
				<ProgressBar progress={progress} />
			</div>
			{project.tags?.length > 0 ? (
				<div className='my-4'>
					{project.tags?.map((tag) => (
						<ProjectTag
							tag={tag}
							key={tag.name}
						/>
					))}
				</div>
			) : null}
			<div className='my-3'>
				<div className='flex items-end mt-3 justify-between mb-1'>
					<p className='mb-0'>
						<strong className='text-[var(--text-dark)] mr-2'>
							{progress}%
						</strong>
						Task Done
					</p>
					<p className='mb-0 leading-[1.8]'>{`Due date: ${project.deadline} `}</p>
				</div>
			</div>
			<hr />
		</div>
	);
});

ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;
