const MessageSkeleton = () => {
	return (
		<div className='animate-pulse flex items-center gap-4 p-3 border-b last:border-b-0'>
			<div className='w-10 h-10 bg-gray-200 rounded-full'></div>
			<div className='flex-1'>
				<div className='h-4 bg-gray-200 rounded w-1/4 mb-2'></div>
				<div className='h-3 bg-gray-200 rounded w-3/4'></div>
			</div>
			<div className='h-3 bg-gray-200 rounded w-16'></div>
		</div>
	);
};

export default MessageSkeleton;
