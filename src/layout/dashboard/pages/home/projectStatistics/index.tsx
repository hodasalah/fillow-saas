import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../../../../components/Card';
import Barchart from '../../../../../components/chart/Barchart';
import DropdownDelEditBtn from '../../../../../components/dropdownDelEditBtn';
import ProgressCircle from '../../../../../components/svgs/progressCircle';
import RedCircle from '../../../../../components/svgs/RedCircle';
import YellowCircle from '../../../../../components/svgs/YellowCircle';
import ToggleSwitch from '../../../../../components/toggleSwitch/ToggleSwitch';

// Types
type TimePeriod = 'daily' | 'weekly' | 'monthly';

interface StatisticsData {
	total: number;
	ongoing: number;
	unfinished: number;
	chartData: number[];
}

interface TabConfig {
	id: TimePeriod;
	label: string;
}

const TABS: TabConfig[] = [
	{ id: 'monthly', label: 'Monthly' },
	{ id: 'weekly', label: 'Weekly' },
	{ id: 'daily', label: 'Daily' },
];

const DEFAULT_DATA: Record<TimePeriod, StatisticsData> = {
	monthly: {
		total: 246,
		ongoing: 200,
		unfinished: 46,
		chartData: [80, 40, 70, 90, 50, 60, 85].map((value) =>
			Number(value.toFixed(2)),
		),
	},
	weekly: {
		total: 70,
		ongoing: 60,
		unfinished: 10,
		chartData: [10, 20, 30, 40, 50, 60, 70].map((value) =>
			Number(value.toFixed(2)),
		),
	},
	daily: {
		total: 10,
		ongoing: 8,
		unfinished: 2,
		chartData: [1, 2, 3, 4, 5, 6, 7].map((value) =>
			Number(value.toFixed(2)),
		),
	},
};

const links = [
	{ id: uuidv4(), name: 'Edit'},
	{ id: uuidv4(), name: 'Delete'}];

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
		return activeData.chartData.map((value) =>
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
	const handleSaveEdit = () => {
		if (editedData) {
			setData((prev) => ({
				...prev,
				[activeTab]: editedData,
			}));
			setShowEditModal(false);
		}
	};
	const handleChange = (
		key: keyof StatisticsData,
		value: number | number[],
	) => {
		if (editedData) {
			setEditedData({ ...editedData, [key]: value });
		}
	};

	return (
		<div className='w-full'>
			<Card>
				<div className='w-full p-[1.875rem] space-y-8'>
					{/* Header Section */}
					<Header
						activeTab={activeTab}
						onTabChange={setActiveTab}
						onEdit={(id) => handleEdit(id)}
						onDelete={(id) => handleDelete(id)}
					/>

					{/* Statistics Overview */}
					<div className='w-full flex flex-1 pt-[1.875rem]'>
						<div className='flex items-center gap-4 w-full justify-between flex-wrap'>
							<TotalProjects
								total={activeData.total}
								percentage={completionPercentage}
							/>

							<div className='flex gap-8 flex-wrap'>
								<StatisticItem
									value={activeData.ongoing}
									label='On Going'
									icon={<YellowCircle />}
								/>
								<StatisticItem
									value={activeData.unfinished}
									label='Unfinished'
									icon={<RedCircle />}
								/>
							</div>
						</div>
					</div>

					{/* Chart Section */}
					<div className='space-y-6'>
						<Barchart
							showOngoing={switchStates.showOngoing}
							showUnfinished={switchStates.showUnfinished}
							data={formattedChartData}
						/>

						<div className='flex items-center gap-7 flex-wrap'>
							<ToggleSwitch
								checked={switchStates.showOngoing}
								onChange={() =>
									handleToggleChange('showOngoing')
								}
								label='Show Ongoing'
							/>
							<ToggleSwitch
								checked={switchStates.showUnfinished}
								onChange={() =>
									handleToggleChange('showUnfinished')
								}
								label='Show Unfinished'
							/>
						</div>
					</div>
				</div>
			</Card>
			{/* Edit Modal */}
			{showEditModal && (
				<div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[1003]'>
					<div className='bg-white p-6 rounded-lg space-y-4 w-[400px]'>
						<h3 className='text-lg font-semibold'>Edit Data</h3>
						<div>
							<label className='block text-sm font-medium'>
								Total Projects
							</label>
							<input
								type='number'
								value={editedData?.total || 0}
								onChange={(e) =>
									handleChange(
										'total',
										Number(e.target.value),
									)
								}
								className='w-full border rounded p-2'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium'>
								Ongoing Projects
							</label>
							<input
								type='number'
								value={editedData?.ongoing || 0}
								onChange={(e) =>
									handleChange(
										'ongoing',
										Number(e.target.value),
									)
								}
								className='w-full border rounded p-2'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium'>
								Unfinished Projects
							</label>
							<input
								type='number'
								value={editedData?.unfinished || 0}
								onChange={(e) =>
									handleChange(
										'unfinished',
										Number(e.target.value),
									)
								}
								className='w-full border rounded p-2'
							/>
						</div>
						<div className='flex justify-end gap-4'>
							<button
								onClick={() => setShowEditModal(false)}
								className='px-4 py-2 bg-gray-200 rounded'
							>
								Cancel
							</button>
							<button
								onClick={handleSaveEdit}
								className='px-4 py-2 bg-[var(--primary)] text-white rounded'
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

// Sub-components
const Header = ({
	activeTab,
	onTabChange,
	onEdit,
	onDelete,
}: {
	activeTab: TimePeriod;
	onTabChange: (tab: TimePeriod) => void;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
}) => (
	<div className='w-full flex justify-between items-center flex-wrap gap-4'>
		<h4 className='text-xl font-semibold text-text-dark'>
			Project Statistics
		</h4>
		<div className='flex items-center gap-4'>
			<TabGroup
				tabs={TABS}
				activeTab={activeTab}
				onTabChange={onTabChange}
			/>
			<DropdownDelEditBtn links={links} onEditBtn={onEdit} onDeleteBtn={onDelete} />
		</div>
	</div>
);

const TabGroup = ({
	tabs,
	activeTab,
	onTabChange,
}: {
	tabs: TabConfig[];
	activeTab: TimePeriod;
	onTabChange: (tab: TimePeriod) => void;
}) => (
	<div className='bg-primary-100 p-1 rounded-lg flex gap-1'>
		{tabs.map((tab) => (
			<button
				key={tab.id}
				onClick={() => onTabChange(tab.id)}
				className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
          ${
				tab.id === activeTab
					? 'bg-[var(--primary)] text-white'
					: 'text-secondary-500 hover:text-[var(--primary)]'
			}`}
			>
				{tab.label}
			</button>
		))}
	</div>
);

const TotalProjects = ({
	total,
	percentage,
}: {
	total: number;
	percentage: number;
}) => (
	<div className='flex items-center gap-4'>
		<ProgressCircle
			percentage={percentage}
			colour='#886cc0'
		/>
		<div>
			<h2 className='text-2xl font-semibold text-text-dark'>{total}</h2>
			<p className='text-secondary-500'>Total Projects</p>
		</div>
	</div>
);

const StatisticItem = ({
	value,
	label,
	icon,
}: {
	value: number;
	label: string;
	icon: React.ReactNode;
}) => (
	<div className='flex items-center gap-3'>
		<div className='mt-1'>{icon}</div>
		<div>
			<h4 className='text-2xl font-semibold text-text-dark'>{value}</h4>
			<p className='text-secondary-500'>{label}</p>
		</div>
	</div>
);

export default ProjectStatistics;
