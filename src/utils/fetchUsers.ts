import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../types';

// Async Thunk to Fetch Users from Firestore
export const fetchUsers = createAsyncThunk<
	User[],
	void,
	{ rejectValue: string }
>('users/fetchUsers', async (_, { rejectWithValue }) => {
	try {
		const querySnapshot = await getDocs(collection(db, 'users'));
		const users: User[] = querySnapshot.docs.map(
			(doc) =>
				({
					...doc.data(),
					uid: doc.id,
				} as User),
		);
		return users;
	} catch (error: any) {
		console.error('Error fetching users:', error);
		return rejectWithValue(error.message || 'Failed to fetch users');
	}
});

// Async Thunk to Update a User in Firestore
export const updateUser = createAsyncThunk<
	User,
	{ uid: string; data: Partial<User> },
	{ rejectValue: string }
>('users/updateUser', async ({ uid, data }, { rejectWithValue }) => {
	try {
		const userRef = doc(db, 'users', uid);
		await updateDoc(userRef, data);

		// Fetch the updated user data to ensure consistency
		const updatedUserDoc = await getDoc(userRef);
		if (updatedUserDoc.exists()) {
			return { ...updatedUserDoc.data(), uid: updatedUserDoc.id } as User;
		} else {
			return rejectWithValue('User not found after update');
		}
	} catch (error: any) {
		console.error('Error updating user:', error);
		return rejectWithValue(error.message || 'Failed to update user');
	}
});
