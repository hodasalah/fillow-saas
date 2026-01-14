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
			<div className='space-y-4'>
				{TeamMembers.map((member, index) => (
					<div
						key={index}
						className='flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors group cursor-pointer'
					>
                        <div className="flex items-center gap-3">
						    <img 
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff`} 
                                alt={member.name}
                                className='w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm'
                            />
                            <div>
                                <p className='font-medium text-sm text-[var(--text-dark)]'>{member.name}</p>
                                <p className='text-xs text-[var(--text-gray)]'>
                                    {member.role}
                                </p>
                            </div>
                        </div>
                        <button className="text-xs px-3 py-1 bg-[var(--primary)] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            Message
                        </button>
					</div>
				))}
			</div>
			</div>
		</div>
	);
};

export default TeamCard;
