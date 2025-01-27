import { useAppSelector } from '../../../hooks/hooks';
import MenuList from './menu';
import SidebarFooter from './SidebarFooter';
import SidebarProfile from './sidebarProfile';

const Sidebar = () => {
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);

	return (
		<aside
			className={` h-[calc(100vh-4.5rem)] fixed top-[--dz-header-height] bg-sidebar-bg pt-0 border-r-[1px] border-[--border]  transition-all  shadow-[0rem_0.9375rem_1.875rem_0rem_rgba(0,0,0,0.1)] ${
				isOpen
					? 'w-[var(--dz-sidebar-width)]'
					: 'w-[var(--dz-sidebar-width-mobile)]'
			}`}
		>
			<MenuList />
			<SidebarProfile />
			<SidebarFooter />
		</aside>
	);
};
export default Sidebar;
