// PrivateRoute.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { setLoading } from './store/slices/loadingSlice';

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.auth.currentUser);
	const location = useLocation();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (user) {
			dispatch(setLoading(false));
		}
	}, [user]);

	return <>{children}</>;
};

export default PrivateRoute;
