import { useAppSelector } from '../../../hooks/hooks';
import HeaderContent from './headerContent/index';

const Header = () => {
	const isActive = useAppSelector((state) => state.activeSidebar.isActive);
	return (
		<div
			className={`fixed pl-[--dz-sidebar-width] h-[--dz-header-height] bg-[#f3f0f9]  ${
				isActive ? 'pl-[10rem]' : ''
			}   border-b-[1px] border-[--border] transition-all ease-in duration-300 w-full z-[1000]`}
		>
			<HeaderContent />
		</div>
	);
};

export default Header;
