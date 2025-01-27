import HamburgerBtn from '../../../components/hamburger/hamburgerBtn';
import Logo from '../../../components/logo/logo';
import { useAppSelector } from '../../../hooks/hooks';
import MiniLogo from './../../../components/logo/miniLogo';

const NavHeader = () => {
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);
	

	return (
		<div
			className={`${
				isOpen ? 'w-[16.5rem]' : 'w-[6rem]'
			} nav-header fixed inline-block  top-0  h-[--dz-header-height]  transition-all  bg-nav-headbg z-[1001]`}
		>
			<div className='brand-logo'>
				<MiniLogo />
				{isOpen && (
					<div
						className={`${
							isOpen ? 'block' : 'hidden'
						}  md:block hidden brand-title`}
					>
						<Logo />
					</div>
				)}
			</div>
			<HamburgerBtn/>
		</div>
	);
};

export default NavHeader;
