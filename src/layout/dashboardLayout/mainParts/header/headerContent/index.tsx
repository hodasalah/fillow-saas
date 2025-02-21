import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import ProfileDropdown from '../../../../../components/profileDropdown/ProfileDropdown';
import { useAppSelector } from '../../../../../hooks/hooks';

import { items } from './constants';

interface HeaderContentProps {
	setShowSlider: (show: boolean) => void;
}

const HeaderContent = ({ setShowSlider }: HeaderContentProps) => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const dropdownRefs = useRef<Record<string, HTMLLIElement | null>>({});

	useEffect(() => {
		setActiveDropdown(null);
	}, [mode, isMobileView]);
	useEffect(() => {
		if (!activeDropdown) return;

		const handleClickOutside = (event: MouseEvent) => {
			const dropdownEl = dropdownRefs.current[activeDropdown];
			if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
				setActiveDropdown(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [activeDropdown]);

	const handleItemClick = (action: string) => {
		setActiveDropdown((prev) => (prev === action ? null : action));

		switch (action) {
			case 'search':
				console.log('Search clicked');
				break;
			case 'toggleTheme':
				console.log('Toggle theme');
				break;
			case 'messages':
				setShowSlider(true);
				break;
			default:
				break;
		}
	};

	return (
		<header
			className={`relative flex items-center ${
				mode === 'wide' || !isMobileView
					? 'pl-[4rem] md:pl-[5rem] '
					: 'lg:pl-[8rem] md:pl-[1.875rem] sm:pl-[8rem]'
			} pl-1  pr-1 sm:px-[1.875rem] h-full`}
		>
			<nav className='flex sm:justify-between justify-end items-center w-full'>
				<div className='font-bold text-[1.25rem] text-[--text-dark] hidden sm:block'>
					Dashboard
				</div>
				<div className='nav-links flex items-center px-2 sm:px-5'>
					<ul className='header-right w-full flex  md:items-center  justify-end'>
						{items.map((item) => {
							return item.icon === faSearch ? (
								<li
									key={item.action}
									className='hidden lg:flex h-full items-center text-[1.25rem] gap-2'
									onClick={() => handleItemClick(item.action)}
								>
									<div className='relative flex items-stretch w-full flex-wrap search-area rounded-[50%]'>
										<input
											type='text'
											className='form-control relative flex-auto w-[1%]  h-[3rem] border-[#eee] border-r-0 rounded-tl-[3.125rem] rounded-bl-[3.125rem] min-w-[3.125rem] flex justify-center font-[400] text-[.825rem] items-center text-[--bs-body-color] leading-6 focus:border-[#eee] px-[1.25rem] py-[0.3125rem] focus:outline-none'
											placeholder='Search here...'
										/>

										<span className='input-group-text ml-[-1px] rounded-tl-none rounded-bl-none h-[3rem] rounded-[3.125rem] bg-white py-0 px-[0.625rem] sm:px-[1.25rem] border-[#e9e2f8] flex items-center justify-center text-[--bs-body-color]'>
											<FontAwesomeIcon
												icon={item.icon}
											></FontAwesomeIcon>
										</span>
									</div>
								</li>
							) : (
								<li
									ref={(el) =>
										(dropdownRefs.current[item.action] = el)
									}
									className='relative cursor-pointer text-[--text-gray] h-full flex items-center text-[1.125rem] sm:text-[1.25rem] px-[0.45rem] sm:px-[1.25rem]'
									key={item.action}
									onClick={() => handleItemClick(item.action)}
								>
									<div className='relative p-[0.625rem] sm:p-[0.9375rem] rounded-[.625rem]'>
										<FontAwesomeIcon
											icon={item.icon}
										></FontAwesomeIcon>
										{item.num && (
											<span
												className={`absolute  text-white ${item.bg} text-[0.675rem] font-medium me-2 w-[1.2rem] h-[1.2rem] leading-[1rem] text-center p-[.1rem] rounded-full  sm:top-[8px] sm:right-[-1px] top-0 right-[-0.625rem] `}
											>
												{item.num}
											</span>
										)}
									</div>
									{activeDropdown === item.action &&
										item.children}
								</li>
							);
						})}

						<li className='h-full flex items-center w-[3.5rem]'>
							<ProfileDropdown />
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default HeaderContent;
