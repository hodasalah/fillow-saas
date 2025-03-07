import { useState } from 'react';
import { Outlet } from 'react-router';
import { useAppSelector } from '../../hooks/hooks';
import Chatbox from './mainParts/chatbox';
import Header from './mainParts/header';
import Sidebar from './mainParts/sidebar';
import NavHeader from './mainParts/navHeader';
import Footer from './mainParts/footer';

const DashboardLayout = () => {
	const [showSlider, setShowSlider] = useState(false);
	const user = useAppSelector((state) => state.users.currentUser);
	console.log(user);
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
