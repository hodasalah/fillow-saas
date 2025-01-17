const cleanPercentage = (percentage: number): number => {
	const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
	const isTooHigh = percentage > 100;
	return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};
const Circle = ({
	colour,
	percentage,
}: {
	colour: string;
	percentage: number;
}) => {
	const r = 25;
	const circ = 2 * Math.PI * r;
	const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
	return (
		<circle
			r={r}
			cx={40}
			cy={40}
			fill='transparent'
			stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
			strokeWidth={'.875rem'}
			strokeDasharray={circ}
			strokeDashoffset={percentage ? strokePct : 0}
		></circle>
	);
};
const Text = ({ percentage }: { percentage: number }) => {
	return (
		<text
			x='50%'
			y='50%'
			dominantBaseline='central'
			textAnchor='middle'
			fontSize={'1em'}
		>
			{percentage.toFixed(0)}%
		</text>
	);
};

const ProgressCircle = ({
	percentage,
	colour,
}: {
	percentage: number;
	colour: string;
}) => {
	const pct = cleanPercentage(percentage);
	return (
		<svg
			width={80}
			height={80}
		>
			<g transform={`rotate(-40 ${'40 40'})`}>
				<Circle
					colour='lightgrey'
					percentage={100}
				/>
				<Circle
					colour={colour}
					percentage={pct}
				/>
			</g>
			<Text percentage={pct} />
		</svg>
	);
};
export default ProgressCircle;
