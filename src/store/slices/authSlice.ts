// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { loginUser, loginWithGoogle, logoutUser } from './authActions';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null as User | null,
		loading: false,
		error: null as unknown,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = {
				...action.payload,
				emailVerified: action.payload.emailVerified ?? false,
				createdAt:
					action.payload.createdAt,
				last_login:
					action.payload.last_login.toMillis(),
				role: 'user',
				projects: [],
				tags: ['google-user'],
				preferences: {
					theme: 'light',
					language: 'en-US',
				},
			} as User;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginWithGoogle.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginWithGoogle.fulfilled, (state, action) => {
				state.loading = false;
				state.user = {
					...action.payload,
				} as unknown as User;
			})
			.addCase(loginWithGoogle.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// حالة تسجيل الدخول
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// حالة تسجيل الخروج
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
