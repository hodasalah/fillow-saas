import { Route, Routes } from 'react-router';
import PrivateRoute from './PrivateRoute';
import Loading from './components/Loading';
import { useAppSelector } from './hooks/hooks';
import Layout from './layout/dashboardLayout';
import DashboardHome from './layout/dashboardLayout/pages/home';
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/SignUp';

const App = () => {
	const user = useAppSelector((state) => state.auth);
	console.log(user);

	return (
		<div className='relative transition-all ease-in-out duration-200'>
			<Loading />
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
				<Route
					path='*'
					element={<div>Page not found</div>}
				/>
				{/* Protected route */}

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
								Page not found
							</div>
						}
					/>
				</Route>

				{/* Redirect any unknown route */}
				{/* <Route
					path='*'
					element={<Navigate to='/' />}
				/>  */}
			</Routes>
		</div>
	);
};
export default App;
