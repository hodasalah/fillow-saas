import { useState } from 'react';
import { Outlet } from 'react-router';
import Chatbox from './mainParts/chatbox';
import Footer from './mainParts/footer';
import Header from './mainParts/header';
import NavHeader from './mainParts/navHeader';
import Sidebar from './mainParts/sidebar';

const DashboardLayout = () => {
	const [showSlider, setShowSlider] = useState(false);
	return (
		<>
			<Chatbox
				setShowSlider={setShowSlider}
				showSlider={showSlider}
			/>

			{/* nav-header here */}
			<NavHeader />
			{/* start header here */}
			<Header setShowSlider={setShowSlider} />

			{/* sidebar here */}
			<Sidebar />

			{/* body-content here */}
			{/* routes here [1] dashboard layout */}
			<Outlet />
			{/* end body-content here */}
			{/* footer here */}
			<Footer />
		</>
	);
};

export default DashboardLayout;
