import { faBootstrap } from '@fortawesome/free-brands-svg-icons';
import {
	faChartLine,
	faCircleInfo,
	faFileLines,
	faHeart,
	faHouse,
	faTable,
	faUser,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MetisMenu from '@metismenu/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
	closeSidebar,
	openSidebar,
} from '../../../../store/slices/sidebarSlice';
import MenuItem from './MenuItem';
import './MenuItem.css';
import MiniMenuItem from './MiniMenuItem';
import '/node_modules/metismenujs/dist/metismenujs.css';

export interface MenuItemProps {
	item: {
		icon: IconDefinition;

		name: string;

		link: string;

		hasSubMenu: boolean;

		submenu?: { title: string; link: string }[];
	};

	index: number;
}

// import MetisMenu css
const list = [
	{
		icon: faHouse,
		name: 'Dashboard',
		link: '/dashboard',
		hasSubMenu: true,
		submenu: [
			{ title: 'Dashboard', link: '/dashboard' },
			{ title: 'Project', link: '/project' },
			{ title: 'Contacts', link: '/contacts' },
			{ title: 'Kanban', link: '/kanban' },
			{ title: 'Calendar', link: '/calendar' },
			{ title: 'Messages', link: '/messages' },
		],
	},
	{
		icon: faChartLine,
		name: 'CMS',
		link: '/cms',
		hasSubMenu: true,
		submenu: [
			{ title: 'Content', link: '/content' },
			{ title: 'Add Content', link: '/add-content' },
			{ title: 'Menus', link: '/menus' },
			{ title: 'Email Template', link: '/email-template' },
			{ title: 'Add Email', link: '/add-email' },
			{ title: 'Blog', link: '/blog' },
			{ title: 'Add Blog', link: '/add-blog' },
			{ title: 'Blog Category', link: '/blog-category' },
		],
	},
	{
		icon: faCircleInfo,
		name: 'Apps',
		link: '/apps',
		hasSubMenu: true,
		submenu: [
			{ title: 'Profile', link: '/profile' },
			{ title: 'Edit Profile', link: '/edit-profile' },
			{ title: 'Post Details', link: '/post-details' },
			{ title: 'Email', link: '/email' },
			{ title: 'Calendar', link: '/calendar' },
			{ title: 'Shop', link: '/shop' },
		],
	},
	{
		icon: faChartLine,
		name: 'Charts',
		link: '/charts',
		hasSubMenu: true,
		submenu: [
			{ title: 'Chart', link: '/chart' },
			{ title: 'Chart 2', link: '/chart2' },
			{ title: 'Chart 3', link: '/chart3' },
		],
	},
	{
		icon: faBootstrap,
		name: 'Bootstrap',
		link: '/bootstrap',
		hasSubMenu: true,
		submenu: [
			{ title: 'Bootstrap', link: '/bootstrap' },
			{ title: 'Bootstrap 2', link: '/bootstrap2' },
			{ title: 'Bootstrap 3', link: '/bootstrap3' },
		],
	},
	{
		icon: faHeart,
		name: 'Plugins',
		link: '/plugins',
		hasSubMenu: true,
		submenu: [
			{ title: 'plugin-1', link: '/plugin-1' },
			{ title: 'plugin-2', link: '/plugin-2' },
			{ title: 'plugin-3', link: '/plugin-3' },
		],
	},
	{
		icon: faUser,
		name: 'Widget',
		link: '/widget',
		hasSubMenu: true,
		submenu: [
			{ title: 'Edit Profile', link: '/edit-profile' },
			{ title: 'signOut', link: '/signout' },
		],
	},
	{
		icon: faFileLines,
		name: 'Forms',
		link: '/forms',
		hasSubMenu: true,
		submenu: [
			{ title: 'Form Elements', link: '/form-elements' },
			{ title: 'Form Layouts', link: '/form-layouts' },
			{ title: 'Form Validation', link: '/form-validation' },
			{ title: 'Form Advanced', link: '/form-advanced' },
		],
	},
	{
		icon: faTable,
		name: 'Table',
		link: '/table',
		hasSubMenu: true,
		submenu: [
			{ title: 'Table Elements', link: '/table-elements' },
			{ title: 'Table Data', link: '/table-data' },
		],
	},
];

const MenuList = () => {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);
	// active link in mini sidebar
	const [activeIndex, setActiveIndex] = useState<number | null>(0);
	// open dropdown menu in mini sidebar
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	// set active link in mini sidebar
	const handleClick = (index: number) => {
		setActiveIndex(index);
	};
	// Toggle a specific dropdown by title
	interface ToggleDropdown {
		(name: string): void;
	}

	const toggleDropdown: ToggleDropdown = (name) => {
		setOpenDropdown((prev) => (prev === name ? null : name));
	};

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

	if (isOpen) {
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
	}
	return (
		<ul className='relative flex flex-col pt-[0.9375rem]'>
			{list.map((item, index) => (
				<li
					className={`menuItemMobile ${
						activeIndex === index ? 'mm-active' : ''
					}`}
					onClick={() => {
						handleClick(index);
						toggleDropdown(item.name);
					}}
					key={item.name}
				>
					<a>
						<FontAwesomeIcon icon={item.icon} />
					</a>

					{openDropdown === item.name && (
						<ul className='submenu-mobile flex flex-col transition-all duration-300 ease-in-out py-2 px-0'>
							{item.hasSubMenu &&
								item.submenu &&
								item.submenu.map((submenuItem) => (
									<MiniMenuItem
										key={submenuItem.title}
										submenuItem={submenuItem}
									/>
								))}
							<div className='absolute left-[-6px] top-[27px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-white'></div>
						</ul>
					)}
				</li>
			))}
		</ul>
	);
};

export default MenuList;
