import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes/index.tsx';
import { store } from './store/store.ts';
import './utils/seedProfile'; // Enable window.seedMyProfile()

// Make store available globally for utilities
// @ts-ignore
window.__REDUX_STORE__ = store;

// Expose seeding utilities in development mode
if (import.meta.env.DEV) {
	(window as any).clearAllData = clearAllData;
	(window as any).seedAllData = seedAllData;
	console.log('🛠️  Dev utilities available:');
	console.log('   window.clearAllData() - Clear all Firebase data');
	console.log('   window.seedAllData() - Seed database with Faker data');
	console.log('   window.seedMyProfile() - Seed current user profile');
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
