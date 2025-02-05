import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Chatbox from './chatbox';
import Footer from './footer';
import Header from './header';
import NavHeader from './navHeader';
import DashboardHome from './pages/home';
import Sidebar from './sidebar';

const Dashboard = () => {
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
			<Routes>
				<Route
					index
					path='/dashboard'
					element={<DashboardHome />}
				/>
				<Route
					path='/dashboard'
					element={<DashboardHome />}
				/>
			</Routes>

			{/* end body-content here */}
			{/* footer here */}
			<Footer />
		</>
	);
};

export default Dashboard;
