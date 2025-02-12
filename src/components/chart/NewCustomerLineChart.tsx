import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const options : ApexOptions = {
	series: [
		{
			name: 'Net Profit',
			data: [100, 300, 100, 400, 200, 400],
			/* radius: 30,	 */
		},
	],
	chart: {
		type: 'line',
		height: 50,
		width: 100,
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

	colors: ['var(--primary)'],
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
		colors: ['var(--primary)'],
	},

	grid: {
		show: false,
		borderColor: '#eee',
		padding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
	},
	states: {
		hover: {
			filter: {
				type: 'none',
			},
		},
		active: {
			allowMultipleDataPointsSelection: false,
			filter: {
				type: 'none',
			},
		},
	},
	xaxis: {
		categories: ['Jan', 'feb', 'Mar', 'Apr', 'May'],
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
		labels: {
			show: false,
			style: {
				fontSize: '12px',
			},
		},
		crosshairs: {
			show: false,
			position: 'front',
			stroke: {
				width: 1,
				dashArray: 3,
			},
		},
		tooltip: {
			enabled: true,
			formatter: undefined,
			offsetY: 0,
			style: {
				fontSize: '12px',
			},
		},
	},
	yaxis: {
		show: false,
	},
	fill: {
		opacity: 1,
		colors: ['#FB3E7A'],
	},
	tooltip: {
		enabled: false,
		style: {
			fontSize: '12px',
		},
		y: {
			formatter: function (val) {
				return '$' + val + ' thousands';
			},
		},
	},
};

const NewCustomerLineChart = () => {
	return (
		<div
			id='data-chart'
			className='min-h-[315px] relative m-auto'
		>
			<Chart
				options={options}
				series={options.series}
				type='line'
				width={100}
			/>
		</div>
	);
};

export default NewCustomerLineChart;
