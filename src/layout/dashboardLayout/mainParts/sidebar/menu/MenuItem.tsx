import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuItemProps } from '.';
import './MenuItem.css';

const MenuItem: React.FC<MenuItemProps> = ({
	item,
	setActiveItem,
	activeItem,
}) => {
	const location = useLocation();
	const isActiveParent = item.id === activeItem;

	return (
		<li 
            className={`menuItem ${isActiveParent ? 'ds-active-parent' : ''}`}
        >
			<a
				className="ds-dropdown-toggle select-none"
				href="#"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (setActiveItem) {
						setActiveItem(isActiveParent ? '' : item.id);
					}
				}}
			>
				<FontAwesomeIcon icon={item.icon as IconProp} />
				<span className="ml-3">
                    {item.name}
                </span>
			</a>
			
			{isActiveParent && item.hasSubMenu && item.submenu && (
				<ul 
					className="ds-submenu-list ds-expanded"
					style={{ 
						display: 'flex', 
                        flexDirection: 'column',
                        listStyle: 'none',
                        padding: '5px 0',
                        margin: 0,
                        width: '100%',
                        visibility: 'visible',
                        opacity: 1
					}}
				>
					{item.submenu.map((submenuItem, index) => {
						const subLink = submenuItem.link === '' ? '' : submenuItem.link;
						const fullPath = subLink ? `/dashboard/${subLink}` : '/dashboard';
						
						const currentPath = location.pathname.replace(/\/+$/, '') || '/dashboard';
						const normalizedFullPath = fullPath.replace(/\/+$/, '') || '/dashboard';
						const isSubActive = currentPath === normalizedFullPath;

						return (
							<li
								key={`${item.id}-submenu-${index}`}
								style={{ width: '100%' }}
								onClick={(e) => e.stopPropagation()}
							>
								<NavLink
									to={fullPath}
									className={({ isActive }) =>
										`nav-link ${isActive || isSubActive ? 'active' : ''}`
									}
									end={submenuItem.link === ''}
								>
									{submenuItem.title}
								</NavLink>
							</li>
						);
					})}
				</ul>
			)}
		</li>
	);
};

export default MenuItem;
