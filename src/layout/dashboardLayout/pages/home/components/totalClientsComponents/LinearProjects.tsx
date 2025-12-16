import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const LinearProjects = () => {
	const options: ApexOptions = {
		series: [
			{
				name: 'Net Profit',
				data: [100, 300, 200, 400, 100, 400],
				/* radius: 30,	 */
			},
		],
		chart: {
			type: 'line' as const,
			height: 50,
			width: 80,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false,
			},
			sparkline: {
				enabled: true,
			},
		},

		colors: ['rgb(214, 83, 193)'],
		dataLabels: {
			enabled: false,
		},

		legend: {
			show: false,
		},
		stroke: {
			show: true,
			width: 6,
			curve: 'smooth',
			colors: ['rgb(214, 83, 193)'],
		},
        // ...
		fill: {
			opacity: 1,

			colors: ['rgb(214, 83, 193)'],
		},
		tooltip: {
			enabled: false,
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function (val) {
					return val + ' thousands';
				},
			},
		},
	};

	return (
		<div className='flex px-5 items-center justify-between gap-4 h-full flex-grow p-[1.875rem] flex-wrap'>
			<div>
				<div className=''>
					<h2 className='mb-2  text-[2rem] leading-5 text-[var(--text-dark)] font-bold'>
						829
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
			<Chart
				id='customer1'
				options={options}
				type='line'
				series={options.series}
				width={80}
			/>
		</div>
	);
};
export default LinearProjects;
