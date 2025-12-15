import { createSlice } from '@reduxjs/toolkit';
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
		setUser: (state, action) => {
			if (JSON.stringify(state) !== JSON.stringify(action.payload)) {
				return action.payload;
			}
			return state;
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
					state.users = action.payload; // Data is already normalized by fetchUsers
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
