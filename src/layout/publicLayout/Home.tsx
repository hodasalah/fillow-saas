import {
	faGithub,
	faLinkedin,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
	faArrowRight,
	faClose,
	faListDots,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router';

function Home() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<div className='min-h-screen bg-white'>
			{/* Navigation */}
			<nav className='fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<div className='flex items-center'>
							<div className='text-2xl font-bold text-indigo-600'>
								Brand
							</div>
						</div>
						<div className='hidden md:block'>
							<div className='ml-10 flex items-center space-x-4'>
								<NavLink
									to='/'
									className='text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
								>
									Home
								</NavLink>
								<a
									href='#'
									className='text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
								>
									Features
								</a>
								<a
									href='#'
									className='text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
								>
									About
								</a>
								<a
									href='#'
									className='text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
								>
									Contact
								</a>
								<NavLink
									to='/login'
									className='text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
								>
									Login
								</NavLink>
								<NavLink
									to='/signup'
									className='text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
								>
									Signup
								</NavLink>
							</div>
						</div>
						<div className='md:hidden'>
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none'
							>
								{isMenuOpen ? (
									<FontAwesomeIcon
										icon={faClose}
										className='h-6 w-6'
									/>
								) : (
									<FontAwesomeIcon
										icon={faListDots}
										className='h-6 w-6'
									/>
								)}
							</button>
						</div>
					</div>
				</div>
				{/* Mobile menu */}
				{isMenuOpen && (
					<div className='md:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
							<NavLink
								to='/'
								className='text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
							>
								Home
							</NavLink>
							<a
								href='#'
								className='text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
							>
								Features
							</a>
							<a
								href='#'
								className='text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
							>
								About
							</a>
							<a
								href='#'
								className='text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
							>
								Contact
							</a>
							<NavLink
								to='login'
								className='text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
							>
								Login
							</NavLink>
							<NavLink
								to='signup'
								className='text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium'
							>
								Signup
							</NavLink>
						</div>
					</div>
				)}
			</nav>

			{/* Hero Section */}
			<div className='relative isolate px-6 pt-14 lg:px-8'>
				<div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
					<div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
				</div>

				<div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
					<div className='text-center'>
						<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
							Build something amazing with modern tech
						</h1>
						<p className='mt-6 text-lg leading-8 text-gray-600'>
							Create stunning web applications using React,
							TypeScript, and Tailwind CSS. Start building your
							next big idea today.
						</p>
						<div className='mt-10 flex items-center justify-center gap-x-6'>
							<a
								href='#get-started'
								className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Get started
							</a>
							<a
								href='#learn-more'
								className='text-sm font-semibold leading-6 text-gray-900 flex items-center'
							>
								Learn more{' '}
								<FontAwesomeIcon
									icon={faArrowRight}
									className='ml-2 h-4 w-4'
								/>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className='py-24 sm:py-32'>
				<div className='mx-auto max-w-7xl px-6 lg:px-8'>
					<div className='mx-auto max-w-2xl lg:text-center'>
						<h2 className='text-base font-semibold leading-7 text-indigo-600'>
							Deploy faster
						</h2>
						<p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
							Everything you need to deploy your app
						</p>
						<p className='mt-6 text-lg leading-8 text-gray-600'>
							Get your ideas to production quickly with our modern
							tech stack and developer-friendly tools.
						</p>
					</div>
					<div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
						<dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
							{features.map((feature) => (
								<div
									key={feature.name}
									className='flex flex-col'
								>
									<dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
										{feature.name}
									</dt>
									<dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
										<p className='flex-auto'>
											{feature.description}
										</p>
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className='bg-white border-t'>
				<div className='mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8'>
					<div className='flex justify-center space-x-6 md:order-2'>
						<NavLink
							to='#'
							className='text-gray-400 hover:text-gray-500'
						>
							<FontAwesomeIcon
								icon={faGithub}
								className='h-6 w-6'
							/>
						</NavLink>
						<NavLink
							to='#'
							className='text-gray-400 hover:text-gray-500'
						>
							<FontAwesomeIcon
								icon={faTwitter}
								className='h-6 w-6'
							/>
						</NavLink>
						<NavLink
							to='#'
							className='text-gray-400 hover:text-gray-500'
						>
							<FontAwesomeIcon
								icon={faLinkedin}
								className='h-6 w-6'
							/>
						</NavLink>
					</div>
					<div className='mt-8 md:order-1 md:mt-0'>
						<p className='text-center text-xs leading-5 text-gray-500'>
							&copy; 2025 Your Company, Inc. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

const features = [
	{
		name: 'React + TypeScript',
		description:
			'Build type-safe applications with the power of React and TypeScript combined.',
	},
	{
		name: 'Tailwind CSS',
		description:
			'Create beautiful, responsive designs quickly with utility-first CSS framework.',
	},
	{
		name: 'Modern Development',
		description:
			'Enjoy hot module replacement, fast builds, and an excellent developer experience.',
	},
];

export default Home;
