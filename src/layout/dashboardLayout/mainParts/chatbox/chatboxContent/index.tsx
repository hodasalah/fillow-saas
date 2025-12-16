import React from 'react';
import NavTabs, { NavList } from './NavTabs';
import TabPanel from './tabPanelComponents/TabPanel';

const ChatboxContent = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <div className='h-full flex flex-col'>
      {/* header nav tabs */}
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* chatbox content */}
      <div className='flex-1 overflow-hidden'> 
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
    </div>
  )
}

export default ChatboxContent