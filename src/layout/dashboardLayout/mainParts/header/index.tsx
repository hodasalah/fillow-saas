import { useAppSelector } from '../../../../hooks/hooks';
import HeaderContent from './headerContent/index';

interface HeaderProps {
	setShowSlider: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setShowSlider }) => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
	return (
		<div
			className={`fixed  h-[--dz-header-height] bg-[#f3f0f9]  ${
				mode !== 'wide' || isMobileView
					? 'w-[calc(100vw-6rem)] ml-[6rem]'
					: 'w-[calc(100vw-16.5rem)] ml-[16.5rem]'
			} border-b-[1px] border-[--border] transition-all  z-[1]`}
		>
			<HeaderContent setShowSlider={setShowSlider} />
		</div>
	);
};

export default Header;
