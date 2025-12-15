import React from 'react';

interface Project {
	id: string;
	imageUrl: string;
	title: string;
}

interface ProjectsGalleryProps {
	projects: Project[];
}

const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ projects }) => {
	return (
		<div className='max-w-screen-md mx-auto p-4'>
			{/* Title */}
			<h2 className='text-2xl font-bold mb-6'>Projects Gallery</h2>

			{/* Grid Container */}
			<div className='grid grid-cols-2 gap-4'>
				{projects.slice(0, 4).map((project, index) => (
					<div key={project.id} className='relative'>
						<img
							src={project.imageUrl}
							alt={project.title}
							className='w-full h-auto object-cover rounded-md aspect-video'
						/>
						{index === 3 && projects.length > 4 && (
							<div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-md'>
								<span className='text-white text-2xl font-bold'>
									+{projects.length - 4}
								</span>
							</div>
						)}
					</div>
				))}

				{/* Video Placeholders - kept static for now as they weren't in the data model plan, but could be added later */}
			</div>
		</div>
	);
};

export default ProjectsGallery;
