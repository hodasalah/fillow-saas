const ProjectSkeleton = () => {
	return (
		<div className='animate-pulse border rounded-lg p-4'>
			<div className='flex items-center justify-between mb-3'>
				<div className='h-5 bg-gray-200 rounded w-1/3'></div>
				<div className='h-6 bg-gray-200 rounded w-20'></div>
			</div>
			<div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
			<div className='h-4 bg-gray-200 rounded w-1/2 mb-3'></div>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<div className='w-6 h-6 bg-gray-200 rounded-full'></div>
					<div className='h-4 bg-gray-200 rounded w-24'></div>
				</div>
				<div className='h-4 bg-gray-200 rounded w-20'></div>
			</div>
		</div>
	);
};

export default ProjectSkeleton;
