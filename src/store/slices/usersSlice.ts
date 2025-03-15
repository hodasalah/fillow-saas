import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, updateUser } from '../../utils/fetchUsers';
import { User } from '../../types';

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
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Unknown error';
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.users = state.users.map((user) =>
					user.id === action.payload.id ? action.payload : user,
				);
				state.currentUser = action.payload;
			});
	},
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
