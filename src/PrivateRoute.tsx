// PrivateRoute.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { setLoading } from './store/slices/loadingSlice';

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.users.currentUser);
	const isLoading = useAppSelector((state) => state.loading.isLoading);
	const location = useLocation();

	useEffect(() => {
		if (!user && !isLoading) {
			dispatch(setLoading(true));
			navigate('/login', { state: { from: location } });
		}
		if (user && isLoading) {
			dispatch(setLoading(false));
		}
	}, [user, dispatch, navigate, isLoading, location]);

	return user ? <>{children}</> : null;
};

export default PrivateRoute;
