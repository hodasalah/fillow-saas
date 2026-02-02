import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import { getUserProfile, UserProfile } from '../../../../services/firebase/profile';

const AboutMeCard: React.FC = () => {
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	const [ profile, setProfile ] = useState<UserProfile | null>(null);

	useEffect(() => {
		const loadProfile = async () => {
			if (currentUser) {
				const userProfile = await getUserProfile(currentUser.uid);
				setProfile(userProfile);
			}
		};
		loadProfile();
	}, [ currentUser ]);

	if (!profile) {
		return (
			<div className='bg-white dark:bg-[var(--card)] rounded-xl shadow-sm p-6 animate-pulse'>
				<div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4'></div>
				<div className='space-y-3'>
					{[ 1, 2, 3, 4 ].map(i => (
						<div key={i} className='h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
					))}
				</div>
			</div>
		);
	}

	const formatDate = (dateString: string) => {
		if (!dateString) return 'Not provided';
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) return dateString; // Return original if invalid
			return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
		} catch (e) {
			return dateString;
		}
	};

	const aboutMeDetails = [
		{ label: 'Work passion', value: profile.title.split('&')[ 0 ].trim() },
		{ label: 'Email', value: profile.email },
		{ label: 'Contact', value: profile.phone || 'Not provided' },
		{ label: 'Birth of Date', value: formatDate(profile.birthDate || '') },
		{ label: 'Location', value: profile.location },
		{ label: 'Website', value: profile.website },
		{ label: 'Github', value: profile.socialLinks.github?.replace('github.com/', '') || 'Not provided' }
	];

	return (
		<div className='bg-white dark:bg-[var(--card)] rounded-xl shadow-sm p-6 transition-colors duration-300'>
			<h2 className='text-xl font-semibold text-[var(--text-dark)] mb-4'>About Me</h2>
			<p className='text-[var(--text-gray)] mb-6 leading-relaxed'>
				{profile.bio}
			</p>
			<div className='space-y-3'>
				{aboutMeDetails.map((item, index) => (
					<div
						key={index}
						className='flex justify-between py-2 border-b border-[var(--border)] last:border-b-0 gap-4'
					>
						<span className='text-[var(--text-gray)] text-sm whitespace-nowrap'>{item.label}</span>
						<span className='text-[var(--text-dark)] text-sm font-medium text-right break-all'>{item.value}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default AboutMeCard;
