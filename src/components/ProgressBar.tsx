const ProgressBar = () => {
	return (
		<div className='h-[0.325rem] bg-[var(--rgba-primary-1)]  flex rounded-[0.625rem]'>
			<div className='bg-[var(--primary)]  h-[5px] w-[45%] flex flex-col justify-center progress-animated rounded-l-[0.625rem]'>
				<span className='h-[1px] w-[1px] m-[-1px] absolute overflow-hidden'>
					45% completed
				</span>
			</div>
		</div>
	);
};

export default ProgressBar;
