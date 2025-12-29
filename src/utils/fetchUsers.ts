import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User } from '../types';
import { convertTimestamp } from './helpers/convertTimeStamp';

// Async Thunk to Fetch Users from Firestore (for Redux)
export const fetchUsers = createAsyncThunk<
	User[],
	void,
	{ rejectValue: string }
>('users/fetchUsers', async (_, { rejectWithValue }) => {
	try {
        // 1. Try Firestore
		const querySnapshot = await getDocs(collection(db, 'users'));
		const users: User[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
			    uid: doc.id,
			    ...data,
                name: data.displayName || data.name || 'Unknown',
                createdAt: convertTimestamp(data.createdAt),
                last_login: convertTimestamp(data.last_login),
                lastSeen: convertTimestamp(data.lastSeen),
		    } as User;
        });

        if (users.length > 0) {
		    console.log('Users fetched successfully from Firestore:', users.length);
            return users;
        }
        
        console.log('Firebase returned 0 users. Checking cache or fetching from API...');
        throw new Error('No users in database');

	} catch (error: any) {
		console.warn('Error fetching users (or empty), checking fallback:', error);
        
        // 2. Check LocalStorage Cache
        const cached = localStorage.getItem('cached_users');
        if (cached) {
            console.log('Restoring users from LocalStorage cache.');
            try {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && parsed.length > 0) {
                     // Ensure current user is in there? 
                     // Usually cached includes it.
                     return parsed;
                }
            } catch (e) {
                console.warn("Invalid cache, clearing.");
                localStorage.removeItem('cached_users');
            }
        }

        // 3. Last Resort: External API
        try {
            console.log('Fetching fresh users from RandomUser.me...');
            const response = await fetch('https://randomuser.me/api/?results=10');
            const data = await response.json();
            
            const externalUsers: User[] = data.results.map((u: any, index: number) => {
                let uid = u.login.uuid;
                let role: 'admin' | 'employee' | 'client' = 'client';
                let status = 'offline';

                // Fixed IDs for reliable chat testing
                if (index === 0) {
                    uid = 'user_1'; 
                    role = 'admin';
                    status = 'online';
                } else if (index === 1) {
                    uid = 'user_2'; 
                    role = 'employee';
                    status = 'online';
                }

                return {
                    uid: uid,
                    email: u.email,
                    name: `${u.name.first} ${u.name.last}`,
                    profilePicture: u.picture.medium,
                    role: role,
                    status: status,
                    createdAt: new Date(u.registered.date).toISOString(),
                    last_login: new Date().toISOString(),
                    lastSeen: new Date().toISOString(),
                    projects: [],
                    tags: [],
                    preferences: { theme: 'light', language: 'en' },
                    taskProgress: Math.floor(Math.random() * 100),
                    teams: []
                } as User;
            });

            // Ensure Current User is included
            const currentUser = auth.currentUser;
            const currentUserId = currentUser?.uid || 'local';
            
            if (!externalUsers.find(u => u.uid === currentUserId)) {
                externalUsers.unshift({
                    uid: currentUserId,
                    email: currentUser?.email || 'local@example.com',
                    name: currentUser?.displayName || 'My Profile',
                    profilePicture: currentUser?.photoURL || '',
                    role: 'admin',
                    status: 'online',
                    createdAt: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                    lastSeen: new Date().toISOString(),
                    projects: [],
                    tags: [],
                    preferences: { theme: 'light', language: 'en' },
                    taskProgress: 0,
                    teams: []
                });
            }

            // 4. Persist
            // a. LocalStorage (always works)
            localStorage.setItem('cached_users', JSON.stringify(externalUsers));

            // b. Firestore (if permissions allow)
            try {
                const batch = writeBatch(db);
                externalUsers.forEach(user => {
                     // Convert User back to Firestore friendly object if needed,
                     // mostly converting undefined to null if any.
                     // But JSON cycle safe usually.
                     const { ...userData } = user;
                     const userRef = doc(db, 'users', user.uid);
                     batch.set(userRef, userData, { merge: true });
                });
                await batch.commit();
                console.log("Successfully persisted users to Firestore.");
            } catch (persistError) {
                console.warn("Could not persist users to Firestore (Permission denied?), but saved to LocalStorage.", persistError);
            }

            return externalUsers;

        } catch (apiError) {
             console.error("Everything failed (API + DB + Cache), using static mock:", apiError);
             return [];
        }
	}
});
