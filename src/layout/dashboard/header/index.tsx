import { useAppSelector } from '../../../hooks/hooks';
import HeaderContent from './headerContent/index';

const Header = () => {
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);
	return (
		<div
			className={`fixed  h-[--dz-header-height] bg-[#f3f0f9]  ${
				!isOpen ? 'pl-[10rem]' : 'pl-1'
			}   border-b-[1px] border-[--border] transition-all w-full z-[1000]`}
		>
			<HeaderContent />
		</div>
	);
};

export default Header;
