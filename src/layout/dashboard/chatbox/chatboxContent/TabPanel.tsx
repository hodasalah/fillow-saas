import { NavList } from './NavTabs';

// Example panel component
const TabPanel = ({ children, id, activeTab, index }) => (
	<div
		role='tabpanel'
		id={`panel-${id}`}
		aria-labelledby={`tab-${id}`}
		hidden={activeTab !== index}
		className='p-4'
	>
		{children}
	</div>
);

export default TabPanel;
