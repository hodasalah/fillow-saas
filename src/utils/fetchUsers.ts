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
>('users/fetchUsers', async (_) => {
	try {
        // 1. Try Firestore
		const querySnapshot = await getDocs(collection(db, 'users'));
		const users: User[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
			    uid: doc.id,
			    ...data,
                name: data.displayName || data.name || 'Unknown',
                profilePicture: data.photoURL || data.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.displayName || 'User')}&background=886cc0&color=fff`,
                createdAt: convertTimestamp(data.createdAt),
                last_login: convertTimestamp(data.last_login),
                lastSeen: convertTimestamp(data.lastSeen),
		    } as User;
        });

        if (users.length > 0) {
		    console.log('Users fetched successfully from Firestore:', users.length);
            return users;
        }
        
        console.log('Firebase returned 0 users.');
        return [];

	} catch (error: any) {
		console.warn('Error fetching users:', error);
        return [];
	}
});
