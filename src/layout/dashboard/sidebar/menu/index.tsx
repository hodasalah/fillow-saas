import { faBootstrap } from '@fortawesome/free-brands-svg-icons';
import {
	faChartLine,
	faCircleInfo,
	faFileLines,
	faHeart,
	faHouse,
	faTable,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import MetisMenu from '@metismenu/react';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../hooks/hooks';
import {
	closeSidebar,
	openSidebar,
} from '../../../../store/slices/sidebarSlice';
import MenuItem from './MenuItem';
import '/node_modules/metismenujs/dist/metismenujs.css';

// import MetisMenu css
const list = [
	{
		icon: faHouse,
		name: 'Dashboard',
		link: '/dashboard',
		hasSubMenu: true,
		submenu: [
			'Dashboard',
			'Project',
			'Contacts',
			'Kanban',
			'Calendar',
			'Messages',
		],
	},
	{
		icon: faChartLine,
		name: 'CMS',
		link: '/cms',
		hasSubMenu: true,
		submenu: [
			'Content',
			'Add Content',
			'Menus',
			'Email Template',
			'Add Email',
			'Blog',
			'Add Blog',
			'Blog Category',
		],
	},
	{
		icon: faCircleInfo,
		name: 'Apps',
		link: '/apps',
		hasSubMenu: true,
		submenu: [
			'Profile',
			'Edit Profile',
			'Post Details',
			'Email',
			'Calendar',
			'Shop',
		],
	},
	{
		icon: faChartLine,
		name: 'Charts',
		link: '/charts',
		hasSubMenu: true,
		submenu: [
			'Flot',
			'Morris',
			'Chartjs',
			'Chartist',
			'Sparkline',
			'Peity',
		],
	},
	{
		icon: faBootstrap,
		name: 'Bootstrap',
		link: '/bootstrap',
		hasSubMenu: true,
		submenu: [
			'Flot',
			'Morris',
			'Chartjs',
			'Chartist',
			'Sparkline',
			'Peity',
		],
	},
	{
		icon: faHeart,
		name: 'Plugins',
		link: '/plugins',
		hasSubMenu: true,
		submenu: [
			'Flot',
			'Morris',
			'Chartjs',
			'Chartist',
			'Sparkline',
			'Peity',
		],
	},
	{
		icon: faUser,
		name: 'Widget',
		link: '/widget',
		hasSubMenu: false,
	},
	{
		icon: faFileLines,
		name: 'Forms',
		link: '/forms',
		hasSubMenu: true,
		submenu: [
			'Flot',
			'Morris',
			'Chartjs',
			'Chartist',
			'Sparkline',
			'Peity',
		],
	},
	{
		icon: faTable,
		name: 'Table',
		link: '/table',
		hasSubMenu: true,
		submenu: [
			'Flot',
			'Morris',
			'Chartjs',
			'Chartist',
			'Sparkline',
			'Peity',
		],
	},
];

const MenuList = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				dispatch(openSidebar()); // On large screens, ensure sidebar is open
			} else {
				dispatch(closeSidebar()); // On small screens, ensure sidebar is closed
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize(); // Trigger resize handler on component mount
		return () => window.removeEventListener('resize', handleResize); // Cleanup listener
	}, [dispatch]);

	return (
		<MetisMenu className='metismenu relative flex flex-col pt-[0.9375rem]'>
			{list.map((item, index) => (
				<MenuItem
					key={item.name}
					item={item}
					index={index}
				/>
			))}
		</MetisMenu>
	);
};

export default MenuList;
