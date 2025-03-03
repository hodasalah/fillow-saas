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
		// يمكنك إضافة reducers إضافية هنا إذا لزم الأمر
		setUser: (state, action) => {
			state.user = action.payload;
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
					isAnonymous: false,
					metadata: {},
					providerData: [],
					phoneNumber: null,
					refreshToken: '',
					tenantId: null,
				} as unknown as User; // ✅ Storing only serializable user data
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
