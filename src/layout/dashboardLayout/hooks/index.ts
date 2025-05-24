import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTES } from '../constants';

export const useDashboardNavigation = () => {
	const navigate = useNavigate();

	const navigateTo = (route: keyof typeof DASHBOARD_ROUTES) => {
		navigate(DASHBOARD_ROUTES[route]);
	};

	return { navigateTo };
};

export const useResponsiveDashboard = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [showSidebar, setShowSidebar] = useState(!isMobile);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
			setShowSidebar(!mobile);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return {
		isMobile,
		showSidebar,
		setShowSidebar,
	};
};
