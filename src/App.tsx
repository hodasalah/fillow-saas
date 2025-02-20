import { Route, Routes } from 'react-router';
import Loading from './components/Loading';
import { useAppSelector } from './hooks/hooks';
import Dashboard from './layout/dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import PrivateRoute from './PrivateRoute';

const App = () => {
	const user = useAppSelector((state) => state.auth);
	console.log(user);

	return (
		<div className='relative transition-all ease-in-out duration-200'>
			<Loading />
			<Routes>
				<Route
					path='/'
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				/>
				{/* Public routes */}

				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>

				{/* Protected route */}
				<Route
					index
					path='/dashboard'
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
				{/* Redirect any unknown route */}
				{/* <Route
					path='*'
					element={<Navigate to='/' />}
				/> */}
			</Routes>
			<Dashboard />
		</div>
	);
};
export default App;
