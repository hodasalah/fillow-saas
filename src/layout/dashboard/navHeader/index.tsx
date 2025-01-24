import HamburgerBtn from '../../../components/hamburger/hamburgerBtn';
import Logo from '../../../components/logo/logo';
import { useAppSelector } from '../../../hooks/hooks';
import MiniLogo from './../../../components/logo/miniLogo';

const NavHeader = () => {
	const isActive = useAppSelector((state) => state.activeSidebar.isActive);

	return (
		<div
			className={`w-[--dz-sidebar-width] ${
				isActive ? 'w-[6rem]' : ' '
			} nav-header fixed inline-block  top-0  h-[--dz-header-height]  transition-all ease-in duration-200 bg-nav-headbg z-[1001]`}
		>
			<div className='brand-logo'>
				<MiniLogo />
				{!isActive && (
					<div
						className={`${
							isActive ? 'hidden' : 'block'
						} hidden  md:block brand-title`}
					>
						<Logo />
					</div>
				)}
			</div>
			<HamburgerBtn
				OnBtnClick={() => {
					console.log('hello');
				}}
			/>
		</div>
	);
};

export default NavHeader;
