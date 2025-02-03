import { useMemo, useState } from 'react';
import Card from '../../../../../components/Card';
import ChartSection from './components/ChartSection';
import { DEFAULT_DATA, links } from './components/constants';
import EditModal from './components/EditModal';
import { Header } from './components/Header';
import { StatisticsOverview } from './components/StatisticsOverview';
import { StatisticsData, TimePeriod } from './components/types';

const ProjectStatistics = () => {
	const [data, setData] = useState(DEFAULT_DATA);
	const [activeTab, setActiveTab] = useState<TimePeriod>('monthly');
	const [showEditModal, setShowEditModal] = useState(false);
	const [editedData, setEditedData] = useState<StatisticsData | null>(null);

	const [switchStates, setSwitchStates] = useState({
		showOngoing: true,
		showUnfinished: true,
	});

	const activeData = useMemo(() => data[activeTab], [activeTab, data]);

	const completionPercentage = useMemo(() => {
		return activeData.total > 0
			? Math.round((activeData.ongoing / activeData.total) * 100)
			: 0;
	}, [activeData]);
	const formattedChartData = useMemo(() => {
		return activeData.chartData.map((value: number) =>
			parseFloat(value.toFixed(2)),
		); // Adjust the precision as needed
	}, [activeData]);
	// Single function to handle state changes for both switches
	const handleToggleChange = (key: 'showOngoing' | 'showUnfinished') => {
		setSwitchStates((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
		console.log('Toggle State:', switchStates);
	};
	const handleEdit = (id: string) => {
		const dataToEdit = links.find((item) => item.id === id);
		if (dataToEdit) {
			setEditedData({ ...activeData });

			setShowEditModal(true);
		}
	};

	const handleDelete = (id: string) => {
		if (
			window.confirm(
				`Are you sure you want to delete data for ${activeTab}?`,
			)
		) {
			const dataTodell = links.find((item) => item.id === id);
			if (dataTodell) {
				setData((prev) => ({
					...prev,
					[activeTab]: {
						total: 0,
						ongoing: 0,
						unfinished: 0,
						chartData: [],
					},
				}));
			}
		}
	};
	const generateChartData = (
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

	const handleSaveEdit = () => {
		if (editedData) {
			setData((prev) => ({
				...prev,
				[activeTab]: {
					...editedData,
					chartData: generateChartData(
						editedData.total,
						editedData.ongoing,
						editedData.unfinished,
					),
				},
			}));
			setShowEditModal(false);
		}
	};

	const handleChange = (key: keyof StatisticsData, value: number) => {
		if (editedData) {
			const updatedData = { ...editedData, [key]: value };

			// Recalculate chartData dynamically
			updatedData.chartData = generateChartData(
				updatedData.total,
				updatedData.ongoing,
				updatedData.unfinished,
			);

			setEditedData(updatedData);
		}
	};

	return (
		<div className='w-full'>
			<Card>
				<div className='w-full p-[1.875rem] space-y-8'>
					<Header
						activeTab={activeTab}
						onTabChange={setActiveTab}
						onEdit={handleEdit}
						onDelete={handleDelete}
						links={links}
					/>
					<StatisticsOverview
						total={activeData.total}
						ongoing={activeData.ongoing}
						unfinished={activeData.unfinished}
						completionPercentage={completionPercentage}
					/>
					<ChartSection
						data={formattedChartData}
						switchStates={switchStates}
						onToggleChange={handleToggleChange}
					/>
				</div>
			</Card>
			{showEditModal && (
				<EditModal
					data={editedData}
					onSave={handleSaveEdit}
					onClose={() => setShowEditModal(false)}
					onChange={handleChange}
				/>
			)}
		</div>
	);
};
export default ProjectStatistics;
