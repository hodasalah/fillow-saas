import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useAppSelector } from '../../hooks/hooks';
import Chatbox from './mainParts/chatbox';
import Footer from './mainParts/footer';
import Header from './mainParts/header';
import NavHeader from './mainParts/navHeader';
import Sidebar from './mainParts/sidebar';

export const DashboardLayout = () => {
    // Theme
	const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
    
    // Sidebar / Layout Mode
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
    
	const [showSlider, setShowSlider] = useState(false);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	return (
		<div className={`min-h-screen`}>
			<div
				className={`main-wrapper flex ${
					mode === 'wide' || !isMobileView
						? 'flex-row'
						: 'flex-col items-center'
				} transition-all duration-300 ease-in-out`}
			>
				{/* nav-header here */}
				<NavHeader />

				{/* sidebar here */}
				<Sidebar />

                {/*
                   Removed hardcoded inline bg colors (bg-gray-900 / bg-[#f8f7fa])
                   to let index.css variables (--body-bg) control the background.
                */}
				<div
					data-action='main-content'
					className={`min-h-screen w-full transition-all duration-300 ease-in-out bg-[var(--body-bg)]`}
				>
					{/* start header here */}
					<Header setShowSlider={setShowSlider} />

					{/* body-content here */}
					<div className='container-fluid'>
						<Outlet />
					</div>
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
