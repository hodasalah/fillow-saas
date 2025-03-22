import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';
import { User } from '../../types';
import { fetchUsers, updateUser } from '../../utils/fetchUsers';

interface UsersState {
	users: User[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	currentUser: User | null;
}

const initialState: UsersState = {
	users: [],
	status: 'idle',
	error: null,
	currentUser: null,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.currentUser = action.payload;
		},
		// You can add more reducers here if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// Ensure that the payload is an array of users
				if (Array.isArray(action.payload)) {
					state.users = action.payload.map((user) => ({
						...user,
						// Convert Timestamps to numbers if needed
						createdAt:
							user.createdAt instanceof Timestamp
								? user.createdAt.toMillis()
								: user.createdAt,
						last_login:
							user.last_login instanceof Timestamp
								? user.last_login.toMillis()
								: user.last_login,
						lastSeen:
							user.lastSeen instanceof Timestamp
								? user.lastSeen.toMillis()
								: user.lastSeen,
						role: user.role ?? 'member',
						projects: user.projects ?? [],
						tags: user.tags ?? ['google-user'],
						preferences: user.preferences ?? {
							theme: 'light',
							language: 'en-US',
						},
						taskProgress: user.taskProgress ?? 25,
						teams: user.teams ?? [],
						status: user.status ?? 'active',
					}));
				} else {
					console.error(
						'fetchUsers.fulfilled: Payload is not an array:',
						action.payload,
					);
					state.error = 'Invalid data format received from server.';
					state.users = [];
					state.status = 'failed';
				}
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload ?? 'Unknown error';
				state.users = [];
			})
			.addCase(updateUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.users = state.users.map((user) =>
					user.uid === action.payload.uid ? action.payload : user,
				);
				if (state.currentUser?.uid === action.payload.uid) {
					state.currentUser = action.payload;
				}
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload ?? 'Unknown error';
			});
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
