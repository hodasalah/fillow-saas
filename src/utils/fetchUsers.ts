import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Async Thunk to Fetch Users from Firestore
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const querySnapshot = await getDocs(collection(db, 'users'));
	return querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
});

// Async Thunk to Update a User in Firestore
export const updateUser = createAsyncThunk(
	'users/updateUser',
	async ({ id, data }) => {
		const userRef = doc(db, 'users', id);
		await updateDoc(userRef, data);
		return { id, ...data };
	},
);
