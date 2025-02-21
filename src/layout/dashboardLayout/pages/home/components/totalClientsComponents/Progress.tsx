const Progress = () => {
	return (
		<div className='w-full h-full flex items-center justify-between  py-1 px-5 flex-grow'>
			<div className='w-[75%] '>
				<h4 className='whitespace-nowrap mb-4 text-[1.125rem] font-bold text-[var(--text-dark)]'>
					Total Clients
				</h4>

				<div className='w-full h-[8px] bg-[#f6f6f6] overflow-hidden rounded-[.7rem]'>
					<div
						role='progressbar'
						className='striped-gradient bg-[var(--primary)] w-[40%] h-[8px]'
						aria-valuenow={40}
						aria-valuemin={20}
						aria-valuemax={100}
					/>
				</div>

				<div className='mt-2'>
					<p className='mb-0'>
						<strong className='text-[var(--danger-light)] me-2'>
							76
						</strong>
						left from target
					</p>
				</div>
			</div>
			{/* next column */}
			<div>
				<h2 className='text-[2rem] leading-6 font-bold text-black mb-0'>42</h2>
			</div>
		</div>
	);
};

export default Progress;
