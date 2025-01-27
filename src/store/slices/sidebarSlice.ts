// src/features/sidebar/sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the sidebar (closed by default)
const initialState = {
	isOpen: false,
};

// Create a slice for managing the sidebar state
const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isOpen = !state.isOpen;
		},
		openSidebar: (state) => {
			state.isOpen = true;
		},
		closeSidebar: (state) => {
			state.isOpen = false;
		},
	},
});

// Export the actions to dispatch them in components
export const { toggleSidebar, openSidebar, closeSidebar } =
	sidebarSlice.actions;

// Export the reducer to be used in the store
export default sidebarSlice.reducer;
