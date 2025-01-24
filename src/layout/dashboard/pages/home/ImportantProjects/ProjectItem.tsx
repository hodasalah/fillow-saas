import { FC, memo } from 'react';

import { Project } from '.';
import DropdownDelEditBtn from '../../../../../components/dropdownDelEditBtn';
import ProgressBar from '../../../../../components/ProgressBar';
import ProjectTag from './ProjectTag';

const dropdownMenuLinks = [
	{
		name: 'Delete',
		id: 'delete',
	},
	{
		name: 'Edit',
		id: 'edit',
	},
];

interface ProjectItemProps {
	project: Project;
}

const ProjectItem: FC<ProjectItemProps> = memo(({ project }) => {
	return (
		<div className='my-[0.625rem]'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<span className='h-10 w-12 text-center border-[1px] border-[var(--border)] rounded-[0.625rem]  leading-[2.8rem] flex items-center justify-center'>
						<img
							src={`${project.image}`}
							alt={`${project.name} project icon`}
							className='w-[25px] '
						/>
					</span>
					<div className='ml-4 '>
						<h5 className='mb-1 font-semibold text-[var(--text-dark)] text-[1.5rem]'>
							{project.name}
						</h5>
						<p className='mb-0 leading-[1.8]'>{project.category}</p>
					</div>
				</div>
				<DropdownDelEditBtn links={dropdownMenuLinks} />
			</div>
			<h5 className='my-3'>{project.description}</h5>
			{project.tags.length > 0 ? (
				<div className='my-4'>
					{project.tags.map((tag) => (
						<ProjectTag
							tag={tag}
							key={tag.name}
						/>
					))}
				</div>
			) : null}
			<div className='my-3'>
				{/* progress bar */}
				<ProgressBar progress={project.progress} />
				<div className='flex items-end mt-3 justify-between mb-1'>
					<p className='mb-0'>
						<strong className='text-[var(--text-dark)] mr-2'>
							{project.progress}
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

export default ProjectItem;
