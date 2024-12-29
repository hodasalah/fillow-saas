import Chart from 'react-apexcharts';

const options = {
	series: [
		{
			name: 'Net Profit',
			data: [20, 40, 20, 30, 50, 40, 60],
			//radius: 12,
		},
	],
	chart: {
		type: 'line',
		height: 250,
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '70%',
			endingShape: 'rounded',
		},
	},
	colors: ['#886CC0'],
	dataLabels: {
		enabled: false,
	},
	markers: {
		shape: 'circle',
	},

	legend: {
		show: false,
	},
	stroke: {
		show: true,
		width: 10,
		curve: 'smooth',
		colors: ['var(--primary)'],
	},

	grid: {
		borderColor: 'var(--border)',
		show: true,
		xaxis: {
			lines: {
				show: true,
			},
		},
		yaxis: {
			lines: {
				show: false,
			},
		},
	},
	xaxis: {
		categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		labels: {
			style: {
				colors: '#7E7F80',
				fontSize: '13px',
				fontFamily: 'Poppins',
				fontWeight: 100,
				cssClass: 'apexcharts-xaxis-label',
			},
		},
		crosshairs: {
			show: false,
		},
	},
	yaxis: {
		show: true,
		labels: {
			offsetX: -15,
			style: {
				colors: '#7E7F80',
				fontSize: '14px',
				fontFamily: 'Poppins',
				fontWeight: 100,
			},
			formatter: function (y) {
				return y.toFixed(0) + 'k';
			},
		},
	},
	fill: {
		opacity: 1,
		colors: '#FAC7B6',
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return '$ ' + val + ' hundred';
			},
		},
	},
};
const LineChart = () => {
	return (
		<div
			id='data-chart'
			className='min-h-[315px] relative m-auto'
		>
			<Chart
				options={options}
				series={options.series}
				type='line'
			/>
		</div>
	);
};
export default LineChart;
