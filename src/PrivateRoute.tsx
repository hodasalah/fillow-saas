// PrivateRoute.tsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { auth } from './firebase';
import { useAppDispatch } from './hooks/hooks';
import { setLoading } from './store/slices/loadingSlice';

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const user = auth.currentUser;

	useEffect(() => {
		if (user) {
			dispatch(setLoading(false));
		}
		return () => {
			// Unsubscribe when no longer needed
			auth.onAuthStateChanged(() => {
				dispatch(setLoading(false));
			});
		};
	}, [user]);
	return user ? (
		children
	) : (
		<Navigate
			to='/login'
			replace
		/>
	);
};

export default PrivateRoute;
