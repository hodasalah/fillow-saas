import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import { getUserProfile, UserProfile } from '../../../../services/firebase/profile';

const SkillsCard: React.FC = () => {
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	const [profile, setProfile] = useState<UserProfile | null>(null);

	useEffect(() => {
		const loadProfile = async () => {
			if (currentUser) {
				const userProfile = await getUserProfile(currentUser.uid);
				setProfile(userProfile);
			}
		};
		loadProfile();
	}, [currentUser]);

	if (!profile || !profile.skills) {
		return null;
	}

	const getSkillColor = (category: string) => {
		switch (category) {
			case 'frontend': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
			case 'backend': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
			case 'tools': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
			case 'soft': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
			default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
		}
	};

	const renderStars = (level: number) => {
		return (
			<div className='flex gap-1'>
				{[1, 2, 3, 4, 5].map((star) => (
					<svg
						key={star}
						className={`w-4 h-4 ${
							star <= level
								? 'text-yellow-400 fill-current'
								: 'text-gray-300 dark:text-gray-600'
						}`}
						viewBox='0 0 20 20'
					>
						<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
					</svg>
				))}
			</div>
		);
	};

	return (
		<div className='bg-white dark:bg-[var(--card)] rounded-xl shadow-sm p-6 transition-colors duration-300'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-semibold text-[var(--text-dark)]'>Skills</h2>
				<span className='text-sm text-[var(--text-gray)]'>
					{profile.skills.length} skills
				</span>
			</div>
			
			<div className='space-y-4'>
				{profile.skills.map((skill, index) => (
					<div key={index} className='space-y-2'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<span className={`px-3 py-1 rounded-full text-xs font-medium ${getSkillColor(skill.category)}`}>
									{skill.name}
								</span>
							</div>
							{renderStars(skill.level)}
						</div>
					</div>
				))}
			</div>

			{/* Category Legend */}
			<div className='mt-6 pt-4 border-t border-[var(--border)]'>
				<div className='grid grid-cols-2 gap-2 text-xs'>
					<div className='flex items-center gap-2'>
						<div className='w-3 h-3 rounded-full bg-purple-500'></div>
						<span className='text-[var(--text-gray)]'>Frontend</span>
					</div>
					<div className='flex items-center gap-2'>
						<div className='w-3 h-3 rounded-full bg-pink-500'></div>
						<span className='text-[var(--text-gray)]'>Backend</span>
					</div>
					<div className='flex items-center gap-2'>
						<div className='w-3 h-3 rounded-full bg-blue-500'></div>
						<span className='text-[var(--text-gray)]'>Tools</span>
					</div>
					<div className='flex items-center gap-2'>
						<div className='w-3 h-3 rounded-full bg-green-500'></div>
						<span className='text-[var(--text-gray)]'>Soft Skills</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkillsCard;
