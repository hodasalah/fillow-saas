import { Route, Routes, useNavigate } from 'react-router';
import Loading from './components/Loading';
import { auth } from './firebase';
import { useAppSelector } from './hooks/hooks';
import Layout from './layout/dashboardLayout';
import DashboardHome from './layout/dashboardLayout/pages/home';
import PrivateRoute from './PrivateRoute';
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/SignUp';
import AuthListener from './ِAuthListener';

const App = () => {
	const loading = useAppSelector((state) => state.loading.isLoading);
	const navigate = useNavigate();
	const user = auth.currentUser;

	return (
		<div className='relative transition-all ease-in-out duration-200'>
			{loading ? (
				<Loading />
			) : (
				<>
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
					</Routes>

					<AuthListener>
						<Routes>
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
									element={
										<PrivateRoute>
											<DashboardHome />
										</PrivateRoute>
									}
								/>
								<Route
									path='profile'
									element={
										<PrivateRoute>
											<div className='h-screen w-full flex items-center pl-[10rem] justify-center'>
												Profile
											</div>
										</PrivateRoute>
									}
								/>
								<Route
									path='settings'
									element={
										<PrivateRoute>
											<div className='h-screen w-full flex items-center pl-[10rem] justify-center'>
												Settings is here
											</div>
										</PrivateRoute>
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
						</Routes>
					</AuthListener>
				</>
			)}
		</div>
	);
};
export default App;
