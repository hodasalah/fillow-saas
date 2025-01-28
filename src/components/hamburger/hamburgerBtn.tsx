import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { toggleSidebar } from '../../store/slices/sidebarSlice';
import './hamburger.css';
const HamburgerBtn = () => {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);
	const handleToggle = () => {
		dispatch(toggleSidebar());
	};

	return (
		<div className='nav-control'>
			<div
				className={`hamburger ${
					isOpen ? '' : 'is-active'
				}  md:block sm:hidden block`}
				onClick={handleToggle}
			>
				<span className='line'></span>
				<span className='line'></span>
				<span className='line'></span>
			</div>
		</div>
	);
};
export default HamburgerBtn;
