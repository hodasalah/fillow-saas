// PrivateRoute.tsx
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router'; // Import Navigate and Outlet
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { setLoading } from './store/slices/loadingSlice';

interface PrivateRouteProps {
	// children: JSX.Element; // We will use Outlet instead of children
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
	const user = useAppSelector((state) => state.auth.currentUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user) {
			dispatch(setLoading(false));
		}
	}, [user, dispatch]);

	if (!user) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}

	return <Outlet />;
};

export default PrivateRoute;
