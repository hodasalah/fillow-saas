import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { useAppSelector } from '../../../../hooks/hooks';
import './MenuItem.css';
import { MenuItemProps } from '.';


const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  
	useEffect(() => {
		if (item.name === 'Dashboard') {
			ref?.current?.classList?.add('mm-active');
		}
	}, []);
	const ref = useRef<HTMLLIElement>(null);
	return (
		<li
			className='menuItem'
			ref={ref}
		>
			<a className={`has-arrow`}>
				<FontAwesomeIcon icon={item.icon as IconProp} />
				<span className=''>{item.name}</span>
			</a>
			<ul
				className='metismenu relative flex flex-col transition-all duration-300 ease-in-out py-2 px-0'
			>
				{item.hasSubMenu &&
					item.submenu &&
					item.submenu.map((submenuItem) => (
						<li
							className={`flex flex-col my-[5px] mx-0 pr-[5px] transition-all duration-300 ease-in-out`}
							key={submenuItem.title}
						>
							<NavLink
								to={submenuItem.link}
								className={`nav-link `}
							>
								{submenuItem.title}
							</NavLink>
						</li>
					))}
			</ul>
		</li>
	);
};

export default MenuItem;
