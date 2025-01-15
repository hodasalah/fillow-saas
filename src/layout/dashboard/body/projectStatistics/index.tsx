import { useState } from 'react';
import Card from '../../../../components/Card';

const ProjectStatistics = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [showDropdown, setShowDropdown] = useState(false);
	const tabsData = [
		{ name: 'Monthly', id: 'monthly' },
		{ name: 'Weekly', id: 'weekly' },
		{ name: 'Daily', id: 'daily' },
	];

	return (
		<div>
			<Card>
				<div className='w-full flex justify-between items-center border-0 pb-0 flex-wrap px-[1.875rem] pt-[1.5rem]'>
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
						<div className='dropdown ms-2 relative'>
							<div
								className='cursor-pointer'
								onClick={() => setShowDropdown(!showDropdown)}
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
								<a
									className='block w-full font-normal text-[#9da1a5] text-base py-2 px-7 active:text-[var(--primary)] active:bg-[var(--rgba-primary-1)] hover:text-[var(--primary)] hover:bg-[var(--rgba-primary-1)]'
									href='javascript:void(0)'
								>
									Delete
								</a>
								<a
									className='block w-full font-normal text-[#9da1a5] text-base py-2 px-7 active:text-[var(--primary)] active:bg-[var(--rgba-primary-1)] hover:text-[var(--primary)] hover:bg-[var(--rgba-primary-1)]'
									href='javascript:void(0)'
								>
									Edit
								</a>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ProjectStatistics;
