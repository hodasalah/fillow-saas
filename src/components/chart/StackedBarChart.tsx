import Chart from 'react-apexcharts';

const options = {
	series: [
		{
			name: 'Aplication Sent',
			data: [40, 55, 15, 55],
		},
		{
			name: 'Appllication Answered',
			data: [40, 55, 35, 55],
		},
		{
			name: 'Hired',
			data: [40, 17, 55, 55],
		},
	],
	chart: {
		type: 'bar',
		height: 120,
		width: 150,
		stacked: true,
		toolbar: {
			show: false,
		},
	},
	responsive: [
		{
			breakpoint: 1600,
			options: {
				chart: {
					width: 150,
					height: '100%',
				},
				legend: {
					position: 'bottom',
					offsetX: -10,
					offsetY: 0,
				},
			},
		},
		{
			breakpoint: 1600,
			options: {
				chart: {
					//width: 80,
				},
				legend: {
					position: 'bottom',
					offsetX: -10,
					offsetY: 0,
				},
			},
		},
	],
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '20%',
			barHeight: '80%',
			colors: {
				backgroundBarColors: [
					'#ECECEC',
					'#ECECEC',
					'#ECECEC',
					'#ECECEC',
				],
				backgroundBarOpacity: 1,
			},
		},
	},
	colors: ['#ECECEC', '#886CC0', '#6128d180'],
	xaxis: {
		show: false,
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
		labels: {
			show: false,
			style: {
				colors: '#828282',
				fontSize: '14px',
				fontFamily: 'Poppins',
				fontWeight: 'light',
				cssClass: 'apexcharts-xaxis-label',
			},
		},

		crosshairs: {
			show: false,
		},

		categories: ['Sun', 'Mon', 'Tue'],
	},
	yaxis: {
		show: false,
	},
	grid: {
		show: false,
	},
	toolbar: {
		enabled: false,
	},
	dataLabels: {
		enabled: false,
	},
	legend: {
		show: false,
	},
	fill: {
		opacity: 1,
	},
};

const StackedBarChart = () => {
	return (
		<div
			id='data-chart'
			className='relative m-auto'
		>
			<Chart
				options={options}
				series={options.series}
				type='bar'
			/>
		</div>
	);
};

export default StackedBarChart;
