import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

interface ChartData {
	labels: string[];
	datasets: Array<{
		label: string;
		data: number[];
		borderColor: string;
		tension?: number;
	}>;
}

interface LineChartProps {
	data: ChartData;
}

const LineChart = ({ data }: LineChartProps) => {
	const options: ApexOptions = {
		series: [
			{
				name: data.datasets[0].label,
				data: data.datasets[0].data,
			},
		],
		chart: {
			type: 'line',
			height: 250,
			toolbar: { show: false },
			zoom: { enabled: false },
		},
		colors: [data.datasets[0].borderColor],
		dataLabels: { enabled: false },
		stroke: {
			width: 3,
			curve: 'smooth',
		},
		markers: {
			size: 5,
			strokeWidth: 0,
			hover: { size: 7 },
		},
		xaxis: {
			categories: data.labels,
			labels: {
				style: {
					colors: '#7E7F80',
					fontSize: '12px',
					fontFamily: 'Poppins',
				},
			},
			axisTicks: { show: false },
			axisBorder: { show: false },
		},
		yaxis: {
			min: 0,
			max: 100,
			tickAmount: 5,
			labels: {
				style: {
					colors: '#7E7F80',
					fontSize: '12px',
					fontFamily: 'Poppins',
				},
				formatter: (value) => `${Math.round(value)}%`,
			},
		},
		grid: {
			borderColor: 'var(--border)',
			strokeDashArray: 5,
			xaxis: { lines: { show: true } },
			yaxis: { lines: { show: false } },
		},
		tooltip: {
			y: {
				formatter: (value) => `${value}% Completion`,
			},
			marker: { show: false },
		},
		responsive: [
			{
				breakpoint: 768,
				options: {
					chart: { height: 200 },
					xaxis: { labels: { rotate: -45 } },
				},
			},
		],
	};

	return (
		<div className='w-full'>
			<Chart
				options={options}
				series={options.series}
				type='line'
				height={250}
			/>
		</div>
	);
};

export default LineChart;
