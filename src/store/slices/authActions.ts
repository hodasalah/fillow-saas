// authActions.js أو يمكنك تضمينها داخل authSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';

//signup with google auth
export const loginWithGoogle = createAsyncThunk(
	'auth/loginWithGoogle',
	async (_, { rejectWithValue }) => {
		try {
			const provider = new GoogleAuthProvider();
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential.user;
			const { uid, displayName, email, photoURL } = user;
			if (user) {
				// Reference to the user's document in Firestore
				const userRef = doc(db, 'users', user.uid);
				const userSnap = await getDoc(userRef);

				if (!userSnap.exists()) {
					// If the user does not exist, create a new document
					await setDoc(userRef, {
						uid: user.uid,
						name: user.displayName,
						email: user.email,
						profilePicture: user.photoURL,
						createdAt:
							serverTimestamp(),
					});
				}
			}

			return { uid, displayName, email, photoURL };
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},);

//اجراء انشاء الحساب
export const createUser = createAsyncThunk(
	'auth/createUser',
	async (
		payload: { email: string; password: string; name: string },
		{ rejectWithValue },
	) => {
		try {
			const { email, password, name } = payload;
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;
			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				name: name,
				email: user.email,
				createdAt: serverTimestamp(),
				profilePicture: user.photoURL || '',
			});
			return user;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

// إجراء تسجيل الدخول
export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (
		payload: { email: string; password: string },
		{ rejectWithValue },
	) => {
		try {
			const { email, password } = payload;
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;

			// Check if user exists in Firestore
			const userRef = doc(db, 'users', user.uid);
			const userSnap = await getDoc(userRef);

			if (!userSnap.exists()) {
				// Add user if not already in Firestore
				await setDoc(userRef, {
					uid: user.uid,
					email: user.email,
					name: user.displayName || 'Anonymous',
					profilePicture: user.photoURL || '',
					createdAt: serverTimestamp(),
				});
			}
			return user;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

// إجراء تسجيل الخروج
export const logoutUser = createAsyncThunk(
	'auth/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			await signOut(auth);
			return true;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);
