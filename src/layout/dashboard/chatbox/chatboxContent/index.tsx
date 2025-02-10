import React from 'react';
import NavTabs, { NavList } from './NavTabs'
import TabPanel from './TabPanel'

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
      tab for item with index {index}
		</TabPanel>
    ))
  }

      
    </div>
  )
}

export default ChatboxContent