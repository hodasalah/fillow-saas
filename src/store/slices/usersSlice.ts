import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, updateUser } from '../../utils/fetchusers';

interface User {
	id: string;
	// add other user properties here
}

interface UsersState {
	users: User[];
	loading: boolean;
	error: string | null;
}

const initialState: UsersState = {
	users: [],
	loading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
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
			});
	},
});

export default userSlice.reducer;
