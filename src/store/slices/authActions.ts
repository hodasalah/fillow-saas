import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	UserCredential,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { User } from '../../types';

// Helper function to create or update user in Firestore
const createUserInFirestore = async (
	user: any,
	name?: string,
): Promise<User> => {
	const userRef = doc(db, 'users', user.uid);
	const userSnap = await getDoc(userRef);

	const userDataToSet = {
		uid: user.uid,
		email: user.email,
		name: name || user.displayName || user.email, // Use provided name, then displayName, then email as fallback
		profilePicture: user.photoURL || '', // Default to empty string if no photoURL
		createdAt: serverTimestamp(),
		last_login: serverTimestamp(),
		role: 'user',
		projects: [],
		tags: user.providerData?.some(
			(provider: any) => provider.providerId === 'google.com',
		)
			? ['google-user']
			: [],
		preferences: {
			theme: 'light',
			language: 'en-US',
		},
		taskProgress: 25,
	};

	if (!userSnap.exists()) {
		await setDoc(userRef, userDataToSet, { merge: true });
	} else {
		await setDoc(
			userRef,
			{
				last_login: serverTimestamp(),
			},
			{ merge: true },
		);
	}

	const userData = (await getDoc(userRef)).data();
	if (userData) {
		return {
			...userData,
			uid: user.uid,
			createdAt: userData.createdAt.toMillis(),
			last_login: userData.last_login.toMillis(),
		} as User;
	} else {
		throw new Error('User data is undefined');
	}
};

// Signup with Google
export const loginWithGoogle = createAsyncThunk<
	User,
	void,
	{ rejectValue: string }
>('auth/loginWithGoogle', async (_, { rejectWithValue }) => {
	try {
		const provider = new GoogleAuthProvider();
		const userCredential: UserCredential = await signInWithPopup(
			auth,
			provider,
		);
		const user = userCredential.user;
		return await createUserInFirestore(user);
	} catch (error) {
		return rejectWithValue((error as Error).message);
	}
});

// Create user with email and password
export const createUser = createAsyncThunk<
	User,
	{ email: string; password: string; name: string },
	{ rejectValue: string }
>('auth/createUser', async (payload, { rejectWithValue }) => {
	try {
		const { email, password, name } = payload;
		const userCredential: UserCredential =
			await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		// Update the user's display name
		await user.updateProfile({ displayName: name });
		return await createUserInFirestore(user, name);
	} catch (error) {
		return rejectWithValue((error as Error).message);
	}
});

// Login user with email and password
export const loginUser = createAsyncThunk<
	User,
	{ email: string; password: string },
	{ rejectValue: string }
>('auth/loginUser', async (payload, { rejectValue }) => {
	try {
		const { email, password } = payload;
		const userCredential: UserCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const user = userCredential.user;
		const userDoc = await getDoc(doc(db, 'users', user.uid));
		if (userDoc.exists()) {
			return await createUserInFirestore(user);
		} else {
			throw new Error('This email is not registered. Please sign up.');
		}
	} catch (error) {
		return rejectWithValue((error as Error).message);
	}
});

// Logout user
export const logoutUser = createAsyncThunk<
	boolean,
	void,
	{ rejectValue: string }
>('auth/logoutUser', async (_, { rejectValue }) => {
	try {
		await auth.signOut();
		return true;
	} catch (error) {
		return rejectWithValue((error as Error).message);
	}
});
