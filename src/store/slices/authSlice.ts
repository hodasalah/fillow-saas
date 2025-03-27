import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User as FirebaseUser } from 'firebase/auth';
import {
	createUser,
	loginUser,
	loginWithGoogle,
	logoutUser,
} from './authActions';
import { User } from '../../types';

interface AuthState {
	currentUser: User | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: AuthState = {
	currentUser: null,
	status: 'idle',
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload;
		},
		authError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.status = 'failed';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginWithGoogle.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loginWithGoogle.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.currentUser = action.payload;
			})
			.addCase(loginWithGoogle.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'An error occurred';
			})
			.addCase(createUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.currentUser = action.payload;
			})
			.addCase(createUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'An error occurred';
			})
			.addCase(loginUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.currentUser = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'An error occurred';
			})
			.addCase(logoutUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.status = 'idle';
				state.currentUser = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'An error occurred';
			});
	},
});

export const { setUser, authError } = authSlice.actions;
export default authSlice.reducer;
