import React from 'react';

const FeaturedPostCard: React.FC = () => {
	return (
		<div className='bg-white rounded-xl shadow-sm p-6'>
			<div className='flex items-center mb-4'>
				<div className='w-10 h-10 bg-gray-200 rounded-full mr-3'></div>
				<div>
					<p className='font-medium'>Hell Walsh</p>
					<p className='text-sm text-gray-500'>3 Week</p>
				</div>
			</div>
			<p className='text-gray-600 mb-4'>
				There’s nothing like fresh flowers!... 😊 😊 😊
			</p>
			<div className='text-indigo-600 font-medium'>2k likes</div>
		</div>
	);
};

export default FeaturedPostCard;
