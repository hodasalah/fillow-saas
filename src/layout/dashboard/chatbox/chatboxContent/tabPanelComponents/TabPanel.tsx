import { ReactNode } from 'react';

const TabPanel = ({ children, id, activeTab, index }: { children: ReactNode, id: string, activeTab: number, index: number }) => (
	<div
		role='tabpanel'
		id={`panel-${id}`}
		aria-labelledby={`tab-${id}`}
		hidden={activeTab !== index}
	>
		{children}
	</div>
);

export default TabPanel;
