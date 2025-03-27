import { Route, Routes } from 'react-router';
import DashboardLayout from '../layout/dashboardLayout';
import DashboardHome from '../layout/dashboardLayout/pages/home';
import Profile from '../layout/dashboardLayout/pages/profile';
import Projects from '../layout/dashboardLayout/pages/projects';
import Login from '../layout/publicLayout/AuthPages/Login';
import Signup from '../layout/publicLayout/AuthPages/SignUp';
import Home from '../layout/publicLayout/Home';
import NotFound from '../layout/publicLayout/NotFound';
import PrivateRoute from '../PrivateRoute';

const AppRoutes = () => {
	return (
		<Routes>
			{/* Public routes */}
			<Route
				index
				element={<Home />}
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
						<DashboardLayout />
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
					element={<Profile />}
				/>
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
