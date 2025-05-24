import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-white p-4'>
			{/* 404 Text */}
			<h1 className='text-[200px] font-bold text-[#333333] leading-none'>
				404
			</h1>

			{/* Warning Message */}
			<div className='text-center max-w-lg'>
				<div className='flex items-center justify-center gap-2 mb-4'>
					<span className='text-yellow-500 text-4xl'>⚠️</span>
					<h2 className='text-3xl font-bold text-[#333333]'>
						The page you were looking for is not found!
					</h2>
				</div>
				<p className='text-gray-500 mb-8'>
					You may have mistyped the address or the page may have
					moved.
				</p>

				{/* Back to Home Button */}
				<button
					onClick={() => navigate('/')}
					className='px-8 py-3 bg-[#8950fc] text-white rounded-md hover:bg-[#7337e8] transition-colors duration-200'
				>
					Back to Home
				</button>
			</div>
		</div>
	);
};

export default NotFound;
