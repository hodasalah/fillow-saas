import React from 'react';
import { NavLink, useLocation } from 'react-router';

import './MenuItem.css';

const MiniMenuItem: React.FC<{
	submenuItem: { title: string; link: string };
}> = ({ submenuItem }) => {
	const location = useLocation();
	return (
		<li
			className={`flex flex-col my-[5px] mx-0 pr-[5px] transition-all duration-300 ease-in-out ${
				location.pathname === submenuItem.link ? 'mm-active' : ''
			}`}
		>
			<NavLink
				to={submenuItem.link}
				className={`nav-link`}
			>
				{submenuItem.title}
			</NavLink>
		</li>
	);
};

export default MiniMenuItem;
