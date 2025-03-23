import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Loading from './components/Loading';
import { useAppSelector } from './hooks/hooks';
import AuthListener from './ِAuthListener';

const App = () => {
	console.log('1. App Mounts: App.tsx mounts.'); // Step 1

	const loading = useAppSelector((state) => state.loading.isLoading);
	const user = useAppSelector((state) => state.users.currentUser);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (
			user &&
			(location.pathname === '/' ||
				location.pathname === '/login' ||
				location.pathname === '/signup')
		) {
			navigate('/dashboard');
		}
	}, [user, navigate, location]);

	if (!user && loading) {
		return (
			<div className='relative transition-all ease-in-out duration-200'>
				<Loading />
			</div>
		);
	}
	return (
		<div className='relative transition-all ease-in-out duration-200'>
			<AuthListener>
				<Outlet />
			</AuthListener>
		</div>
	);
};

export default App;
