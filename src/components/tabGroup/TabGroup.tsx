import { TabConfig } from '../../types';

interface TabGroupProps<T extends string = string> {
	tabs: TabConfig[];
	activeTab: T;
	onTabChange: (tab: T) => void;
}

export const TabGroup = <T extends string = string>({
	tabs,
	activeTab,
	onTabChange,
}: TabGroupProps<T>) => (
	<div className='bg-white p-1 rounded-lg flex gap-1'>
		{tabs.map((tab) => (
			<button
				key={tab.id}
				onClick={() => onTabChange(tab.id as T)}
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
