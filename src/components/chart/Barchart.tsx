// import chart components from chart.js
import Chart from 'react-apexcharts';

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const options = {
	series: [
		{
			name: 'Running',
			data: [50, 18, 70, 40, 90, 70, 20],
			//radius: 12,
		},
		{
			name: 'Cycling',
			data: [80, 40, 55, 20, 45, 30, 80],
		},
	],
	chart: {
		type: 'bar',
		height: 300,

		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '57%',
			endingShape: 'rounded',
			borderRadius: 8,
		},
	},
	states: {
		hover: {
			filter: 'none',
		},
	},
	colors: ['#FFA26D', '#FF5ED2'],
	dataLabels: {
		enabled: false,
	},
	title: {
		text: 'ApexChart BarChart Data',
		position: 'top',
		align: 'center',
		style: {
			fontSize: '18px',
			fontWeight: 'bold',
			fontFamily: 'poppins',
			color: '#788',
		},
	},
	legend: {
		position: 'top',
		horizontalAlign: 'center',
		offsetX: 40,
	},
	markers: {
		width: 18,
		height: 18,
		strokeWidth: 10,
		strokeColor: '#fff',
		fillColors: undefined,
		radius: 12,
	shape:'circle'
	},

	responsive: [
		{
			breakpoint: 768,
			options: {
				plotOptions: {
					bar: {
						horizontal: true,
						columnWidth: '100%',
						borderRadius: 5,
					},
				},
				legend: {
					position: 'bottom',
					horizontalAlign: 'center',
				},
			},
		},
	],
	stroke: {
		show: true,
		width: 4,
		curve: 'smooth',
		lineCap: 'round',
		colors: ['transparent'],
	},
	grid: {
		borderColor: 'var(--border)',
	},
	xaxis: {
		position: 'bottom',
		categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		labels: {
			style: {
				colors: '#787878',
				fontSize: '13px',
				fontFamily: 'poppins',
				fontWeight: 100,
				cssClass: 'apexcharts-xaxis-label',
			},
		},
		axisTicks: {
			show: false,
		},
		crosshairs: {
			show: false,
		},
	},

	yaxis: {
		labels: {
			style: {
				colors: '#787878',
				fontSize: '13px',
				fontFamily: 'poppins',
				fontWeight: 100,
				cssClass: 'apexcharts-xaxis-label',
			},
		},
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'white',
			type: 'vertical',
			shadeIntensity: 0.2,
			gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
			inverseColors: true,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 50, 50],
			colorStops: [],
		},
	},
	tooltip: {
		y: {
			formatter: function (val: number) {
				return '$ ' + val + ' thousands';
			},
		},
	},
};

const Barchart = () => {
	return (
		<div
			id='data-chart'
			className='min-h-[315px] relative m-auto'
		>
			<Chart
				options={options}
				series={options.series}
				type='bar'
			/>
		</div>
	);
};
export default Barchart;
