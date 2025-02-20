// authActions.js أو يمكنك تضمينها داخل authSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { auth } from '../../firebase';

//signup with google auth
export const loginWithGoogle = createAsyncThunk(
	'auth/loginWithGoogle',
	async (_, { rejectWithValue }) => {
		try {
			const provider = new GoogleAuthProvider();
			const userCredential = await signInWithPopup(auth, provider);
			return userCredential.user;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);




//اجراء انشاء الحساب
export const createUser = createAsyncThunk(
	'auth/createUser',
	async (
		payload: { email: string; password: string },
		{ rejectWithValue },
	) => {
		try {
			const { email, password } = payload;
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			return userCredential.user;
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
			return userCredential.user;
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
			return rejectWithValue((error as any).message);
		}
	},
);
