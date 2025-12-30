import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes/index.tsx';
import { store } from './store/store.ts';
// Make store available globally for utilities
// @ts-ignore
window.__REDUX_STORE__ = store;

// Expose seeding utilities in development mode
if (import.meta.env.DEV) {
	console.log('🛠️  Development mode active');
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
