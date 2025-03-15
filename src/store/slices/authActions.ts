// authActions.js أو يمكنك تضمينها داخل authSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

//signup with google auth
export const loginWithGoogle = createAsyncThunk(
	'auth/loginWithGoogle',
	async (_, { rejectWithValue }) => {
		try {
			const provider = new GoogleAuthProvider();
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential.user;
			if (user) {
				// Reference to the user's document in Firestore
				const userRef = doc(db, 'users', user.uid);
				const userSnap = await getDoc(userRef);

				if (!userSnap.exists()) {
					// Create new user document if doesn't exist
					await setDoc(
						userRef,
						{
							userId: user.uid,
							email: user.email,
							name: user.displayName,
							profilePicture: user.photoURL,
							createdAt: serverTimestamp(),
							last_login: serverTimestamp(),
							role: 'user',
							projects: [],
							tags: ['google-user'],
							preferences: {
								theme: 'light',
								language: 'en-US',
							},
							taskProgress: 25,
						},
						{ merge: true },
					);
				}
				const userData = (await getDoc(userRef)).data();
				if (userData) {
					return {
						...userData,
						createdAt: userData.createdAt.toMillis(),
						last_login: userData.last_login.toMillis(),
					};
				} else {
					throw new Error('User data is undefined');
				}
			}
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

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
				userId: user.uid,
				email: user.email,
				name: user.displayName,
				profilePicture: user.photoURL,
				createdAt: serverTimestamp(),
				last_login: serverTimestamp(),
				role: 'user',
				projects: [],
				tags: ['google-user'],
				preferences: {
					theme: 'light',
					language: 'en-US',
				},
				taskProgress: 25,
			});
			const userDoc = await getDoc(doc(db, 'users', user.uid));
			const userData = userDoc.data();
			return {
				...user,
				createdAt: userData?.createdAt.toMillis(),
				last_login: userData?.last_login.toMillis(),
			};
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
					userId: user.uid,
					email: user.email,
					name: user.displayName,
					profilePicture: user.photoURL,
					createdAt: serverTimestamp(),
					last_login: serverTimestamp(),
					role: 'user',
					projects: [],
					tags: ['google-user'],
					preferences: {
						theme: 'light',
						language: 'en-US',
					},
					taskProgress:25,
				});
			}
			const userData = userSnap.data();
			if (userData) {
				return {
					...userData,
					createdAt: userData.createdAt.toMillis(),
					last_login: userData.last_login.toMillis(),
				};
			} else {
				throw new Error('User data is undefined');
			}
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
			await auth.signOut();
			return true;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);
