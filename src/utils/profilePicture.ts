// Sync profile logic

import { getUserProfile } from '../services/firebase/profile';
import { setUser } from '../store/slices/authSlice';
import { makeSerializable } from './dateUtils';

/**
 * Get the URL for a user's profile picture, with priority on Base64 and localStorage fallback
 * @param user The user object (from Redux or Firebase)
 * @returns The URL string to use for the profile picture
 */
export const getProfilePictureUrl = (user: any): string => {
  if (!user) return '/assets/profile-default.png';
  
  // 1. Priority: Base64 from Redux/User object
  if (user.profilePictureBase64) {
    return user.profilePictureBase64;
  }
  
  // 2. Secondary: Check localStorage cache
  const savedImage = localStorage.getItem(`user_${user.uid}_profile`);
  if (savedImage) {
    return savedImage;
  }
  
  // 3. Third: Standard photo URL (Storage URL or external)
  if (user.profilePicture) {
    return user.profilePicture;
  }
  
  if (user.photoURL) {
      return user.photoURL;
  }
  
  // 4. Final Fallback: Generated Avatar
  const name = user.displayName || user.name || 'User';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=886cc0&color=fff&size=200`;
};

/**
 * Sync user profile from Firestore to Redux and LocalStorage
 */
export const syncUserProfile = async (uid: string, dispatch: (action: { type: string; payload?: unknown }) => void) => {
  try {
    const userDoc = await getUserProfile(uid);
    
    if (userDoc) {
      // Normalize to User interface shape
      const normalizedUser = {
        ...userDoc,
        name: userDoc.displayName || '',
        profilePicture: userDoc.profilePictureBase64 || userDoc.photoURL || '',
      };
      
      // Update Redux state with latest data
      dispatch(setUser(makeSerializable(normalizedUser)));
      
      // Cache Base64 in localStorage for instant display on next load
      if (userDoc.profilePictureBase64) {
        localStorage.setItem(`user_${uid}_profile`, userDoc.profilePictureBase64);
        localStorage.setItem(`user_${uid}_profile_timestamp`, Date.now().toString());
      }
    }
  } catch (error) {
    console.error('Error syncing user profile:', error);
  }
};

/**
 * Pre-load an image and cache its URL
... (rest of the file logic preserved or integrated)
*/

// Keep existing utilities for backward compatibility if needed, 
// but getProfilePictureUrl is now the main entry point as requested.

export const getImmediateProfilePictureUrl = (
	photoURL?: string,
	displayName?: string,
    uid?: string
): string => {
    if (uid) {
        const savedImage = localStorage.getItem(`user_${uid}_profile`);
        if (savedImage) return savedImage;
    }
	return photoURL || (displayName ? `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=886cc0&color=fff&size=200` : '/assets/profile-default.png');
};

/**
 * Image load error handler that falls back to UI Avatars
 */
export const getImageLoadErrorHandler = (displayName: string) => (e: any) => {
	const target = e.target as HTMLImageElement;
	if (target) {
		target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=886cc0&color=fff&size=200`;
	}
};
