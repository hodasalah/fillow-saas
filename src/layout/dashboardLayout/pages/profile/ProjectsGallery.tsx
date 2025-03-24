import React from 'react';

interface ProjectsGalleryProps {
	// projects: {
	// 	title: string;
	// 	imageUrl: string;
	// 	description: string;
	// }[];
}

const ProjectsGallery: React.FC<ProjectsGalleryProps> = () => {
	return (
		<div className='max-w-screen-md mx-auto p-4'>
			{/* Title */}
			<h2 className='text-2xl font-bold mb-6'>Projects Gallery</h2>

			{/* Grid Container */}
			<div className='grid grid-cols-2 gap-4'>
				{/* Row 1, Col 1 */}
				<div className='relative'>
					<img
						src='https://via.placeholder.com/600x400?text=Image+1'
						alt='Placeholder 1'
						className='w-full h-auto object-cover rounded-md'
					/>
				</div>

				{/* Row 1, Col 2 */}
				<div className='relative'>
					<img
						src='https://via.placeholder.com/600x400?text=Image+2'
						alt='Placeholder 2'
						className='w-full h-auto object-cover rounded-md'
					/>
				</div>

				{/* Row 2, Col 1 */}
				<div className='relative'>
					<img
						src='https://via.placeholder.com/600x400?text=Image+3'
						alt='Placeholder 3'
						className='w-full h-auto object-cover rounded-md'
					/>
				</div>

				{/* Row 2, Col 2 with overlay */}
				<div className='relative'>
					<img
						src='https://via.placeholder.com/600x400?text=Image+4'
						alt='Placeholder 4'
						className='w-full h-auto object-cover rounded-md'
					/>
					{/* Overlay to show "+3" or any other text */}
					<div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
						<span className='text-white text-2xl font-bold'>
							+3
						</span>
					</div>
				</div>

				{/* Row 3, Col 1 - could be a video placeholder */}
				<div className='relative'>
					<video
						className='w-full rounded-md'
						controls
						poster='https://via.placeholder.com/600x400?text=Video+Poster'
					>
						<source src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' />
						Your browser does not support the video tag.
					</video>
				</div>

				{/* Row 3, Col 2 - another video or image */}
				<div className='relative'>
					<video
						className='w-full rounded-md'
						controls
						poster='https://via.placeholder.com/600x400?text=Another+Video'
					>
						<source src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
		</div>
	);
};

export default ProjectsGallery;
