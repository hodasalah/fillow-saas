// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBqb7qzprO3JoeFmaZpBy_CmRfXv_4Df5A',
	authDomain: 'fillow-73cc0.firebaseapp.com',
	projectId: 'fillow-73cc0',
	storageBucket: 'fillow-73cc0.firebasestorage.app',
	messagingSenderId: '863043103885',
	appId: '1:863043103885:web:af46408e94b858a81186c4',
	measurementId: 'G-XW7DW6JG41',
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics only if supported and not in development
const initAnalytics = async () => {
	// Skip analytics in development
	if (import.meta.env.DEV) {
		return null;
	}

	try {
		const isAnalyticsSupported = await isSupported();
		if (isAnalyticsSupported) {
			return getAnalytics(app);
		}
		return null;
	} catch (error) {
		console.warn('Firebase Analytics initialization failed:', error);
		return null;
	}
};

// Initialize analytics
initAnalytics();

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Export app for use in other parts of the application
export default app;
