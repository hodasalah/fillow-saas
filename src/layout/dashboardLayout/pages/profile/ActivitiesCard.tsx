import React from 'react';

const ActivitiesCard: React.FC = () => {
	return (
		<div className='bg-white rounded-xl shadow-sm p-6'>
			<h2 className='text-xl font-semibold mb-4'>Activities</h2>
			<div className='space-y-3'>
				{['Projects', 'Post', 'Friends'].map((item) => (
					<div
						key={item}
						className='p-3 hover:bg-gray-50 rounded-lg cursor-pointer'
					>
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

export default ActivitiesCard;
