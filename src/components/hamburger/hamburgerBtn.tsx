import { useAppSelector } from '../../hooks/hooks';
import './hamburger.css';
const HamburgerBtn = ({ onHandleClick }: { onHandleClick: () => void }) => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileOpen = useAppSelector((state) => state.sidebar.isMobileOpen);

	return (
		<div className='nav-control'>
			<div
				className={`hamburger ${mode === 'wide' ? '' : 'is-active'} ${
					isMobileOpen ? 'close' : ''
				} block md:hidden lg:block `}
				onClick={onHandleClick}
			>
				<span className='line'></span>
				<span className='line'></span>
				<span className='line'></span>
			</div>
		</div>
	);
};
export default HamburgerBtn;
