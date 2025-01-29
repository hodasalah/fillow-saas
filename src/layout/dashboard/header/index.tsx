import { useAppSelector } from '../../../hooks/hooks';
import HeaderContent from './headerContent/index';

const Header = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	return (
		<div
			className={`fixed  h-[--dz-header-height] bg-[#f3f0f9]  ${
				mode !== 'wide' ? 'md:pl-[10rem]' : 'md:pl-1'
			} pl-[7rem]  border-b-[1px] border-[--border] transition-all w-full z-[1000]`}
		>
			<HeaderContent />
		</div>
	);
};

export default Header;
