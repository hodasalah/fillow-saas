import { useState } from 'react';
import './hamburger.css';
const HamburgerBtn = () => {
	const [isActive, setIsActive] = useState(false);
	return (
		<div className='nav-control'>
			<div
				className={`hamburger ${isActive ? 'is-active' : ''}`}
				onClick={() => setIsActive(!isActive)}
			>
				<span className='line'></span>
				<span className='line'></span>
				<span className='line'></span>
			</div>
		</div>
	);
};

export default HamburgerBtn;
