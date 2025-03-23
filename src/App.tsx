import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Loading from './components/Loading';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import AuthListener from './ِAuthListener';
import { fetchUsers } from './utils/fetchUsers'; // Import fetchUsers

const App = () => {
	console.log('1. App Mounts: App.tsx mounts.'); // Step 1

	const loading = useAppSelector((state) => state.loading.isLoading);
	const user = useAppSelector((state) => state.users.currentUser);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch(); // Get the dispatch function

	useEffect(() => {
		console.log('6. App.tsx useEffect Fires: user changed:', user); // Step 6

		if (
			user &&
			(location.pathname === '/' ||
				location.pathname === '/login' ||
				location.pathname === '/signup')
		) {
			navigate('/dashboard');
		}
	}, [user, navigate, location]);

	useEffect(() => {
		if (user) {
			console.log(
				'7. fetchUsers Dispatched: dispatch(fetchUsers()) is called.',
			); // Step 7

			dispatch(fetchUsers()).unwrap().then(()=>{
				console.log('8. All Users Fetched: fetchUsers fulfilled.'); // Step 8
			}).catch((error)=>{
									console.error(
										'Error fetching users:',
										error,
									);

			})// Dispatch fetchUsers when the user is authenticated
		}
	}, [user, dispatch]);

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
