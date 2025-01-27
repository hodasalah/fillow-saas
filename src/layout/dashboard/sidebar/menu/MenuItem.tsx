import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router';
import { useAppSelector } from '../../../../hooks/hooks';
import './MenuItem.css';

interface MenuItemProps {
	item: {
		icon: string;
		name: string;
		link: string;
		hasSubMenu: boolean;
		submenu?: string[];
	};
	index: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);
	
		return (
			<li className='menuItem'>
				<a
					className={`has-arrow`}
					href='javascript:void()'
				>
					<FontAwesomeIcon icon={item.icon as IconProp} />
					<span className=''>{item.name}</span>
				</a>
				<ul
					className='metismenu relative flex flex-col transition-all duration-300 ease-in-out py-2 px-0'
					id={'submenu'}
				>
					{item.hasSubMenu &&
						item.submenu &&
						item.submenu.map((submenu) => (
							<li
								className={`flex flex-col my-[5px] mx-0 pr-[5px] transition-all duration-300 ease-in-out`}
								key={submenu}
							>
								<NavLink
									to={`/${submenu.toLowerCase()}`}
									className={`nav-link `}
								>
									{submenu}
								</NavLink>
							</li>
						))}
				</ul>
			</li>
		);
	}


export default MenuItem;
