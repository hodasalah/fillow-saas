import { useEffect, useRef, useState } from 'react';
import Card from '../../../../components/Card';
import Barchart from '../../../../components/chart/Barchart';
import ProgressCircle from '../../../../components/svgs/progressCircle';
import RedCircle from '../../../../components/svgs/RedCircle';
import YellowCircle from '../../../../components/svgs/YellowCircle';

const ProjectStatistics = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownMenuRef = useRef<HTMLDivElement>(null);

	const tabsData = [
		{ name: 'Monthly', id: 'monthly' },
		{ name: 'Weekly', id: 'weekly' },
		{ name: 'Daily', id: 'daily' },
	];
	const dropdownMenuLinks = [
		{
			name: 'Delete',
			id: 'delete',
		},
		{
			name: 'Edit',
			id: 'edit',
		},
	];

	useEffect(() => {
		const closeMenu = (e: MouseEvent) => {
			if (
				showDropdown &&
				dropdownMenuRef?.current &&
				!(dropdownMenuRef.current as HTMLElement).contains(
					e.target as Node,
				)
			) {
				setShowDropdown(false);
			}
		};
		document.addEventListener('mousedown', closeMenu);
		return () => {
			document.removeEventListener('mousedown', closeMenu);
		};
	}, [showDropdown]);

	const ToggleMenu = () => {
		setShowDropdown((prevState) => !prevState);
	};
	return (
		<div className=''>
			<Card>
				<div className='w-full p-[1.875rem]'>
					{/* First Row */}
					<div className='w-full flex justify-between items-center border-0 pb-0 flex-wrap'>
						<h4 className='mb-0 text-xl font-semibold text-[var(--text-dark)] capitalize mt-0'>
							Project Statistics
						</h4>
						<div className='flex items-center justify-between mt-3'>
							<div className='sm:mt-0 me-3'>
								<ul className='flex flex-wrap w-full items-center gap-4 border-0 rounded-[0.625rem] bg-[var(--rgba-primary-1)] p-1 mb-0 whitespace-nowrap'>
									{tabsData.map((tab, index) => (
										<li
											key={tab.id}
											className={` flex-1  block py-[.5rem] px-[1.125rem] text-center text-sm font-medium  cursor-pointer text-[#737B8B]  hover:text-[var(--primary)]  ${
												index === activeTab &&
												'bg-[var(--primary)] text-white hover:text-white rounded-[0.625rem]'
											}  `}
											onClick={() => setActiveTab(index)}
										>
											{tab.name}
										</li>
									))}
								</ul>
							</div>
							<div
								className='dropdown ms-2 relative'
								ref={dropdownMenuRef}
							>
								<div
									className='cursor-pointer'
									onClick={ToggleMenu}
								>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<circle
											cx='12.4999'
											cy='3.5'
											r='2.5'
											fill='#A5A5A5'
										></circle>
										<circle
											cx='12.4999'
											cy='11.5'
											r='2.5'
											fill='#A5A5A5'
										></circle>
										<circle
											cx='12.4999'
											cy='19.5'
											r='2.5'
											fill='#A5A5A5'
										></circle>
									</svg>
								</div>
								<div
									className={`border-0 z-10 overflow-hidden rounded-xl shadow-[0 0 3.125rem 0 rgba(82, 63, 105, 0.15)] bg-white min-w-40 py-2 px-0 text-[#9da1a5]  text-left ${
										showDropdown
											? 'block absolute right-auto bottom-auto left-0 top-0 m-0 translate3d'
											: 'hidden'
									} `}
								>
									<ul className=''>
										{dropdownMenuLinks.map((link) => (
											<li
												key={link.id}
												className='block w-full font-normal text-[#9da1a5] text-base py-2 px-7 active:text-[var(--primary)] active:bg-[var(--rgba-primary-1)] hover:text-[var(--primary)] hover:bg-[var(--rgba-primary-1)]'
											>
												{link.name}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Second Row */}
					<div className='w-full flex flex-1 pt-[1.875rem]'>
						<div className='flex items-center gap-4 w-full justify-between'>
							<div className='flex items-center justify-between '>
								<ProgressCircle
									percentage={60}
									colour='#886cc0'
								/>
								<div className='ms-3'>
									<h2 className='mb-0 leading-7 text-[1.5rem] text-[var(--text-dark)] font-semibold '>
										246
									</h2>
									<p className='my-0 leading-7 text-[rgb(157, 161, 165)]'>
										Total Projects
									</p>
								</div>
							</div>
							{/* Second Row */}
							<div className='flex'>
								<div className='flex me-5'>
									<div className='mt-2'>
										<YellowCircle />
									</div>
									<div className='ms-3'>
										<h4 className='text-[1.5rem] text-[var(--text-dark)] font-semibold leading-6  mb-[.3rem]'>
											246
										</h4>
										<p className='mb-0 leading-[1.8]'>
											On Going
										</p>
									</div>
								</div>
								<div className='flex'>
									<div className='mt-2'>
										<RedCircle />
									</div>
									<div className='ms-3'>
										<h4 className='text-[1.5rem] text-[var(--text-dark)] font-semibold leading-6 mb-[.3rem]'>
											28
										</h4>
										<p className='mb-0 leading-[1.8]'>
											Unfinished
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Third Row */}
					<div>
						<Barchart />
					</div>
					{/* Fourth Row */}
					<div className='flex items-center gap-7'>
						<label className='inline-flex items-center cursor-pointer'>
							<span className='me-3 text-sm font-medium text-gray-700'>
								Number{' '}
							</span>
							<input
								type='checkbox'
								value=''
								className='sr-only peer'
							/>
							<div className="relative w-11 h-6  peer-focus:outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[var(--primary)] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--rgba-primary-2)] peer-checked:after:bg-[var(--primary)] bg-gray-200"></div>
						</label>

						<label className='inline-flex items-center cursor-pointer'>
							<span className='me-3 text-sm font-medium text-gray-700 '>
								Analytics{' '}
							</span>
							<input
								type='checkbox'
								value=''
								className='sr-only peer'
							/>
							<div className="relative w-11 h-6  peer-focus:outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[var(--primary)] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--rgba-primary-2)] peer-checked:after:bg-[var(--primary)] bg-gray-200"></div>
						</label>
					</div>
				</div>
			</Card>
		</div>
	);
};
export default ProjectStatistics;
