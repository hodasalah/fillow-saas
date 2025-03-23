import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';
import { User } from '../../types';
import { fetchUsers } from '../../utils/fetchUsers';
import { updateUser } from '../../utils/userUtils';

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
			if (action.payload) {
				const createdAt =
					action.payload.createdAt instanceof Timestamp
						? action.payload.createdAt.toDate()
						: action.payload.createdAt;
				const last_login =
					action.payload.last_login instanceof Timestamp
						? action.payload.last_login.toDate()
						: action.payload.last_login;
				const lastSeen =
					action.payload.lastSeen instanceof Timestamp
						? action.payload.lastSeen.toDate()
						: action.payload.lastSeen;
				state.currentUser = {
					...action.payload,
					createdAt: createdAt,
					last_login: last_login,
					lastSeen: lastSeen,
				};
			} else {
				state.currentUser = null;
			}
			console.log(
				'Redux Store Updated: setUser dispatched',
				action.payload,
			);
		},
		// You can add more reducers here if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				console.log('Redux Store Update: fetchUsers.pending');
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// Ensure that the payload is an array of users
				if (Array.isArray(action.payload)) {
					state.users = action.payload.map((user) => {
						const createdAt =
							user.createdAt instanceof Timestamp
								? user.createdAt.toDate()
								: user.createdAt;
						const last_login =
							user.last_login instanceof Timestamp
								? user.last_login.toDate()
								: user.last_login;
						const lastSeen =
							user.lastSeen instanceof Timestamp
								? user.lastSeen.toDate()
								: user.lastSeen;

						return {
							...user,
							createdAt: createdAt,
							last_login: last_login,
							lastSeen: lastSeen,
							role: user.role ?? 'employee',
							projects: user.projects ?? [],
							tags: user.tags ?? ['google-user'],
							preferences: user.preferences ?? {
								theme: 'light',
								language: 'en-US',
							},
							taskProgress: user.taskProgress ?? 25,
							teams: user.teams ?? [],
							status: user.status ?? 'active',
						};
					});
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
				console.log(
					'Redux Store Update: fetchUsers.rejected',
					action.payload,
				);

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
					const createdAt =
						action.payload.createdAt instanceof Timestamp
							? action.payload.createdAt.toDate()
							: action.payload.createdAt;
					const last_login =
						action.payload.last_login instanceof Timestamp
							? action.payload.last_login.toDate()
							: action.payload.last_login;
					const lastSeen =
						action.payload.lastSeen instanceof Timestamp
							? action.payload.lastSeen.toDate()
							: action.payload.lastSeen;
					state.currentUser = {
						...action.payload,
						createdAt: createdAt,
						last_login: last_login,
						lastSeen: lastSeen,
					};
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
