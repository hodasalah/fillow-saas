import { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

// Create a memoized selector
const selectAuthState = (state: any) => ({
	currentUser: state.auth.currentUser,
	isLoading: state.loading.isLoading,
});

const PrivateRoute = memo(() => {
	const { currentUser, isLoading } = useAppSelector(selectAuthState);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='w-8 h-8 border-4 border-purple-600 rounded-full animate-spin border-t-transparent'></div>
			</div>
		);
	}

	if (!currentUser) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}

	return <Outlet />;
});

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;
