import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import { getUserProfile, UserProfile } from '../../../../services/firebase/profile';

const ActivitiesCard: React.FC = () => {
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
		const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
		
		if (seconds < 60) return `${seconds}s ago`;
		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;
		const days = Math.floor(hours / 24);
		return `${days}d ago`;
	};

	const getActivityColor = (type: string) => {
		switch (type) {
			case 'complete': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
			case 'star': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
			case 'comment': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
			case 'like': return 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400';
			case 'follow': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
			default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
		}
	};

	if (!profile || !profile.activities) {
		return (
			<div className='bg-white dark:bg-[var(--card)] rounded-xl shadow-sm p-6 animate-pulse'>
				<div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4'></div>
				{[1, 2, 3].map(i => (
					<div key={i} className='flex items-center gap-3 mb-3'>
						<div className='w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full'></div>
						<div className='flex-1'>
							<div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2'></div>
							<div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
						</div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className='bg-white dark:bg-[var(--card)] rounded-xl shadow-sm p-6 transition-colors duration-300'>
			<h2 className='text-xl font-semibold text-[var(--text-dark)] mb-4'>Recent Activity</h2>
			<div className='space-y-4'>
				{profile.activities.slice(0, 6).map((activity) => (
					<div key={activity.id} className='flex items-start gap-3'>
						<div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
							<span className='text-lg'>{activity.icon}</span>
						</div>
						<div className='flex-1 min-w-0'>
							<p className='text-sm text-[var(--text-dark)] line-clamp-2'>
								{activity.description}
							</p>
							<span className='text-xs text-[var(--text-gray)] mt-1'>
								{getTimeAgo(activity.timestamp)}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ActivitiesCard;
