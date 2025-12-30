import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { getOrCreateProfile, updateUserProfile, UserProfile } from '../../../../services/firebase/profile';
import { uploadProfilePicture } from '../../../../services/firebase/storage';
import { updateUserData } from '../../../../services/firebase/users';
import { setUser } from '../../../../store/slices/authSlice';
import { getImmediateProfilePictureUrl } from '../../../../utils/profilePicture';

const ProfileCard: React.FC = () => {
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

	useEffect(() => {
		const loadProfile = async () => {
			if (!currentUser) {
				setLoading(false);
				return;
			}

			try {
				const userProfile = await getOrCreateProfile(
					currentUser.uid,
					currentUser.name || 'User',
					currentUser.email || '',
					currentUser.profilePicture || undefined
				);
				setProfile(userProfile);
			} catch (error) {
				console.error('Error loading profile:', error);
			} finally {
				setLoading(false);
			}
		};

		loadProfile();
	}, [currentUser]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !currentUser) return;

        try {
            setUploading(true);
            // 1. Upload to Firebase Storage
            const downloadURL = await uploadProfilePicture(currentUser.uid, file);

            // 2. Update Firestore Collections
            await Promise.all([
                updateUserProfile(currentUser.uid, { photoURL: downloadURL }),
                updateUserData(currentUser.uid, { photoURL: downloadURL })
            ]);

            // 3. Update Redux Auth State (so header updates too)
            dispatch(setUser({
                ...currentUser,
                profilePicture: downloadURL
            }));

            // 4. Update Local State
            if (profile) {
                setProfile({ ...profile, photoURL: downloadURL });
            }
            
            console.log('✅ Profile picture updated successfully:', downloadURL);
        } catch (error) {
            console.error('Error updating profile picture:', error);
            alert('Failed to upload image. Please check your Firebase Storage rules.');
        } finally {
            setUploading(false);
        }
    };

	if (loading) {
		return (
			<div className='bg-white dark:bg-[var(--card)] rounded-xl shadow-lg p-6 text-center animate-pulse'>
				<div className='w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4'></div>
				<div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2'></div>
				<div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto'></div>
			</div>
		);
	}

	if (!profile) {
		return null;
	}

	return (
		<div className='bg-white dark:bg-[var(--card)] rounded-xl shadow-lg p-6 text-center transition-colors duration-300'>
			{/* Profile Picture */}
			<div className='mb-4 relative inline-block group cursor-pointer' onClick={handleImageClick}>
				<img
					src={currentUser?.profilePicture || getImmediateProfilePictureUrl(profile.photoURL, profile.displayName)}
					alt={profile.displayName}
					className={`w-24 h-24 rounded-full border-4 border-white dark:border-[var(--border)] shadow-lg mx-auto object-cover transition-opacity ${uploading ? 'opacity-50' : ''}`}
					onError={(e) => {
						(e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.displayName)}&background=886cc0&color=fff&size=200`;
					}}
				/>
                {uploading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-xs font-semibold">Change</span>
                    </div>
                )}
				<div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-[var(--card)] rounded-full" title="Online"></div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                />
			</div>

			{/* Name and Title */}
			<h2 className='text-2xl font-bold text-[var(--text-dark)] mb-1'>
				{profile.displayName}
			</h2>
			<p className='text-[var(--text-gray)] text-sm mb-6'>
				{profile.title}
			</p>

			{/* Stats */}
			<div className='grid grid-cols-3 gap-4 mb-6'>
				<div>
					<div className='text-xl font-bold text-[var(--text-dark)]'>
						{profile.stats.posts}
					</div>
					<div className='text-xs text-[var(--text-gray)]'>Posts</div>
				</div>
				<div>
					<div className='text-xl font-bold text-[var(--text-dark)]'>
						{profile.stats.followers >= 1000 
							? (profile.stats.followers / 1000).toFixed(1) + 'k'
							: profile.stats.followers}
					</div>
					<div className='text-xs text-[var(--text-gray)]'>Followers</div>
				</div>
				<div>
					<div className='text-xl font-bold text-[var(--text-dark)]'>
						{profile.stats.following >= 1000 
							? (profile.stats.following / 1000).toFixed(1) + 'k'
							: profile.stats.following}
					</div>
					<div className='text-xs text-[var(--text-gray)]'>Following</div>
				</div>
			</div>

			{/* Social Links */}
			<div className='flex justify-center gap-3 mb-6'>
				{profile.socialLinks.github && (
					<a
						href={`https://${profile.socialLinks.github}`}
						target='_blank'
						rel='noopener noreferrer'
						className='w-10 h-10 rounded-full bg-gray-100 dark:bg-[var(--border)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all duration-200'
						title='GitHub'
					>
						<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z'/>
						</svg>
					</a>
				)}
				{profile.socialLinks.linkedin && (
					<a
						href={`https://${profile.socialLinks.linkedin}`}
						target='_blank'
						rel='noopener noreferrer'
						className='w-10 h-10 rounded-full bg-gray-100 dark:bg-[var(--border)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all duration-200'
						title='LinkedIn'
					>
						<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
						</svg>
					</a>
				)}
				{profile.socialLinks.twitter && (
					<a
						href={`https://${profile.socialLinks.twitter}`}
						target='_blank'
						rel='noopener noreferrer'
						className='w-10 h-10 rounded-full bg-gray-100 dark:bg-[var(--border)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all duration-200'
						title='Twitter'
					>
						<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'/>
						</svg>
					</a>
				)}
			</div>

			{/* Edit Profile Button */}
			<button
				className='w-full py-3 rounded-lg font-semibold bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors duration-200'
			>
				Edit Profile
			</button>
		</div>
	);
};

export default ProfileCard;
