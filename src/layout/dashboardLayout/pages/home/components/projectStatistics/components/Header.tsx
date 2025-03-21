import DropdownDelEditBtn from '../../../../../../../components/dropdownDelEditBtn';
import TabGroup from '../../../../../../../components/TabGroup';
import { TABS } from './constants';
import { TimePeriod } from './types';

interface HeaderProps {
	activeTab: TimePeriod;
	onTabChange: (tab: TimePeriod) => void;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	links: Array<{ id: string; name: string }>;
}

export const Header = ({
	activeTab,
	onTabChange,
	onEdit,
	onDelete,
	links,
}: HeaderProps) => (
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
			<DropdownDelEditBtn
				links={links}
				onEditBtn={onEdit}
				onDeleteBtn={onDelete}
			/>
		</div>
	</div>
);
