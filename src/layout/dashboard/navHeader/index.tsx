import HamburgerBtn from '../../../components/hamburger/hamburgerBtn';
import Logo from '../../../components/logo/logo';
import MiniLogo from './../../../components/logo/miniLogo';

const NavHeader = () => {
	return (
		<div className='nav-header fixed inline-block transition-all top-0  h-[--dz-header-height]  w-[--dz-sidebar-width] bg-nav-headbg z-40'>
			<div className='brand-logo'>
				<MiniLogo />
				<div className='brand-title'>
					<Logo />
				</div>
			</div>
			<HamburgerBtn />
		</div>
	);
};

export default NavHeader;
