import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const options: ApexOptions = {
	series: [70],
	chart: {
		type: 'radialBar',
		offsetY: 0,
		height: 300,
		sparkline: {
			enabled: true,
		},
	},
	plotOptions: {
		radialBar: {
			startAngle: -130,
			endAngle: 130,
			track: {
				background: 'var(--border)', // Dynamic track color
				strokeWidth: '100%',
				margin: 5,
			},

			hollow: {
				margin: 30,
				size: '45%',
				background: 'transparent', // Transparent to show card bg
				image: undefined,
				imageOffsetX: 0,
				imageOffsetY: 0,
				position: 'front',
			},

			dataLabels: {
				name: {
					show: false,
				},
				value: {
					offsetY: 5,
					fontSize: '22px',
					color: 'var(--text-dark)', // Dynamic text color
					fontWeight: 700,
				},
			},
		},
	},
	responsive: [
		{
			breakpoint: 1600,
			options: {
				chart: {
					height: 250,
				},
			},
		},
	],
	grid: {
		padding: {
			top: -10,
		},
	},
	fill: {
		type: 'solid', 
		colors: ['rgb(214, 83, 193)'], // Requested color
        opacity: 1
	},
	labels: ['Average Results'],
};
const Radial = () => {
	return (
		<div
			id='data-chart'
			className='relative m-auto'
		>
			<Chart
				options={options}
				series={options.series}
				type='radialBar'
				height={300}
				width={230}
			/>
		</div>
	);
};

export default Radial;
