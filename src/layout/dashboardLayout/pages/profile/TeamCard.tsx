import React from 'react';

const TeamCard: React.FC = () => {
	const TeamMembers = [
		{ name: 'Bette Hagenes', role: 'Web Developer' },
		{ name: 'Flata Walsh', role: 'Web Designer' },
		{ name: 'Lenora', role: 'UI/UX Designer' },
		{ name: 'Flata Walsh', role: 'React Developer' },
		{ name: 'Emery McKenzie', role: 'Web Developer' },
		{ name: 'Bette Hagenes', role: 'Web Designer' },
	];

	return (
		<div className='bg-white rounded-xl shadow-sm p-6'>
			<h3 className='text-lg font-semibold mb-4'>Friends</h3>
			<div className='space-y-3'>
				{TeamMembers.map((member, index) => (
					<div
						key={index}
						className='flex items-center p-2 hover:bg-gray-50 rounded'
					>
						<div className='w-8 h-8 bg-gray-200 rounded-full mr-3'></div>
						<div>
							<p className='font-medium'>{member.name}</p>
							<p className='text-sm text-gray-500'>
								{member.role}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TeamCard;
