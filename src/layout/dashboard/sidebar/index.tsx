import { useAppSelector } from '../../../hooks/hooks';
import MenuList from './menu';
import SidebarFooter from './SidebarFooter';
import SidebarProfile from './sidebarProfile';

 /* 
 * @returns sidebar component
 * wide sidebar in large screens with toggle button
 * mini sidebar in medium screens without toggle button
 * hidden sidebar in small screen in left side with open and close button
 */

const Sidebar = () => {
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);

	return (
		<aside
			className={`lg:overflow-auto z-[1001] h-[calc(100vh-4.5rem)] fixed top-[--dz-header-height] bg-sidebar-bg pt-0 border-r-[1px] border-[--border]  transition-all shadow-[0rem_0.9375rem_1.875rem_0rem_rgba(0,0,0,0.1)] ${
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
