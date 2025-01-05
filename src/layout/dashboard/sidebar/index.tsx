import { useAppSelector } from '../../../hooks/hooks';

const Sidebar = () => {
	const isActive = useAppSelector(
				(state) => state.activeSidebar.isActive,
			);
	return (
		<div className={`w-[--dz-sidebar-width]  ${isActive?'w-[6rem]':' '} h-[calc(100vh-4.5rem)] fixed top-[--dz-header-height] bg-sidebar-bg pt-0 border-r-[1px] border-[--border]  transition-all ease-in duration-200 shadow-[0rem_0.9375rem_1.875rem_0rem_rgba(0,0,0,0.1)]`}>
			sidebar
		</div>
	);
};

export default Sidebar;
