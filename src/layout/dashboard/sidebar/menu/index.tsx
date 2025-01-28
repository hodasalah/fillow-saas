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
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
		id: string;
		icon: IconDefinition;

		name: string;

		link: string;

		hasSubMenu: boolean;

		submenu?: { title: string; link: string }[];
	};

	index: number;
	setActiveItem: (id: string) => void;
}

// import MetisMenu css
const list = [
	{
		id: uuidv4(),
		icon: faHouse,
		name: 'Dashboard',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Dashboard', link: '/dashboard' },
			{ id: uuidv4(), title: 'Project', link: '/project' },
			{ id: uuidv4(), title: 'Contacts', link: '/contacts' },
			{ id: uuidv4(), title: 'Kanban', link: '/kanban' },
			{ id: uuidv4(), title: 'Calendar', link: '/calendar' },
			{ id: uuidv4(), title: 'Messages', link: '/messages' },
		],
	},
	{
		id: uuidv4(),
		icon: faChartLine,
		name: 'CMS',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Content', link: '/content' },
			{ id: uuidv4(), title: 'Add Content', link: '/add-content' },
			{ id: uuidv4(), title: 'Menus', link: '/menus' },
			{ id: uuidv4(), title: 'Email Template', link: '/email-template' },
			{ id: uuidv4(), title: 'Add Email', link: '/add-email' },
			{ id: uuidv4(), title: 'Blog', link: '/blog' },
			{ id: uuidv4(), title: 'Add Blog', link: '/add-blog' },
			{ id: uuidv4(), title: 'Blog Category', link: '/blog-category' },
		],
	},
	{
		id: uuidv4(),
		icon: faCircleInfo,
		name: 'Apps',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Profile', link: '/profile' },
			{ id: uuidv4(), title: 'Edit Profile', link: '/edit-profile' },
			{ id: uuidv4(), title: 'Post Details', link: '/post-details' },
			{ id: uuidv4(), title: 'Email', link: '/email' },
			{ id: uuidv4(), title: 'Calendar', link: '/calendar' },
			{ id: uuidv4(), title: 'Shop', link: '/shop' },
		],
	},
	{
		id: uuidv4(),
		icon: faChartLine,
		name: 'Charts',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Chart', link: '/chart' },
			{ id: uuidv4(), title: 'Chart 2', link: '/chart2' },
			{ id: uuidv4(), title: 'Chart 3', link: '/chart3' },
		],
	},
	{
		id: uuidv4(),
		icon: faBootstrap,
		name: 'Bootstrap',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Bootstrap', link: '/bootstrap' },
			{ id: uuidv4(), title: 'Bootstrap 2', link: '/bootstrap2' },
			{ id: uuidv4(), title: 'Bootstrap 3', link: '/bootstrap3' },
		],
	},
	{
		id: uuidv4(),
		icon: faHeart,
		name: 'Plugins',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'plugin-1', link: '/plugin-1' },
			{ id: uuidv4(), title: 'plugin-2', link: '/plugin-2' },
			{ id: uuidv4(), title: 'plugin-3', link: '/plugin-3' },
		],
	},
	{
		id: uuidv4(),
		icon: faUser,
		name: 'Widget',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Edit Profile', link: '/edit-profile' },
			{ id: uuidv4(), title: 'signOut', link: '/signout' },
		],
	},
	{
		id: uuidv4(),
		icon: faFileLines,
		name: 'Forms',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Form Elements', link: '/form-elements' },
			{ id: uuidv4(), title: 'Form Layouts', link: '/form-layouts' },
			{
				id: uuidv4(),
				title: 'Form Validation',
				link: '/form-validation',
			},
			{ id: uuidv4(), title: 'Form Advanced', link: '/form-advanced' },
		],
	},
	{
		id: uuidv4(),
		icon: faTable,
		name: 'Table',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Table Elements', link: '/table-elements' },
			{ id: uuidv4(), title: 'Table Data', link: '/table-data' },
		],
	},
];
console.log(list)
const MenuList = () => {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);
	// active link in mini sidebar
	const [activeItem, setActiveItem] = useState<string | null>(list[0].id);
	// open dropdown menu in mini sidebar
	const [openDropdown, setOpenDropdown] = useState<string | null>(list[0].id);
	const dropdownlistRef = useRef<HTMLDivElement>(null);

	// set active link in mini sidebar
	const handleClick = (id: string) => {
		setActiveItem(id);
	};
	// Toggle a specific dropdown by title

	const toggleDropdown = (id: string) => {
		setOpenDropdown((prev) => (prev === id ? null : id));
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

	useEffect(() => {
		const closeMenu = (e: MouseEvent) => {
			if (
				openDropdown !== null &&
				dropdownlistRef?.current &&
				!(dropdownlistRef.current as HTMLElement).contains(
					e.target as Node,
				)
			) {
				setOpenDropdown(null);
			}
		};
		document.addEventListener('mousedown', closeMenu);
		return () => {
			document.removeEventListener('mousedown', closeMenu);
		};
	}, [openDropdown]);

	if (isOpen) {
		return (
			<MetisMenu className='metismenu relative flex flex-col pt-[0.9375rem]'>
				{list.map((item, index) => (
					<MenuItem
						key={item.id}
						item={item}
						index={index}
						setActiveItem={setActiveItem}
						activeItem={activeItem}
					
					/>
				))}
			</MetisMenu>
		);
	}
	return (
		<ul className='relative flex flex-col pt-[0.9375rem]'>
			{list.map((item) => (
				<li
					className={`menuItemMobile ${
						activeItem === item.id ? 'mm-active' : ''
					}`}
					onClick={() => {
						handleClick(item.id);
						toggleDropdown(item.id);
					}}
					key={item.id}
				>
					<a>
						<FontAwesomeIcon icon={item.icon} />
					</a>

					{openDropdown === item.id && (
						<ul
							className='submenu-mobile flex flex-col transition-all duration-300 ease-in-out py-2 px-0'
							ref={dropdownlistRef}
						>
							{item.hasSubMenu &&
								item.submenu &&
								item.submenu.map((submenuItem) => (
									<MiniMenuItem
										key={submenuItem.id}
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
