import HamburgerBtn from '../../../components/hamburger/hamburgerBtn';
import Logo from '../../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { toggleMobile, toggleMode } from '../../../store/slices/sidebarSlice';
import MiniLogo from './../../../components/logo/miniLogo';

const NavHeader = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileOpen = useAppSelector((state) => state.sidebar.isMobileOpen);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);

	const dispatch = useAppDispatch();
	// open wide and mini menu
	const handleToggle = () => {
		dispatch(toggleMode());
				console.log(isMobileOpen);

	};
	const toggleSidebarOnMobile = () => {
		dispatch(toggleMobile());
		console.log(isMobileOpen);
	};
	return (
		<div
			className={`${
				mode === 'wide' ? 'w-sidebar-wide' : 'w-sidebar-mini'
			} nav-header fixed inline-block  top-0  h-[--dz-header-height]  transition-all  bg-nav-headbg z-[1001]`}
		>
			<div className='brand-logo'>
				<MiniLogo />
				{mode === 'wide' && (
					<div
						className={`${
							mode === 'wide' ? 'block' : 'hidden'
						}  md:block hidden brand-title`}
					>
						<Logo />
					</div>
				)}
			</div>
			{isMobileView ? (
				<HamburgerBtn onHandleClick={toggleSidebarOnMobile} />
			) : (
				<HamburgerBtn onHandleClick={handleToggle} />
			)}
		</div>
	);
};

export default NavHeader;
