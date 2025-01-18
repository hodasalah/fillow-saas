import Chart from 'react-apexcharts';

const options = {
	series: [27, 11, 22, 15, 25],
	chart: {
		type: 'donut',
		height: 230,
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		width: 0,
	},
	colors: ['var(--primary)', '#26E023', '#61CFF1', '#FFDA7C', '#FF86B1'],
	legend: {
		position: 'bottom',
		show: false,
	},
	responsive: [
		{
			breakpoint: 1800,
			options: {
				chart: {
					height: 200,
				},
			},
		},
		{
			breakpoint: 1800,
			options: {
				chart: {
					height: 200,
				},
			},
		},
	],
};

const EmailChart = () => {
	return (
		<div
			id='data-chart'
			className='relative m-auto'
		>
			<Chart
				options={options}
				series={options.series}
				type='donut'
			/>
		</div>
	);
};

export default EmailChart;
