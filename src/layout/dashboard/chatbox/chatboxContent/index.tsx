import React from 'react';
import NavTabs, { NavList } from './NavTabs'
import TabPanel from './tabPanelComponents/TabPanel'
import NotesTabPanel from './tabPanelComponents/NotesTabPanel';

const ChatboxContent = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <div>
      {/* header nav tabs */}
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* chatbox content */}
      {
	NavList.map((item, index) => (
		<TabPanel
			key={item.id}
			id={item.id}
			activeTab={activeTab}
			index={index}
		>
      {item.children}
		</TabPanel>
    ))
  }

      
    </div>
  )
}

export default ChatboxContent