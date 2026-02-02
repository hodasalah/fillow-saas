import HamburgerBtn from '../../../../components/hamburger/hamburgerBtn';
import Logo from '../../../../components/logo/logo';
import MiniLogo from '../../../../components/logo/miniLogo';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { toggleMobile, toggleMode } from '../../../../store/slices/sidebarSlice';

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
	const isCompact = isMobileView || mode === 'mini';

	return (
		<div
			className={`${isCompact ? 'w-sidebar-mini' : 'w-sidebar-wide'
				} nav-header fixed top-0 left-0 flex items-center h-[--dz-header-height] transition-all duration-300 ease-in-out bg-nav-headbg z-[2] ${isCompact ? 'justify-center' : 'justify-between px-4'
				}`}
		>
			{isCompact ? (
				<div className='flex items-center justify-center w-full gap-3'>
					{/* Logo first */}
					<div className='brand-logo'>
						<MiniLogo />
					</div>

					{/* Hamburger after logo */}
					<div className='flex items-center'>
						{isMobileView ? (
							<HamburgerBtn onHandleClick={toggleSidebarOnMobile} />
						) : (
							<HamburgerBtn onHandleClick={handleToggle} />
						)}
					</div>
				</div>
			) : (
				<>
					<div className='flex items-center gap-4'>
						<div className='brand-logo'>
							<MiniLogo />
						</div>
						<div className='brand-title'>
							<Logo />
						</div>
					</div>

					<div className='flex items-center gap-3'>
						{isMobileView ? (
							<HamburgerBtn onHandleClick={toggleSidebarOnMobile} />
						) : (
							<HamburgerBtn onHandleClick={handleToggle} />
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default NavHeader;
