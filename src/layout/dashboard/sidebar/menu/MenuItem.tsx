import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router';

interface MenuItemProps {
	item: {
		icon: string;
		name: string;
		link: string;
		hasSubMenu: boolean;
		submenu?: string[];
	};
}
const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
	const ABeforeStyle =
		"before:absolute before:content-[''] before:rounded-t-r-[3.563rem] before:rounded-b-r-[3.653rem]  before:top-0 before:left-0 before:w-0 before:h-full before:bg-[var(--primary)] before:transition-all duration-[0.5s]";
	return (
		<li className='relative flex flex-col my-[5px] mx-0 pr-[5px]'>
			<a
				className={`has-arrow font-medium inline-block py-[0.85rem] px-[1.5rem] text-[0.9375rem] text-[var(--text-gray)] ${ABeforeStyle}`}
				href='javascript:void()'
				aria-expanded='false'
			>
				<FontAwesomeIcon icon={item.icon as IconProp} />
				<span className=''>{item.name}</span>
			</a>
			<ul
				aria-expanded='false'
				className='transition-all duration-300 ease-in-out relative py-2 px-0'
			>
				{item.hasSubMenu &&
					item.submenu &&
					item.submenu.map((submenu) => (
						<li>
							<Link to={`${item.link}/${submenu.toLowerCase()}`}>
								{submenu}
							</Link>
						</li>
					))}
			</ul>
		</li>
	);
};

export default MenuItem;
