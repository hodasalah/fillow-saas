export const generateChartData = (
	total: number,
	ongoing: number,
	unfinished: number,
): number[] => {
	if (total === 0) return Array(7).fill(1); // Avoid zero issue by setting minimum 1

	// Calculate completed projects
	const completed = total - (ongoing + unfinished);

	// Create an initial distribution array
	const rawData = [
		Math.max(1, Math.round((ongoing / total) * total)),
		Math.max(1, Math.round((unfinished / total) * total)),
		Math.max(1, Math.round((completed / total) * total)),
	];

	// Ensure the sum of rawData does not exceed total due to rounding
	const sumRaw = rawData.reduce((a, b) => a + b, 0);
	const diff = total - sumRaw;

	// Adjust the first element to ensure exact total sum
	rawData[0] += diff;

	// Expand to 7 values by distributing the values proportionally
	let chartData = new Array(7).fill(0);

	rawData.forEach((value, index) => {
		for (let i = 0; i < 3; i++) {
			// Distribute each category into 3 slots
			const pos = (index * 2 + i) % 7;
			chartData[pos] += Math.round(value / 3);
		}
	});

	// Ensure no zeros in final array
	chartData = chartData.map((value) => (value === 0 ? 1 : value));

	// Adjust sum to match total exactly
	const finalSum = chartData.reduce((a, b) => a + b, 0);
	const finalDiff = total - finalSum;

	if (finalDiff !== 0) {
		chartData[0] += finalDiff; // Adjust the first value
	}

	return chartData;
};
