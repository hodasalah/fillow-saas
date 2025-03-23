import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../types';

export const fetchClients = async (): Promise<User[]> => {
	try {
		const clientsQuery = query(
			collection(db, 'users'),
			where('role', '==', 'client'),
		);
		const querySnapshot = await getDocs(clientsQuery);
		const clientsData: User[] = querySnapshot.docs.map((doc) => ({
			uid: doc.id,
			...doc.data(),
		})) as User[];
		return clientsData;
	} catch (error) {
		console.error('Error fetching clients:', error);
		throw error; // Re-throw the error to be handled by the caller
	}
};

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
