import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setChatboxOpen } from '../../store/slices/sidebarSlice';
import Chatbox from './mainParts/chatbox';
import Footer from './mainParts/footer';
import Header from './mainParts/header';
import NavHeader from './mainParts/navHeader';
import Sidebar from './mainParts/sidebar';

export const DashboardLayout = () => {
    // Theme
	const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
    const isChatboxOpen = useAppSelector((state) => state.sidebar.isChatboxOpen);
    const dispatch = useAppDispatch();

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	return (
		<div className="h-screen overflow-hidden flex flex-col bg-[var(--body-bg)]">
			{/* Main layout wrapper */}
			<div className="flex flex-1 overflow-hidden">
				{/* NavHeader - fixed positioned */}
				<NavHeader />

				{/* Sidebar - fixed positioned */}
				<Sidebar />

				{/* Main content column */}
				<div 
					data-action='main-content'
					className="flex flex-col flex-1"
				>
					{/* Header - fixed positioned */}
					<Header setShowSlider={(val: boolean) => dispatch(setChatboxOpen(val))} />

					{/* Scrollable content area - ONLY this scrolls */}
					<div className="flex-1 overflow-y-auto">
						<div className="container-fluid">
							<Outlet />
						</div>
					</div>

					{/* Footer - always visible at bottom */}
					<Footer />
				</div>
			</div>

			{/* Chat Box */}
			<Chatbox
				setShowSlider={(val: boolean) => dispatch(setChatboxOpen(val))}
				showSlider={isChatboxOpen}
			/>
		</div>
	);
};
