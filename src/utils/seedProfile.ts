import { seedUserProfile } from '../services/firebase/profile';

/**
 * Manual function to seed/update current user's profile with fake data
 * Call this from browser console: window.seedMyProfile()
 */
export const seedCurrentUserProfile = async () => {
  try {
    // @ts-ignore - accessing from window
    const store = window.__REDUX_STORE__;
    if (!store) {
      console.error('Redux store not found');
      return;
    }

    const state = store.getState();
    const currentUser = state.auth.currentUser;

    if (!currentUser) {
      console.error('No user is currently logged in');
      return;
    }

    console.log('🌱 Seeding profile for user:', currentUser.name);
    
    await seedUserProfile(
      currentUser.uid,
      currentUser.name || 'User',
      currentUser.email || '',
      currentUser.profilePicture || undefined
    );

    console.log('✅ Profile seeded successfully! Refresh the page to see changes.');
    return true;
  } catch (error) {
    console.error('❌ Error seeding profile:', error);
    return false;
  }
};

// Make it available globally
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.seedMyProfile = seedCurrentUserProfile;
  console.log('💡 Run window.seedMyProfile() to create/update your profile with fake data');
}
