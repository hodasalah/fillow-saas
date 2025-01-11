const GradiantCard = () => {
	return (
		<div className='gradiant-bg w-full h-full  relative mb-[1.8r75rem] transition-all border-0 border-transparent rounded-[0.625rem] shadow-[0rem 0.3125rem 0.3125rem 0rem rgba(82, 63, 105, 0.05)]'>
			<div className='p-[2rem] grid grid-cols-12 lg:gap-8  gap-4'>
				<div className='sm:col-span-7 col-span-12 sm:px-[30px]'>
					<h1 className='relative mb-0 sm:text-[2rem] text-[1.6rem] font-bold text-white'>
						Manage your project in one touch
					</h1>
					<span className='text-[1rem] text-white font-normal sm:my-[1.875rem] mt-[5px] mb-[1.875rem] mx-0 block relative'>
						Let Fillow manage your project automatically with our
						best AI systems{' '}
					</span>
					<button className='font-medium bg-white text-black rounded-[2rem] py-[0.635rem] px-[1.2rem] text-[1rem] hover:bg-[var(--bg-dark)] hover:text-white'>
						Try Free Now
					</button>
				</div>
				<div className='sm:col-span-5 hidden sm:block'>
					<img
						src='/src/assets/chart.png'
						className='movedelement w-full relative h-full transform scale-[1.1] max-w-[100%] max-h-[100%] '
						alt='chart'
					/>
				</div>
			</div>
		</div>
	);
};

export default GradiantCard;
