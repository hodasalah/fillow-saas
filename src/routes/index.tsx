import { Route, Routes } from 'react-router'; 
import DashboardLayout from '../layout/dashboardLayout';
import DashboardHome from '../layout/dashboardLayout/pages/home';
import Profile from '../layout/dashboardLayout/pages/profile';
import Projects from '../layout/dashboardLayout/pages/projects';
import Login from '../layout/publicLayout/AuthPages/Login';
import Signup from '../layout/publicLayout/AuthPages/SignUp';
import HomeRedirect from '../layout/publicLayout/HomeRedirect'; 
import NotFound from '../layout/publicLayout/NotFound';
import PrivateRoute from '../PrivateRoute';

const AppRoutes = () => {
	return (
		<Routes>
			{/* Public routes */}
			<Route
				index
				element={<HomeRedirect />} // Use HomeRedirect for the index route
			/>
			<Route
				path='login'
				element={<Login />}
			/>
			<Route
				path='signup'
				element={<Signup />}
			/>

			{/* Protected routes - Wrapped by PrivateRoute */}
			{/* Any route nested inside this Route element will be protected */}
			<Route element={<PrivateRoute />}>
				{/* The dashboard layout and its children are now protected */}
				<Route
					path='dashboard'
					element={<DashboardLayout />}
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
						element={<Profile />}
					/>
				</Route>
			</Route>

			{/* Catch-all route */}
			<Route
				path='*'
				element={<NotFound />}
			/>
		</Routes>
	);
};
export default AppRoutes;
