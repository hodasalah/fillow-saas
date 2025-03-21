import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, updateUser } from '../../utils/fetchUsers';
import { User } from '../../types';
import { serverTimestamp } from 'firebase/firestore';

interface UsersState {
	users: User[];
	loading: boolean;
	error: string | null;
	currentUser: User | null;
}

const initialState: UsersState = {
	users: [],
	loading: false,
	error: null,
	currentUser: null,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload;

		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload.map((user: any) => ({
					uid: user.userId,
					email: user.email,
					name: user.displayName,
					profilePicture: user.photoURL,
					createdAt: serverTimestamp(),
					last_login: serverTimestamp(),
					role: 'member',
					projects: [],
					tags: ['google-user'],
					preferences: {
						theme: 'light',
						language: 'en-US',
					},
					taskProgress: 25,
					teams: user.teams ?? [],
					status: user.status ?? 'active',
					lastSeen: user.lastSeen ?? serverTimestamp(),
					// add other properties as needed
				}));			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Unknown error';
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.users = state.users.map((user) =>
					user.uid === action.payload.uid ? action.payload : user,
				);
				state.currentUser = action.payload;
			});
	},
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
