import {
	faBell,
	faEnvelope,
	faMoon,
	faSearch,
	faShoppingBag,
	faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderContent = () => {
	return (
		<header className='relative flex items-center pl-[5rem] pr-[1.875rem] h-full'>
			<nav className='flex justify-between items-center w-full'>
				<div className='font-bold  text-[1.25rem] text-[--text-dark] '>
					Dashboard
				</div>
				<div
					className='nav-links duration-500 md:static 
                        absolute md:min-h-fit min-h-[60vh] 
                        left-0 top-[-100%] md:w-auto  w-full 
                        flex items-center px-5 '
				>
					<ul
						className='header-right flex md:flex-row flex-col 
                           md:items-center  gap-4'
					>
						<li className='h-full flex items-center text-[1.25rem]  gap-2'>
							<div className='relative flex items-stretch w-full flex-wrap search-area rounded-[50%]'>
								<input
									type='text'
									className='form-control relative flex-auto w-[1%]  h-[3rem] border-[#eee] border-r-0 rounded-tl-[3.125rem] rounded-bl-[3.125rem] min-w-[3.125rem] flex justify-center font-[400] text-[.825rem] items-center text-[--bs-body-color] leading-6 focus:border-[#eee] px-[1.25rem] py-[0.3125rem] focus:outline-none'
									placeholder='Search here...'
								/>

								<span className='input-group-text ml-[-1px] rounded-tl-none rounded-bl-none h-[3rem] rounded-[3.125rem] bg-white py-0 px-[1.25rem] border-[#e9e2f8] flex items-center justify-center text-[--bs-body-color]'>
									<FontAwesomeIcon
										icon={faSearch}
									></FontAwesomeIcon>
								</span>
							</div>
						</li>
						<li className='text-[--text-gray] h-full flex items-center p-[0.9375rem]  text-[1.25rem] '>
							<FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
						</li>
						<li className='text-[--text-gray] h-full flex items-center   text-[1.25rem] '>
							<div className='relative p-[0.9375rem] rounded-[.625rem]'>
								<FontAwesomeIcon
									icon={faStar}
								></FontAwesomeIcon>
								<span className='absolute bg-pink-300 text-white text-[0.675rem] font-medium me-2 w-[1.2rem] h-[1.2rem] leading-[1rem] text-center p-[.1rem] rounded-full dark:bg-pink-900 dark:text-pink-300 top-[8px] right-[-1px]'>
									76
								</span>
							</div>
						</li>
						<li className='text-[--text-gray] h-full flex items-center  text-[1.25rem] '>
							<div className='relative p-[0.9375rem] rounded-[.625rem]'>
								<FontAwesomeIcon
									icon={faBell}
								></FontAwesomeIcon>
								<span className='absolute bg-yellow-300 text-white text-[0.675rem] font-medium me-2 w-[1.2rem] h-[1.2rem] leading-[1rem] rounded-full dark:bg-yellow-900 dark:text-yellow-300 top-[8px] right-[-1px] text-center p-[.1rem]'>
									12
								</span>
							</div>
						</li>
						<li className='text-[--text-gray] h-full flex items-center  text-[1.25rem] '>
							<div className='relative p-[0.9375rem] rounded-[.625rem]'>
								<FontAwesomeIcon
									icon={faEnvelope}
								></FontAwesomeIcon>
								<span className='absolute bg-red-600 text-white text-[0.675rem] font-medium me-2 w-[1.2rem] h-[1.2rem] leading-[1rem] rounded-full dark:bg-yellow-900 dark:text-yellow-300 top-[8px] right-[-1px] text-center p-[.1rem]'>
									12
								</span>
							</div>
						</li>
						<li className='text-[--text-gray] h-full flex items-center  text-[1.25rem] '>
							<div className='relative p-[0.9375rem] rounded-[.625rem]'>
								<FontAwesomeIcon
									icon={faShoppingBag}
								></FontAwesomeIcon>
								<span className='absolute bg-green-600 text-white text-[0.675rem] font-medium me-2 w-[1.2rem] h-[1.2rem] leading-[1rem] rounded-full dark:bg-yellow-900  top-[8px] right-[-1px] text-center p-[.1rem]'>
									12
								</span>
							</div>
						</li>
						<li className='text-[--text-gray] relative h-full flex items-center'>
							<div className='flex items-center h-full'>
								<img
									src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
									alt='profile'
									className='w-[3rem] h-[3rem] rounded-[4.25rem]'
								/>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default HeaderContent;
