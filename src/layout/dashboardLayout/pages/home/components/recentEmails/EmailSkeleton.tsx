const EmailSkeleton = () => {
	return (
		<div className='animate-pulse w-full [&:not(:last-child)]:border-b-[0.0625rem] [&:not(:last-child)]:border-(var(--border))'>
			<div className='py-[.9375rem] px-[1.8625rem] flex items-center justify-between'>
				{/* Avatar skeleton */}
				<div className='flex items-center flex-1'>
					<div className='flex-shrink-0 w-[3rem] h-[3rem] rounded-full bg-gray-200'></div>
					<div className='pl-4 flex-1'>
						{/* Title skeleton */}
						<div className='h-5 bg-gray-200 rounded w-3/4 mb-2'></div>
						{/* Body skeleton */}
						<div className='h-4 bg-gray-200 rounded w-1/2'></div>
					</div>
				</div>
				{/* Pin button skeleton */}
				<div className='flex-shrink-0 w-[3rem] h-[3rem] rounded-[0.635rem] bg-gray-200 ml-4'></div>
			</div>
			{/* Files skeleton */}
			<div className='flex items-center gap-2 mt-2 px-[1.8625rem] pb-[.9375rem]'>
				<div className='h-10 bg-gray-200 rounded-full w-32'></div>
				<div className='h-10 bg-gray-200 rounded-full w-32'></div>
			</div>
		</div>
	);
};

export default EmailSkeleton;
