import LineChart from '../../../../components/chart/LineChart';

const Linear = () => {
	return (
		<div className='flex px-5 items-center justify-between gap-4 h-full flex-grow p-[1.875rem]'>
			<div>
				<div className=''>
					<h2 className='mb-2  text-[2rem] leading-5 text-[var(--text-dark)] font-bold'>
						562
					</h2>
					<h4 className='leading-6 whitespace-nowrap mb-4 text-[1.125rem] font-semibold text-[var(--text-dark)]'>
						Total Clients
					</h4>
					<p className='mb-0 leading-7'>
						<strong className='text-[#09BD3C]'>+2%</strong> than
						last month
					</p>
				</div>
			</div>
			<LineChart />
		</div>
	);
};

export default Linear;
