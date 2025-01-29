/*import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState: { isOpen: true },
	reducers: {
		toggleSidebar: (state) => {
			state.isOpen = !state.isOpen;
		},
		closeSidebar: (state) => {
			state.isOpen = false;
		},
		openSidebar: (state) => {
			state.isOpen = true;
		},
	},
});

export const { toggleSidebar, closeSidebar, openSidebar } =
	sidebarSlice.actions;
export default sidebarSlice.reducer;*/
// sidebarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
	mode: 'wide' | 'mini';
	isMobileOpen: boolean;
	isMobileView: boolean;
}

const initialState: SidebarState = {
	mode: 'wide',
	isMobileOpen: false,
	isMobileView: false,
};

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		toggleMode: (state) => {
			state.mode = state.mode === 'wide' ? 'mini' : 'wide';
		},
		toggleMobile: (state) => {
			state.isMobileOpen = !state.isMobileOpen;
		},
		closeMobile: (state) => {
			state.isMobileOpen = false;
		},
		setMode: (state, action: PayloadAction<'wide' | 'mini'>) => {
			state.mode = action.payload;
		},
		setMobileView: (state, action: PayloadAction<boolean>) => {
			state.isMobileView = action.payload;
		},
	},
});

export const { toggleMode, toggleMobile, closeMobile, setMode, setMobileView } =
	sidebarSlice.actions;
export default sidebarSlice.reducer;
