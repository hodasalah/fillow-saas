import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
	closeMobile,
	setMobileView,
	setMode,
} from '../../../store/slices/sidebarSlice';
import MenuList from './menu';
import SidebarFooter from './SidebarFooter';
import SidebarProfile from './sidebarProfile';

// Sidebar/index.tsx
const Sidebar = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileOpen = useAppSelector((state) => state.sidebar.isMobileOpen);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);

	const dispatch = useAppDispatch();

	// Resize handler
	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;

			if (width >= 1024) {
				// Desktop
				dispatch(setMobileView(false));
				dispatch(setMode('wide'));
				dispatch(closeMobile());
			} else if (width >= 768) {
				// Tablet
				dispatch(setMobileView(false));
				dispatch(setMode('mini'));
				dispatch(closeMobile());
			} else {
				// Mobile
				dispatch(setMobileView(true));
				dispatch(setMode('wide'));
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize(); // Initial check
		return () => window.removeEventListener('resize', handleResize);
	}, [dispatch]);
	return (
		<aside
			className={`fixed top-[--dz-header-height] h-[calc(100vh-4.5rem)] z-[1001] bg-sidebar-bg border-r-[1px] border-[--border] transition-all duration-300 shadow-[0rem_0.9375rem_1.875rem_0rem_rgba(0,0,0,0.1)]
        ${
			isMobileView
				? isMobileOpen
					? 'w-sidebar-wide'
					: 'w-0'
				: mode === 'wide'
				? 'w-sidebar-wide'
				: 'w-sidebar-mini'
		}
      `}
		>
			<MenuList />
			<SidebarProfile />
			<SidebarFooter />
		</aside>
	);
};

export default Sidebar;
