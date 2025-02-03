import { useMemo, useState } from 'react';
import Card from '../../../../../components/Card';
import Modal from '../../../../../components/Modal';
import { generateChartData } from '../../../../../utils/helpers/generateChartData';
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
	const [showDeleteModal, setShowDeleteModal] = useState(false);

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

	const handleDelete = () => {
		setData((prev) => ({
			...prev,
			[activeTab]: {
				total: 0,
				ongoing: 0,
				unfinished: 0,
				chartData: [],
			},
		}));
		setShowDeleteModal(false);
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
						onDelete={(id:string)=>{
							const dellTab = links.find(
								(item) => item.id === id,
							);
							if(dellTab){
								setShowDeleteModal(true);
							}
						}}
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
			{/* Delete Confirmation Modal */}
			{showDeleteModal && (
				<Modal
					onClose={() => setShowDeleteModal(false)}
					onConfirm={handleDelete}
					title={`Delete ${activeTab}`}
					message={`Are you sure you want to delete data for ${activeTab}?`}
				/>
			)}
		</div>
	);
};
export default ProjectStatistics;
