import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuItemProps } from '.';

const MiniMenuItem: React.FC<MenuItemProps> = ({
	item,
	activeItem,
	onItemClick,
	toggleDropdown,
	openDropdown,
}) => {
	const dropdownlistRef = useRef<HTMLUListElement>(null);
	const location = useLocation();

	const isOpen = openDropdown === item.id;

	return (
		<li
			className={`menuItemMobile ${
				activeItem === item.id ? 'ds-active-parent' : ''
			}`}
			key={item.id}
			onClick={() => {
				onItemClick?.(item.id);
				toggleDropdown?.(item.id);
			}}
			style={{ cursor: 'pointer' }}
		>
			<a href="#" onClick={(e) => e.preventDefault()}>
				<FontAwesomeIcon icon={item.icon} />
			</a>

			<AnimatePresence>
				{isOpen && item.hasSubMenu && item.submenu && (
					<motion.ul
						key={`${item.id}-submenu-mobile`}
						className='submenu-mobile flex flex-col'
						ref={dropdownlistRef}
						onClick={(e) => e.stopPropagation()}
						initial={{ opacity: 0, x: -10, scale: 0.95 }}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						exit={{ opacity: 0, x: -10, scale: 0.95 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
					>
						{item.submenu.map((submenuItem, index) => {
							const fullPath = `/dashboard/${submenuItem.link}`;
							const isActive = location.pathname === fullPath;
							return (
								<li
									key={`${item.id}-submenu-${index}`}
								>
									<NavLink
										to={fullPath}
										className={({ isActive: isLinkActive }) =>
											`nav-link ${
												isActive || isLinkActive ? 'active' : ''
											}`
										}
										end={submenuItem.title === 'Dashboard'}
									>
										{submenuItem.title}
									</NavLink>
								</li>
							);
						})}
					</motion.ul>
				)}
			</AnimatePresence>
		</li>
	);
};

export default MiniMenuItem;
