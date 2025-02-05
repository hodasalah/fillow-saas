import {
	faBell,
	faEnvelope,
	faMoon,
	faSearch,
	faShoppingBag,
	faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ProfileDropdown from '../../../../components/profileDropdown/ProfileDropdown';
import { useAppSelector } from '../../../../hooks/hooks';
import Notifications from './RelatedApps';
import RelatedApps from './RelatedApps';

export const items = [
	{ icon: faSearch, action: 'search' },
	{ icon: faMoon, action: 'toggleTheme' },
	{
		icon: faStar,
		num: 76,
		bg: 'bg-[#ffa7d7]',
		action: 'relatedApps',
		children: (
			<div className='absolute top-[100%] right-0 mt-2'>
				<RelatedApps />
			</div>
		),
	},
	{
		icon: faBell,
		num: 12,
		bg: 'bg-[#ffbf00]',
		action: 'notifications',
	},
	{ icon: faEnvelope, num: 2, bg: 'bg-[#fc2e53]', action: 'messages' },
	{ icon: faShoppingBag, num: 4, bg: 'bg-[#ffbf00]', action: 'cart' },
];

const HeaderContent = ({ setShowSlider }) => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
	const [showRelatedApps, setShowRelatedApps] = useState(false);

	const handleItemClick = (action) => {
		switch (action) {
			case 'search':
				console.log('Search clicked');
				// Implement search action logic here
				break;
			case 'toggleTheme':
				console.log('Toggle theme');
				// Implement theme toggle logic here
				break;
			case 'relatedApps':
				setShowRelatedApps(!showRelatedApps); // Implement favorites logic here
				break;
			case 'notifications':
				break;
			case 'messages':
				console.log('Messages clicked');
				setShowSlider(true);
				// Implement messages logic here (e.g., slide in chat box)
				break;
			case 'cart':
				console.log('Cart clicked');
				// Implement cart logic here
				break;
			default:
				console.log('No action defined');
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
						{items.map((item, index) => {
							return item.icon === faSearch ? (
								<li
									key={'faSearch'}
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
									className='relative cursor-pointer text-[--text-gray] h-full flex items-center text-[1.125rem] sm:text-[1.25rem] px-[0.45rem] sm:px-[1.25rem]'
									key={index}
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
									{showRelatedApps &&
										item.action === 'relatedApps' &&
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
