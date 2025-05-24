import { User } from 'firebase/auth';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../../firebase';

export interface UserData {
	uid: string;
	email: string;
	displayName: string;
	photoURL?: string;
	status: 'online' | 'offline';
	lastSeen: Date | null;
	createdAt: Date;
}

export const createUserDocument = async (user: User) => {
	if (!user) return;

	const userRef = doc(db, 'users', user.uid);
	const userSnap = await getDoc(userRef);

	if (!userSnap.exists()) {
		const userData: UserData = {
			uid: user.uid,
			email: user.email || '',
			displayName: user.displayName || 'Anonymous',
			photoURL: user.photoURL || undefined,
			status: 'online',
			lastSeen: null,
			createdAt: new Date(),
		};

		try {
			await setDoc(userRef, userData);
			return userData;
		} catch (error) {
			console.error('Error creating user document:', error);
			throw error;
		}
	}

	return userSnap.data() as UserData;
};

export const updateUserStatus = async (uid: string, isOnline: boolean) => {
	const userRef = doc(db, 'users', uid);
	try {
		await updateDoc(userRef, {
			status: isOnline ? 'online' : 'offline',
			lastSeen: isOnline ? null : serverTimestamp(),
		});
	} catch (error) {
		console.error('Error updating user status:', error);
		throw error;
	}
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
	try {
		const userDoc = await getDoc(doc(db, 'users', userId));
		if (userDoc.exists()) {
			return { uid: userDoc.id, ...userDoc.data() } as UserData;
		}
		return null;
	} catch (error) {
		console.error('Error fetching user data:', error);
		return null;
	}
};

export const subscribeToUserStatus = (
	uid: string,
	callback: (status: 'online' | 'offline') => void,
) => {
	const userRef = doc(db, 'users', uid);
	return onSnapshot(userRef, (doc) => {
		if (doc.exists()) {
			const userData = doc.data() as UserData;
			callback(userData.status);
		}
	});
};

export const getOnlineUsers = async () => {
	const usersRef = collection(db, 'users');
	const q = query(usersRef, where('status', '==', 'online'));
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map((doc) => doc.data() as UserData);
};

export const getAllUsers = async (): Promise<UserData[]> => {
	try {
		const usersSnapshot = await getDocs(collection(db, 'users'));
		return usersSnapshot.docs.map(
			(doc) =>
				({
					uid: doc.id,
					...doc.data(),
				} as UserData),
		);
	} catch (error) {
		console.error('Error fetching all users:', error);
		return [];
	}
};
