import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router';

const NotFound = () => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-[30px]'>
			<div className='bg-white max-w-[580px] min-w-[320px] w-full mx-auto py-12 px-8 rounded-lg shadow-lg text-center'>
				<div className='flex justify-center mb-8'>
					<div className='bg-red-100 p-4 rounded-full'>
						<svg
							className='w-16 h-16 text-red-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
							/>
						</svg>
					</div>
				</div>

				<h1 className='text-6xl font-bold text-gray-900 mb-4'>404</h1>
				<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
					Page Not Found
				</h2>
				<p className='text-gray-600 mb-8'>
					The page you're looking for doesn't exist or has been moved.
				</p>

				<NavLink
					to='/'
					className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200'
				>
					<FontAwesomeIcon icon={faArrowLeft} className='h-5 w-5 mr-2' />
					Go Back Home
				</NavLink>
			</div>
		</div>
	);
};

export default NotFound;
