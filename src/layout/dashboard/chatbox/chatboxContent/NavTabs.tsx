import React from 'react';
import NotesTabPanel from './tabPanelComponents/NotesTabPanel';
import AlertsTabPanel from './tabPanelComponents/AlertsTabPanel';

export const NavList = [
	{
		name: 'Notes',
		id: 'notes',
		children:<NotesTabPanel />
	},
	{
		name: 'Alerts',
		id: 'alerts',
		children:<AlertsTabPanel/>
	},
	{
		name: 'Chats',
		id: 'chats',
		children:<div>Chat Panel</div>
	},
];

interface NavTabsProps {
	activeTab: number;
	setActiveTab: (tabIndex: number) => void;
}

const NavTabs: React.FC<NavTabsProps> = ({activeTab, setActiveTab}) => {
	

	return (
		<nav>
			<ul
				role='tablist'
				className='px-4 pt-4 pb-0 bg-[var(--rgba-primary-2)] flex justify-between'
			>
				{NavList.map((item, index) => (
					<li
						key={item.id}
					>
						<button
							role='tab'
							id={`tab-${item.id}`}
							aria-selected={activeTab === index}
							aria-controls={`panel-${item.id}`}
							className={`transition-all border-b-[0.1875rem] py-2 px-4
                ${
					activeTab === index
						? 'border-primary opacity-100'
						: 'border-transparent opacity-70 hover:opacity-90'
				}
                uppercase font-medium text-primary`}
							onClick={() => setActiveTab(index)}
						>
							{item.name}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};
export default NavTabs;