import React, { useState } from 'react';

const ProfileCard: React.FC = () => {
	const [isFollowing, setIsFollowing] = useState(false);

	return (
		<div className='bg-white rounded-xl shadow-lg p-6 w-80 text-center'>
			{/* Profile Picture */}
			<div className='mb-4'>
				<img
					src='https://placehold.co/100x100/6366f1/fff?text=NM'
					alt='Profile'
					className='w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto'
				/>
			</div>

			{/* Name and Title */}
			<h2 className='text-2xl font-bold text-gray-800 mb-1'>
				Ninfa Monaldo
			</h2>
			<p className='text-gray-600 text-sm mb-6'>
				Web designer & Developer
			</p>

			{/* Stats */}
			<div className='grid grid-cols-3 gap-4 mb-6'>
				<div>
					<div className='text-xl font-bold text-gray-800'>10</div>
					<div className='text-xs text-gray-500'>Post</div>
				</div>
				<div>
					<div className='text-xl font-bold text-gray-800'>3.4k</div>
					<div className='text-xs text-gray-500'>Follower</div>
				</div>
				<div>
					<div className='text-xl font-bold text-gray-800'>1k</div>
					<div className='text-xs text-gray-500'>Following</div>
				</div>
			</div>

			{/* Follow Button */}
			<button
				onClick={() => setIsFollowing(!isFollowing)}
				className={`w-full py-3 rounded-lg font-semibold transition-colors ${
					isFollowing
						? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
						: 'bg-indigo-600 text-white hover:bg-indigo-700'
				}`}
			>
				{isFollowing ? 'Following' : 'Follow'}
			</button>
		</div>
	);
};

export default ProfileCard;
