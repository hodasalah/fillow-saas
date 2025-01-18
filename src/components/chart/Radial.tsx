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
				background: '#F1EAFF',
				strokeWidth: '100%',
				margin: 5,
			},

			hollow: {
				margin: 30,
				size: '45%',
				background: '#F1EAFF',
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
					color: '#886CC0',
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
	/* stroke: {
          dashArray: 4,
		  colors:'#6EC51E'
        }, */
	fill: {
		type: 'gradient',
		colors: ['#FF63E6'],
		gradient: {
			shade: 'white',
			shadeIntensity: 0.15,
			inverseColors: false,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 50, 65, 91],
		},
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
