// routes.tsx
import { Route, Routes } from 'react-router';
import Layout from '../layout/dashboardLayout';
import DashboardHome from '../layout/dashboardLayout/pages/home';
import Projects from '../layout/dashboardLayout/pages/projects';
import PrivateRoute from '../PrivateRoute';
import Home from './Home';
import Login from './Login';
import Signup from './SignUp';

const AppRoutes = () => {
	return (
		<Routes>
			{/* Public routes */}
			<Route
				index
				element={<Home />}
			/>
			<Route
				path='about'
				element={<div>About</div>}
			/>
			<Route
				path='login'
				element={<Login />}
			/>
			<Route
				path='signup'
				element={<Signup />}
			/>
			{/* Protected routes */}
			<Route
				path='dashboard'
				element={
					<PrivateRoute>
						<Layout />
					</PrivateRoute>
				}
			>
				<Route
					index
					element={<DashboardHome />}
				/>
				<Route
					path='projects'
					element={<Projects />}
				/>
				<Route
					path='profile'
					element={
						<div className='h-screen w-full flex items-center pl-[10rem] justify-center'>
							Profile
						</div>
					}
				/>
				<Route
					path='settings'
					element={
						<div className='h-screen w-full flex items-center pl-[10rem] justify-center'>
							Settings is here
						</div>
					}
				/>
				<Route
					path='*'
					element={
						<div className='h-screen w-full flex items-center pl-[10rem] justify-center'>
							Dashboard Page not found
						</div>
					}
				/>
			</Route>
			{/* Catch-all route for public pages */}
			<Route
				path='*'
				element={
					<div className='h-screen w-full flex items-center pl-[10rem] justify-center'>
						Public Page not found
					</div>
				}
			/>
		</Routes>
	);
};

export default AppRoutes;
