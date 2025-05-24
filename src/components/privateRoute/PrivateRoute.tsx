import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

const PrivateRoute = () => {
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	const isLoading = useAppSelector((state) => state.loading.isLoading);

	// If still loading, don't redirect yet
	if (isLoading) {
		return null; // or a loading spinner component
	}

	// If not authenticated, redirect to login
	if (!currentUser) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}

	// If authenticated, render child routes
	return <Outlet />;
};

export default PrivateRoute;
