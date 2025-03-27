import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import './index.css';
import AppRoutes from './routes/index.tsx';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route element={<App />}>
						<Route
							path='/*'
							element={<AppRoutes />}
						/>
					</Route>
				</Routes>
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
