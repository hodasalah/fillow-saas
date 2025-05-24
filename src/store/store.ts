import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import loadingReducer from './slices/loadingSlice';
import sidebarReducer from './slices/sidebarSlice';
import themeReducer from './slices/themeSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		chat: chatReducer,
		loading: loadingReducer,
		sidebar: sidebarReducer,
		theme: themeReducer,
		users: usersReducer,

		// Add other reducers here if needed. For example:
		// posts: postsReducer,
		// comments: commentsReducer,
		// users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these paths in the state
				ignoredPaths: ['auth.user', 'chat.messages.timestamp'],
			},
		}),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
