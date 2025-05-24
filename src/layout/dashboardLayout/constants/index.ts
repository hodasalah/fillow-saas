export const DASHBOARD_ROUTES = {
	HOME: '',
	CHAT: 'chat',
	PROFILE: 'profile',
	PROJECTS: 'projects',
} as const;

export const SIDEBAR_ITEMS = [
	{
		label: 'Home',
		path: DASHBOARD_ROUTES.HOME,
		icon: 'home',
	},
	{
		label: 'Chat',
		path: DASHBOARD_ROUTES.CHAT,
		icon: 'chat',
	},
	{
		label: 'Profile',
		path: DASHBOARD_ROUTES.PROFILE,
		icon: 'profile',
	},
	{
		label: 'Projects',
		path: DASHBOARD_ROUTES.PROJECTS,
		icon: 'projects',
	},
] as const;

export const DASHBOARD_THEME = {
	colors: {
		primary: '#1a73e8',
		secondary: '#5f6368',
		background: '#f8f9fa',
		surface: '#ffffff',
		error: '#d93025',
		success: '#1e8e3e',
	},
	spacing: {
		headerHeight: '64px',
		sidebarWidth: '256px',
		footerHeight: '48px',
	},
} as const;
