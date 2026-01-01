import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuItemProps } from '.';
import './MenuItem.css';

const MenuItem: React.FC<MenuItemProps> = ({
	item,
	setActiveItem,
	activeItem,
}) => {
	const location = useLocation();
	const ref = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (item.id === activeItem) {
			ref?.current?.classList?.add('mm-active');
			setActiveItem?.(item.id);
		} else {
			ref.current?.classList.remove('mm-active');
		}
	}, [item.id, activeItem, setActiveItem]);

	return (
		<li
			className='menuItem'
			ref={ref}
			onClick={() => setActiveItem && setActiveItem(item.id)}
		>
			<a className={`has-arrow`}>
				<FontAwesomeIcon icon={item.icon as IconProp} />
				<span className=''>{item.name}</span>
			</a>
			<ul
				className={`metismenu relative flex-col transition-all duration-300 ease-in-out py-2 px-0 ${
					item.id === activeItem ? 'mm-show flex' : 'mm-collapse hidden'
				}`}
			>
				{item.hasSubMenu &&
					item.submenu &&
					item.submenu.map((submenuItem, index) => {
						const fullPath = `/dashboard/${submenuItem.link}`;
						const isActive = location.pathname === fullPath;
						return (
							<li
								key={`${item.id}-submenu-${index}`}
								className={`flex flex-col my-[5px] mx-0 pr-[5px] transition-all duration-300 ease-in-out ${
									isActive ? 'mm-active' : ''
								}`}
							>
								<NavLink
									to={fullPath}
									className={({ isActive }) =>
										`nav-link ${isActive ? 'active' : ''}`
									}
									end={submenuItem.title === 'Dashboard'}
								>
									{submenuItem.title}
								</NavLink>
							</li>
						);
					})}
			</ul>
		</li>
	);
};

export default MenuItem;
