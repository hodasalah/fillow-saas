import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
	name: 'loading',
	initialState: {
		isLoading: true,
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export const { setLoading, setAuthLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
