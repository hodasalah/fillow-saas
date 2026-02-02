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
  apiKey: "AIzaSyCxrbMJA2_N4uG64KZ2C39Iu68vm2Huc7M",
  authDomain: "dashora-free.firebaseapp.com",
  projectId: "dashora-free",
  storageBucket: "dashora-free.firebasestorage.app",
  messagingSenderId: "509710943641",
  appId: "1:509710943641:web:b4fc26969823b0f24bff08"
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
