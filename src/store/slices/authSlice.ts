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
				createdAt: action.payload.createdAt ?? new Date().getTime(),
				isAnonymous: action.payload.isAnonymous ?? false,
				metadata: action.payload.metadata ?? {},
				providerData: action.payload.providerData ?? [],
				phoneNumber: action.payload.phoneNumber ?? null,
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
					emailVerified: false,
					createdAt: new Date().getTime(),
					isAnonymous: false,
					metadata: {},
					providerData: [],
					phoneNumber: null,
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
