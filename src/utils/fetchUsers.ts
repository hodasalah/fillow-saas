import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../types';
import { convertTimestamp } from './helpers/convertTimeStamp';

// Async Thunk to Fetch Users from Firestore (for Redux)
export const fetchUsers = createAsyncThunk<
	User[],
	void,
	{ rejectValue: string }
>('users/fetchUsers', async (_, { rejectWithValue }) => {
	try {
		const querySnapshot = await getDocs(collection(db, 'users'));
// ... imports provided at top of file ...

// ... imports

		const users: User[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
			    uid: doc.id,
			    ...data,
                createdAt: convertTimestamp(data.createdAt),
                last_login: convertTimestamp(data.last_login),
                lastSeen: convertTimestamp(data.lastSeen),
		    } as User;
        });
		console.log('Users fetched successfully:', users);
		return users;
} catch (error: any) {
		console.error('Error fetching users:', error);
		return rejectWithValue(error?.message || 'Failed to fetch users');
	}
});
