import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ActiveState {
	isActive: boolean;
}

// Define the initial state using that type
const initialState: ActiveState = {
	isActive: false,
};

export const ActiveSidebarSlice = createSlice({
	name: 'activeSidebar',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setToggleActiveSidebar: (state) => {
			state.isActive = !state.isActive;
		},
		setNotActiveSidebar: (state) => {
			state.isActive = false;
		},
		setActiveSidebar: (state) => {
			state.isActive = true;
		},
	},
});

export const { setActiveSidebar, setToggleActiveSidebar, setNotActiveSidebar } =
	ActiveSidebarSlice.actions;

export default ActiveSidebarSlice.reducer;
