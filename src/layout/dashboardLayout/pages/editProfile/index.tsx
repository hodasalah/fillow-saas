import {
    faCamera,
    faEnvelope,
    faFloppyDisk,
    faPhone,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { updateUserProfile } from '../../../../services/firebase/profile';
import { uploadProfilePicture } from '../../../../services/firebase/storage';
import { updateUserData } from '../../../../services/firebase/users';
import { setUser } from '../../../../store/slices/authSlice';

import { getImmediateProfilePictureUrl } from '../../../../utils/profilePicture';

const EditProfile = () => {
	const dispatch = useAppDispatch();
	// Get user from Firebase auth state
	const currentUser = useAppSelector((state) => state.auth.currentUser);

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '+1 234 567 890',
		bio: 'Passionate developer creating stunning web experiences.',
		role: 'Senior Developer',
	});

	const [previewImage, setPreviewImage] = useState<string | null>(
		currentUser ? getImmediateProfilePictureUrl(currentUser.profilePicture, currentUser.name) : '/assets/profile-default.png',
	);

	// State to track uploaded file
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	// Update form data when user is loaded from Firebase
	useEffect(() => {
		if (currentUser) {
			const nameParts = currentUser.name?.split(' ') || ['', ''];
			setFormData((prev) => ({
				...prev,
				firstName: nameParts[0] || '',
				lastName: nameParts.slice(1).join(' ') || '',
				email: currentUser.email || '',
				phone: currentUser.phone || prev.phone,
				bio: currentUser.bio || prev.bio,
				role: currentUser.title || prev.role,
			}));

			// Set profile picture from Firebase user
            // Use utility to get valid URL or fallback
			setPreviewImage(getImmediateProfilePictureUrl(currentUser.profilePicture, currentUser.name));
		}
	}, [currentUser]);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Store the file for later upload
			setUploadedFile(file);
			
			// Preview the image locally
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Save profile changes to Firebase
	const handleSaveChanges = async () => {
		if (!currentUser) {
			alert('User not logged in');
			return;
		}

		setIsSaving(true);
		try {
			let photoURL = currentUser.profilePicture;

			// Upload new profile picture if one was selected
			if (uploadedFile) {
				console.log('Uploading profile picture...');
				photoURL = await uploadProfilePicture(currentUser.uid, uploadedFile);
				console.log('Profile picture uploaded:', photoURL);
			}

			// Combine first and last name
			const fullName = `${formData.firstName} ${formData.lastName}`.trim();

			// Update user profile in userProfiles collection
			await updateUserProfile(currentUser.uid, {
				displayName: fullName,
				email: formData.email,
				photoURL: photoURL,
				phone: formData.phone,
				bio: formData.bio,
				title: formData.role,
			});

			// Also update the users collection for consistency, including ALL fields
			await updateUserData(currentUser.uid, {
				displayName: fullName,
				photoURL: photoURL,
				email: formData.email,
				phone: formData.phone,
				bio: formData.bio,
				title: formData.role,
			});

			// Update global state immediately
			dispatch(setUser({
				...currentUser,
				name: fullName,
				email: formData.email,
				profilePicture: photoURL,
				phone: formData.phone,
				bio: formData.bio,
				title: formData.role,
			}));

			// Clear uploaded file
			setUploadedFile(null);

			alert('Profile updated successfully!');
		} catch (error) {
			console.error('Error saving profile:', error);
			alert('Failed to update profile. Please try again.');
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className='w-full px-4 py-6 md:px-6 md:py-8'>
			<div className='max-w-7xl mx-auto'>
				{/* Header Banner */}
				<div className='relative mb-24 md:mb-20'>
					<div className='h-48 md:h-56 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] overflow-hidden shadow-lg'>
						<div className='absolute inset-0 bg-black/10'></div>
						<div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/30 to-transparent'></div>
					</div>

					<div className='absolute -bottom-16 left-4 md:left-8 flex items-end space-x-4 md:space-x-6'>
						<div className='relative group'>
							<div className='w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[var(--card)] overflow-hidden shadow-xl bg-[var(--card)]'>
								<img
									src={previewImage || ''}
									alt='Profile'
									className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        // Prevent infinite loop if fallback also fails
                                        if (!target.src.includes('ui-avatars.com')) {
                                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.firstName + ' ' + formData.lastName)}&background=886cc0&color=fff&size=200`;
                                        }
                                    }}
								/>
							</div>
							<label
								htmlFor='profile-upload'
								className='absolute bottom-2 right-2 w-9 h-9 md:w-10 md:h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-[var(--primary-dark)] transition-all duration-300 z-10 hover:scale-110 active:scale-95'
							>
								<FontAwesomeIcon icon={faCamera} className='text-sm' />
							</label>
							<input
								type='file'
								id='profile-upload'
								className='hidden'
								accept='image/*'
								onChange={handleImageChange}
							/>
						</div>
						<div className='mb-4 text-[var(--title)] hidden sm:block'>
							<h1 className='text-2xl md:text-3xl font-bold drop-shadow-md text-white'>
								{formData.firstName} {formData.lastName}
							</h1>
							<p className='text-white/90 font-medium text-sm md:text-base'>
								{formData.role}
							</p>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
				{/* Personal Details Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='lg:col-span-2'
				>
					<div className='bg-[var(--card)] rounded-2xl shadow-sm p-8 border border-[var(--border)] relative overflow-hidden group'>
						{/* Decorative Background Element */}
						<div className='absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-[var(--primary)]/10'></div>

						<div className='flex items-center justify-between mb-8 relative z-10'>
							<h3 className='text-xl font-bold text-[var(--text-dark)] flex items-center gap-2'>
								<span className='w-1 h-8 bg-[var(--primary)] rounded-full'></span>
								Personal Information
							</h3>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10'>
							<div className='space-y-2'>
								<label className='text-sm font-semibold text-[var(--text-gray)]'>
									First Name
								</label>
								<div className='relative'>
									<div className='absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]'>
										<FontAwesomeIcon icon={faUser} />
									</div>
									<input
										type='text'
										name='firstName'
										value={formData.firstName}
										onChange={handleChange}
										className='w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--body-bg)] border-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all outline-none font-medium text-[var(--text-dark)]'
										placeholder='John'
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-semibold text-[var(--text-gray)]'>
									Last Name
								</label>
								<div className='relative'>
									<div className='absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]'>
										<FontAwesomeIcon icon={faUser} />
									</div>
									<input
										type='text'
										name='lastName'
										value={formData.lastName}
										onChange={handleChange}
										className='w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--body-bg)] border-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all outline-none font-medium text-[var(--text-dark)]'
										placeholder='Doe'
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-semibold text-[var(--text-gray)]'>
									Email Address
								</label>
								<div className='relative'>
									<div className='absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]'>
										<FontAwesomeIcon icon={faEnvelope} />
									</div>
									<input
										type='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										className='w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--body-bg)] border-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all outline-none font-medium text-[var(--text-dark)]'
										placeholder='john@example.com'
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-semibold text-[var(--text-gray)]'>
									Phone Number
								</label>
								<div className='relative'>
									<div className='absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]'>
										<FontAwesomeIcon icon={faPhone} />
									</div>
									<input
										type='tel'
										name='phone'
										value={formData.phone}
										onChange={handleChange}
										className='w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--body-bg)] border-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all outline-none font-medium text-[var(--text-dark)]'
										placeholder='+1 234 567 890'
									/>
								</div>
							</div>

							<div className='col-span-1 md:col-span-2 space-y-2'>
								<label className='text-sm font-semibold text-[var(--text-gray)]'>
									Bio
								</label>
								<textarea
									name='bio'
									rows={4}
									value={formData.bio}
									onChange={handleChange}
									className='w-full p-4 rounded-xl bg-[var(--body-bg)] border-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all outline-none font-medium text-[var(--text-dark)] resize-none'
									placeholder='Tell us about yourself...'
								/>
							</div>
						</div>

						<div className='mt-8 flex justify-end'>
							<button 
								onClick={handleSaveChanges}
								disabled={isSaving}
								className='bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
							>
								{isSaving ? (
									<>
										<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
										Saving...
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faFloppyDisk} />
										Save Changes
									</>
								)}
							</button>
						</div>
					</div>
				</motion.div>

				{/* Sidebar / Additional Info */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className='space-y-6'
				>
					<div className='bg-[var(--card)] rounded-2xl shadow-sm p-6 border border-[var(--border)]'>
						<h3 className='text-lg font-bold text-[var(--text-dark)] mb-4'>
							Account Status
						</h3>
						<div className='flex items-center gap-4 mb-6 p-4 bg-[var(--body-bg)] rounded-xl'>
							<div className='w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500'>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
									></path>
								</svg>
							</div>
							<div>
								<div className='font-bold text-[var(--text-dark)]'>
									Active
								</div>
								<div className='text-sm text-[var(--text-gray)]'>
									Your account is fully verified
								</div>
							</div>
						</div>

						<div className='space-y-4'>
							<div className='flex justify-between items-center py-2 border-b border-[var(--border)] last:border-0'>
								<span className='text-[var(--text-gray)]'>
									Member Since
								</span>
								<span className='font-semibold text-[var(--text-dark)]'>
									Jan 2024
								</span>
							</div>
							<div className='flex justify-between items-center py-2 border-b border-[var(--border)] last:border-0'>
								<span className='text-[var(--text-gray)]'>
									Last Login
								</span>
								<span className='font-semibold text-[var(--text-dark)]'>
									2 hours ago
								</span>
							</div>
							<div className='flex justify-between items-center py-2 border-b border-[var(--border)] last:border-0'>
								<span className='text-[var(--text-gray)]'>
									Location
								</span>
								<span className='font-semibold text-[var(--text-dark)]'>
									Cairo, Egypt
								</span>
							</div>
						</div>
					</div>

					<div className='bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl shadow-lg p-6 text-white relative overflow-hidden'>
						<div className='relative z-10'>
							<h3 className='text-xl font-bold mb-2'>
								Upgrade to Pro
							</h3>
							<p className='text-white/80 mb-4'>
								Unlock premium features and get more out of your
								account.
							</p>
							<button className='bg-white text-[var(--primary)] px-6 py-2 rounded-lg font-bold shadow-md hover:bg-opacity-90 transition-all'>
								Upgrade Now
							</button>
						</div>
						<div className='absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl'></div>
					</div>
				</motion.div>
			</div>
		</div>
	</div>
	);
};

export default EditProfile;
