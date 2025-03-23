import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../types';

// Async Thunk to Fetch Users from Firestore (for Redux)
export const fetchUsers = createAsyncThunk<
	User[],
	void,
	{ rejectValue: string }
>('users/fetchUsers', async (_, { rejectWithValue }) => {
	try {
		const querySnapshot = await getDocs(collection(db, 'users'));
		const users: User[] = querySnapshot.docs.map((doc) => {
			const userData = doc.data();
			return {
				...userData,
				uid: doc.id,
			} as User;
		});
		return users;
	} catch (error: any) {
		console.error('Error fetching users:', error);
		return rejectWithValue(error.message || 'Failed to fetch users');
	}
});
