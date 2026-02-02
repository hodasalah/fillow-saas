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
			className={`fixed top-0 right-0 h-[--dz-header-height] bg-[var(--headerbg)] ${isMobileView || mode === 'mini'
				? 'left-[6rem]'
				: 'left-[16.5rem]'
				} border-b-[1px] border-[--border] transition-all z-[1]`}
		>
			<HeaderContent setShowSlider={setShowSlider} />
		</div>
	);
};

export default Header;
