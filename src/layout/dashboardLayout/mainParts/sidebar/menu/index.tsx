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
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../../hooks/hooks';
import { DASHBOARD_ROUTES } from '../../../constants';
import MenuItem from './MenuItem';
import './MenuItem.css';
import MiniMenuItem from './MiniMenuItem';

export interface MenuItemProps {
	item: {
		id: string;
		icon: IconDefinition;
		name: string;
		hasSubMenu: boolean;
		submenu?: { id: string; title: string; link: string }[];
	};
	index?: number;
	activeItem: string;
	setActiveItem?: (id: string) => void;
	onItemClick?: (id: string) => void;
	toggleDropdown?: (id: string) => void;
	openDropdown?: string | null;
	setOpenDropdown: (id: string | null) => void;
}

const list = [
	{
		id: 'dashboard-item',
		icon: faHouse,
		name: 'Dashboard',
		hasSubMenu: true,
		submenu: [
			{ id: 'sub-dash', title: 'Dashboard', link: DASHBOARD_ROUTES.HOME },
			{ id: 'sub-chat', title: 'Chat', link: DASHBOARD_ROUTES.CHAT },
			{ id: 'sub-profile', title: 'Profile', link: DASHBOARD_ROUTES.PROFILE },
			{ id: 'sub-projects', title: 'Projects', link: DASHBOARD_ROUTES.PROJECTS },
		],
	},
	{
		id: 'cms-item',
		icon: faChartLine,
		name: 'CMS',
		hasSubMenu: true,
		submenu: [
			{ id: 'sub-content', title: 'Content', link: 'content' },
			{ id: 'sub-add-content', title: 'Add Content', link: 'add-content' },
		],
	},
	{
		id: 'apps-item',
		icon: faCircleInfo,
		name: 'Apps',
		hasSubMenu: true,
		submenu: [
			{ id: 'sub-app-profile', title: 'Profile', link: 'profile' },
			{ id: 'sub-app-edit', title: 'Edit Profile', link: 'edit-profile' },
		],
	},
	{
		id: 'charts-item',
		icon: faChartLine,
		name: 'Charts',
		hasSubMenu: true,
		submenu: [
			{ id: 'sub-chart-1', title: 'Chart', link: 'chart' },
		],
	},
	{
		id: 'bootstrap-item',
		icon: faBootstrap,
		name: 'Bootstrap',
		hasSubMenu: true,
		submenu: [
			{ id: 'sub-boot-1', title: 'Bootstrap', link: 'bootstrap' },
		],
	},
	{
		id: 'plugins-item',
		icon: faHeart,
		name: 'Plugins',
		hasSubMenu: true,
		submenu: [
			{ id: 'sub-plugin-1', title: 'plugin-1', link: 'plugin-1' },
		],
	},
	{
		id: 'widget-item',
		icon: faUser,
		name: 'Widget',
		hasSubMenu: true,
		submenu: [
			{ id: 'sub-widget-edit', title: 'edit-profile-widget', link: 'edit-profile' },
			{ id: 'sub-widget-signout', title: 'signOut', link: 'signout' },
		],
	},
	{
		id: 'forms-item',
		icon: faFileLines,
		name: 'Forms',
		hasSubMenu: true,
		submenu: [
			{ id: 'sub-form-elements', title: 'Form Elements', link: 'form-elements' },
		],
	},
	{
		id: 'table-item',
		icon: faTable,
		name: 'Table',
		hasSubMenu: true,
		submenu: [
			{ id: 'sub-table-elements', title: 'Table Elements', link: 'table-elements' },
		],
	},
];

const MenuList = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileOpen = useAppSelector((state) => state.sidebar.isMobileOpen);
	const location = useLocation();

	const [activeItem, setActiveItem] = useState<string | null>('dashboard-item');
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const dropdownlistRef = useRef<HTMLDivElement>(null);

	// Sync active menu with current URL
	useEffect(() => {
		const currentPath = location.pathname;
		const normalizedCurrent = currentPath.replace(/\/+$/, '') || '/dashboard';
		
		const activeParent = list.find((item) =>
			item.submenu?.some((sub) => {
				const subLink = sub.link === '' ? '' : sub.link;
				const fullPath = `/dashboard/${subLink}`.replace(/\/+$/, '') || '/dashboard';
				const normalizedFull = fullPath.replace(/\/+$/, '') || '/dashboard';
				return normalizedCurrent === normalizedFull;
			})
		);

		if (activeParent) {
			setActiveItem(activeParent.id);
		} else if (normalizedCurrent === '/dashboard' || normalizedCurrent === '/dashboard/') {
            // Specifically force dashboard-item for the root dashboard path
            setActiveItem('dashboard-item');
        }
	}, [location.pathname]);

	const handleClick = (id: string) => {
		setActiveItem(id);
	};

	useEffect(() => {
		const closeMenu = (e: MouseEvent) => {
			if (
				openDropdown !== null &&
				dropdownlistRef?.current &&
				!dropdownlistRef.current.contains(e.target as Node)
			) {
				setOpenDropdown(null);
			}
		};
		document.addEventListener('mousedown', closeMenu);
		return () => document.removeEventListener('mousedown', closeMenu);
	}, [openDropdown]);

	const toggleDropdown = (id: string) => {
		setOpenDropdown((prev) => (prev === id ? null : id));
	};

	const showFullMenu = mode === 'wide' || isMobileOpen;

	return (
		<div className="sidebar-menu-wrapper" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
			{showFullMenu ? (
				<div className="sidebar-scrollable">
					<ul className="relative flex flex-col pt-4 list-none m-0 p-0">
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
					</ul>
				</div>
			) : (
				<ul className="relative flex flex-col pt-4 list-none m-0 p-0">
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
