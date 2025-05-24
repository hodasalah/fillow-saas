import { useState } from 'react';
import { Outlet } from 'react-router';
import { useAppSelector } from '../../hooks/hooks';
import Chatbox from './mainParts/chatbox';
import Footer from './mainParts/footer';
import Header from './mainParts/header';
import NavHeader from './mainParts/navHeader';
import Sidebar from './mainParts/sidebar';

export const DashboardLayout = () => {
	const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
	const [showSlider, setShowSlider] = useState(false);

	return (
		<div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
			{/* nav-header here */}
			<NavHeader />

			{/* start header here */}
			<Header setShowSlider={setShowSlider} />

			{/* sidebar here */}
			<Sidebar />

			{/* body-content here */}
			<div
				className={`content-body ${
					isDarkMode ? 'bg-gray-900' : 'bg-[#f8f7fa]'
				}`}
			>
				<div className='container-fluid'>
					<Outlet />
				</div>
			</div>
			{/* end body-content here */}

			{/* footer here */}
			<Footer />

			{/* Chat Box */}
			<Chatbox
				setShowSlider={setShowSlider}
				showSlider={showSlider}
			/>
		</div>
	);
};
