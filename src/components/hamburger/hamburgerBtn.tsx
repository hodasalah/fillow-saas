import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setToggleActiveSidebar } from '../../store/slices/sidebarSlice';
import './hamburger.css';
const HamburgerBtn = ({ OnBtnClick }: { OnBtnClick: () => void }) => {
	const dispatch = useAppDispatch();
	const isActive = useAppSelector((state) => state.activeSidebar.isActive);

	useEffect(() => {
		const body = document.querySelector('body');
		const handleResize = () => {
			if (body) {
				if (body.offsetWidth >= 768) {
					body.setAttribute('data-sidebar-style', 'full');
				} else {
					body.setAttribute('data-sidebar-style', 'mini');
				}
			}
		};
		if (isActive) {
			body?.setAttribute('data-sidebar-style', 'mini');
		} else {
			body?.setAttribute('data-sidebar-style', 'full');
		}

		window.addEventListener('resize', handleResize);
		handleResize(); // Initial check

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isActive]);
	return (
		<div className='nav-control'>
			<div
				className={`hamburger ${
					isActive ? 'is-active' : ''
				} hidden md:block`}
				onClick={() => {
					dispatch(setToggleActiveSidebar());
					OnBtnClick();
				}}
			>
				<span className='line'></span>
				<span className='line'></span>
				<span className='line'></span>
			</div>
		</div>
	);
};
export default HamburgerBtn;
