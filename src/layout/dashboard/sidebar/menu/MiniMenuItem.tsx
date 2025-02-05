import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router';
import { MenuItemProps } from '.';

const MiniMenuItem: React.FC<MenuItemProps> = ({
	item,
	activeItem,
	onItemClick,
	toggleDropdown,
	openDropdown,
	setOpenDropdown = () => {}
}) => {
	const dropdownlistRef = useRef<HTMLUListElement>(null);
	const location = useLocation();
	useEffect(() => {
		const closeMenu = (e: MouseEvent) => {
			if (
				openDropdown !== null &&
				dropdownlistRef.current &&
				!dropdownlistRef.current.contains(e.target as Node)
			) {
				setOpenDropdown(null);
			}
		};
		document.addEventListener('mousedown', closeMenu);
		return () => {
			document.removeEventListener('mousedown', closeMenu);
		};
	}, [openDropdown]);

	return (
		<li
			className={`menuItemMobile  ${
				activeItem === item.id ? 'mm-active' : ''
			}`}
			onClick={() => {
				onItemClick?.(item.id);
				toggleDropdown?.(item.id);
			}}
			key={item.id}
		>
			<a>
				<FontAwesomeIcon icon={item.icon} />
			</a>
			{openDropdown === item.id && (
				<ul
					className='submenu-mobile flex flex-col transition-all duration-300 ease-in-out py-2 px-0'
					ref={dropdownlistRef}
				>
					{item.hasSubMenu &&
						item.submenu &&
						item.submenu.map((submenuItem) => (
							<li
								className={`flex flex-col my-[5px] mx-0 pr-[5px] transition-all duration-300 ease-in-out ${
									location.pathname === submenuItem.link
										? 'mm-active'
										: ''
								}`}
							>
								<NavLink
									to={submenuItem.link}
									className={`nav-link`}
								>
									{submenuItem.title}
								</NavLink>
							</li>
						))}
					<div className='absolute left-[-6px] top-[27px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-white'></div>
				</ul>
			)}
		</li>
	);
};

export default MiniMenuItem;
