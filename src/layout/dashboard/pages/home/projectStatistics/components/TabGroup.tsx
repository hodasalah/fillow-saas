import { TabConfig, TimePeriod } from './types';

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
export default TabGroup;