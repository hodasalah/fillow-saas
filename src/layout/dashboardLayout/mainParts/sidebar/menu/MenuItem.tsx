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
            className={`menuItem ${isActiveParent ? 'mm-active' : ''}`}
            data-active={isActiveParent}
        >
			<a
				className="has-arrow select-none"
				href="#"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (setActiveItem) {
						setActiveItem(isActiveParent ? '' : item.id);
					}
				}}
				style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%',
                    backgroundColor: isActiveParent ? 'var(--rgba-primary-1)' : 'transparent'
                }}
			>
				<FontAwesomeIcon icon={item.icon as IconProp} />
				<span className="ml-3">{item.name}</span>
			</a>
			
			{item.hasSubMenu && item.submenu && (
				<ul 
					className={`flex-col list-none m-0 p-0 w-full transition-all duration-300 ${isActiveParent ? 'flex' : 'hidden'}`}
					style={{ 
						backgroundColor: '#333', // Dark background for debugging
						padding: '8px 0',
                        borderLeft: '4px solid var(--primary)',
                        minHeight: isActiveParent ? '20px' : '0'
					}}
				>
					{item.submenu.map((submenuItem, index) => {
						const subLink = submenuItem.link === '' ? '' : submenuItem.link;
						const fullPath = subLink ? `/dashboard/${subLink}` : '/dashboard';
						
						// Exact matching for better accuracy
						const currentPath = location.pathname.replace(/\/+$/, '') || '/dashboard';
						const normalizedFullPath = fullPath.replace(/\/+$/, '') || '/dashboard';
						const isSubActive = currentPath === normalizedFullPath;

						return (
							<li
								key={`${item.id}-submenu-${index}`}
								className={`${isSubActive ? 'mm-active' : ''} w-full`}
								onClick={(e) => e.stopPropagation()}
							>
								<NavLink
									to={fullPath}
									className={({ isActive }) =>
										`nav-link ${isActive || isSubActive ? 'active' : ''}`
									}
									style={{ 
                                        display: 'block', 
                                        width: '100%',
                                        padding: '10px 20px 10px 60px',
                                        color: isSubActive ? 'var(--primary)' : '#fff', // White text on dark bg
                                        textDecoration: 'none',
                                        fontSize: '0.875rem'
                                    }}
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
