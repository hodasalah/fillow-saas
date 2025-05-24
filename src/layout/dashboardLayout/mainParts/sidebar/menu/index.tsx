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
import MetisMenu from '@metismenu/react';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../../../../hooks/hooks';
import { DASHBOARD_ROUTES } from '../../../constants';
import MenuItem from './MenuItem';
import './MenuItem.css';
import MiniMenuItem from './MiniMenuItem';
import '/node_modules/metismenujs/dist/metismenujs.css';

export interface MenuItemProps {
	item: {
		id: string;
		icon: IconDefinition;
		name: string;
		hasSubMenu: boolean;
		submenu?: { title: string; link: string }[];
	};
	index?: number;
	activeItem: string;
	setActiveItem?: (id: string) => void;
	onItemClick?: (id: string) => void;
	toggleDropdown?: (id: string) => void;
	openDropdown?: string | null;
	setOpenDropdown: (id: string) => void;
}

const list = [
	{
		id: uuidv4(),
		icon: faHouse,
		name: 'Dashboard',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Dashboard', link: DASHBOARD_ROUTES.HOME },
			{ id: uuidv4(), title: 'Chat', link: DASHBOARD_ROUTES.CHAT },
			{ id: uuidv4(), title: 'Profile', link: DASHBOARD_ROUTES.PROFILE },
			{
				id: uuidv4(),
				title: 'Projects',
				link: DASHBOARD_ROUTES.PROJECTS,
			},
		],
	},
	{
		id: uuidv4(),
		icon: faChartLine,
		name: 'CMS',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Content', link: 'content' },
			{ id: uuidv4(), title: 'Add Content', link: 'add-content' },
			{ id: uuidv4(), title: 'Menus', link: 'menus' },
			{ id: uuidv4(), title: 'Email Template', link: 'email-template' },
			{ id: uuidv4(), title: 'Add Email', link: 'add-email' },
			{ id: uuidv4(), title: 'Blog', link: 'blog' },
			{ id: uuidv4(), title: 'Add Blog', link: 'add-blog' },
			{ id: uuidv4(), title: 'Blog Category', link: 'blog-category' },
		],
	},
	{
		id: uuidv4(),
		icon: faCircleInfo,
		name: 'Apps',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Profile', link: 'profile' },
			{ id: uuidv4(), title: 'Edit Profile', link: 'edit-profile' },
			{ id: uuidv4(), title: 'Post Details', link: 'post-details' },
			{ id: uuidv4(), title: 'Email', link: 'email' },
			{ id: uuidv4(), title: 'Calendar', link: 'calendar' },
			{ id: uuidv4(), title: 'Shop', link: 'shop' },
		],
	},
	{
		id: uuidv4(),
		icon: faChartLine,
		name: 'Charts',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Chart', link: 'chart' },
			{ id: uuidv4(), title: 'Chart 2', link: 'chart2' },
			{ id: uuidv4(), title: 'Chart 3', link: 'chart3' },
		],
	},
	{
		id: uuidv4(),
		icon: faBootstrap,
		name: 'Bootstrap',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Bootstrap', link: 'bootstrap' },
			{ id: uuidv4(), title: 'Bootstrap 2', link: 'bootstrap2' },
			{ id: uuidv4(), title: 'Bootstrap 3', link: 'bootstrap3' },
		],
	},
	{
		id: uuidv4(),
		icon: faHeart,
		name: 'Plugins',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'plugin-1', link: 'plugin-1' },
			{ id: uuidv4(), title: 'plugin-2', link: 'plugin-2' },
			{ id: uuidv4(), title: 'plugin-3', link: 'plugin-3' },
		],
	},
	{
		id: uuidv4(),
		icon: faUser,
		name: 'Widget',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Edit Profile', link: 'edit-profile' },
			{ id: uuidv4(), title: 'signOut', link: 'signout' },
		],
	},
	{
		id: uuidv4(),
		icon: faFileLines,
		name: 'Forms',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Form Elements', link: 'form-elements' },
			{ id: uuidv4(), title: 'Form Layouts', link: 'form-layouts' },
			{
				id: uuidv4(),
				title: 'Form Validation',
				link: '/form-validation',
			},
			{ id: uuidv4(), title: 'Form Advanced', link: 'form-advanced' },
		],
	},
	{
		id: uuidv4(),
		icon: faTable,
		name: 'Table',
		hasSubMenu: true,
		submenu: [
			{ id: uuidv4(), title: 'Table Elements', link: 'table-elements' },
			{ id: uuidv4(), title: 'Table Data', link: 'table-data' },
		],
	},
];

const MenuList = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileOpen = useAppSelector((state) => state.sidebar.isMobileOpen);

	// active link in mini sidebar
	const [activeItem, setActiveItem] = useState<string | null>(list[0].id);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const dropdownlistRef = useRef<HTMLDivElement>(null);

	// set active link in mini sidebar
	const handleClick = (id: string) => {
		setActiveItem(id);
	};
	// click dropdown when be outside of mini sidebar
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
	// Toggle a specific dropdown by id

	const toggleDropdown = (id: string) => {
		setOpenDropdown((prev) => (prev === id ? null : id));
	};
	const showFullMenu = mode === 'wide' || isMobileOpen;

	return (
		<div>
			{showFullMenu ? (
				<div className={`overflow-hidden`}>
					<MetisMenu className='metismenu relative flex flex-col pt-[0.9375rem]'>
						{list.map((item) => (
							<MenuItem
								key={item.id}
								item={item}
								setActiveItem={setActiveItem}
								activeItem={activeItem || ''}
								toggleDropdown={toggleDropdown}
								setOpenDropdown={setOpenDropdown}
							/>
						))}
					</MetisMenu>
				</div>
			) : (
				<ul className={`relative flex-col pt-[0.9375rem] `}>
					{list.map((item) => (
						<MiniMenuItem
							key={item.id}
							item={item}
							activeItem={activeItem || ''}
							onItemClick={handleClick}
							toggleDropdown={toggleDropdown}
							openDropdown={openDropdown}
							setOpenDropdown={setOpenDropdown}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default MenuList;
