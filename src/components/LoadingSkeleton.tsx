const LoadingSkeleton = () => {
	return (
		<div className='animate-pulse'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
				{[...Array(4)].map((_, i) => (
					<div
						key={i}
						className='h-32 bg-gray-200 rounded-lg'
					></div>
				))}
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
				<div className='lg:col-span-2 space-y-4'>
					<div className='h-64 bg-gray-200 rounded-lg'></div>
					<div className='h-96 bg-gray-200 rounded-lg'></div>
				</div>
				<div className='space-y-4'>
					<div className='h-48 bg-gray-200 rounded-lg'></div>
					<div className='h-48 bg-gray-200 rounded-lg'></div>
					<div className='h-48 bg-gray-200 rounded-lg'></div>
				</div>
			</div>
		</div>
	);
};

export default LoadingSkeleton;
