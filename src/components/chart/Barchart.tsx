// import chart components from chart.js
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';


// const options: ApexOptions = {
// 	series: [
// 		{
// 			name: 'Running',
// 			data: [50, 18, 70, 40, 90, 70, 20],
// 			//radius: 12,
// 		},
// 		{
// 			name: 'Cycling',
// 			data: [80, 40, 55, 20, 45, 30, 80],
// 		},
// 	],
// 	chart: {
// 		type: 'bar',
// 		height: 300,

// 		toolbar: {
// 			show: false,
// 		},
// 	},
// 	plotOptions: {
// 		bar: {
// 			horizontal: false,
// 			columnWidth: '57%',
// 			borderRadius: 8,
// 		},
// 	},
// 	states: {
// 		hover: {
// 			filter: {
// 				type: 'none',
// 			},
// 		},
// 	},
// 	colors: ['#FFA26D', '#FF5ED2'],
// 	dataLabels: {
// 		enabled: false,
// 	},
// 	markers: {
// 		shape: 'circle',
// 	},

// 	legend: {
// 		show: false,
// 		fontSize: '12px',
// 		labels: {
// 			colors: '#000000',
// 		},
// 		markers: {
// 			size: 18,
// 			strokeWidth: 10,
// 			fillColors: undefined,
// 		},
// 	},
// 	responsive: [
// 		{
// 			breakpoint: 768,
// 			options: {
// 				plotOptions: {
// 					bar: {
// 						horizontal: true,
// 						columnWidth: '100%',
// 						borderRadius: 5,
// 					},
// 				},
// 				legend: {
// 					position: 'bottom',
// 					horizontalAlign: 'center',
// 				},
// 			},
// 		},
// 	],
// 	stroke: {
// 		show: true,
// 		width: 4,
// 		curve: 'smooth',
// 		lineCap: 'round',
// 		colors: ['transparent'],
// 	},
// 	grid: {
// 		borderColor: 'var(--border)',
// 	},
// 	xaxis: {
// 		position: 'bottom',
// 		categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
// 		labels: {
// 			style: {
// 				colors: '#787878',
// 				fontSize: '13px',
// 				fontFamily: 'poppins',
// 				fontWeight: 400,
// 				cssClass: 'apexcharts-xaxis-label',
// 			},
// 		},
// 		axisTicks: {
// 			show: false,
// 		},
// 		crosshairs: {
// 			show: false,
// 		},
// 	},

// 	yaxis: {
// 		labels: {
// 			style: {
// 				colors: '#787878',
// 				fontSize: '13px',
// 				fontFamily: 'poppins',
// 				fontWeight: 400,
// 				cssClass: 'apexcharts-xaxis-label',
// 			},
// 		},
// 	},
// 	fill: {
// 		type: 'gradient',
// 		gradient: {
// 			shade: 'white',
// 			type: 'vertical',
// 			shadeIntensity: 0.2,
// 			gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
// 			inverseColors: true,
// 			opacityFrom: 1,
// 			opacityTo: 1,
// 			stops: [0, 50, 50],
// 			colorStops: [],
// 		},
// 	},
// 	tooltip: {
// 		y: {
// 			formatter: function (val) {
// 				return '$ ' + val + ' thousands';
// 			},
// 		},
// 	},
// };

  
const Barchart = ({ showOngoing, showUnfinished ,data}: { showOngoing: boolean, showUnfinished: boolean ,data: number[] }) => {
	const series = [
		{
			name: 'Ongoing',
			data: showOngoing ? data : [],
		},
		{
			name: 'Unfinished',
			data: showUnfinished ? data.map((val) => val * 0.2) : [], // Example modifier
		},
	];

	// Chart options
	const options: ApexOptions = {
		chart: {
			type: 'bar',
			height: 350,
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
				endingShape: 'rounded',
			},
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			categories: [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
			],
		},
		yaxis: {
			title: {
				text: 'Projects',
			},
			labels: {
				formatter: (value: number) => value.toFixed(0), // No decimals on the Y-axis
			},
		},
		legend: {
			position: 'top',
			horizontalAlign: 'center',
		},
		colors: ['#FFA500', '#FF69B4'], // Colors for ongoing and unfinished datasets
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: (value: number) => `${value.toFixed(0)} Projects`, // Tooltip formatting
			},
		},
	};

	return (
		<div
			id='data-chart'
			className='min-h-[315px] relative m-auto'
		>
			<Chart
				options={options }
				series={series}
				type='bar'
				height={300}
			/>
		</div>
	);
};
export default Barchart;
