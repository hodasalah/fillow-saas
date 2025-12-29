import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import { getUserProfile, UserProfile } from '../../../../services/firebase/profile';

const AchievementsCard: React.FC = () => {
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

	const getTimeAgo = (date: Date) => {
		const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
		if (days < 7) return `${days}d ago`;
		const weeks = Math.floor(days / 7);
		if (weeks < 4) return `${weeks}w ago`;
		const months = Math.floor(days / 30);
		return `${months}mo ago`;
	};

	if (!profile || !profile.achievements) {
		return null;
	}

	return (
		<div className='bg-white dark:bg-[var(--card)] rounded-xl shadow-sm p-6 transition-colors duration-300'>
			<h2 className='text-xl font-semibold text-[var(--text-dark)] mb-4'>Achievements</h2>
			<div className='grid grid-cols-1 gap-4'>
				{profile.achievements.map((achievement) => (
					<div
						key={achievement.id}
						className='group relative flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent hover:from-purple-50 dark:hover:from-purple-900/20 transition-all duration-200'
					>
						<div
							className='w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110'
							style={{ backgroundColor: achievement.color + '20' }}
						>
							{achievement.icon}
						</div>
						<div className='flex-1 min-w-0'>
							<h3 className='font-semibold text-[var(--text-dark)] mb-1'>
								{achievement.title}
							</h3>
							<p className='text-sm text-[var(--text-gray)] mb-2 line-clamp-2'>
								{achievement.description}
							</p>
							<span className='text-xs text-[var(--text-gray)]'>
								Earned {getTimeAgo(achievement.earnedAt)}
							</span>
						</div>
						<div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
							<svg className='w-5 h-5 text-yellow-500' fill='currentColor' viewBox='0 0 20 20'>
								<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
							</svg>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AchievementsCard;
