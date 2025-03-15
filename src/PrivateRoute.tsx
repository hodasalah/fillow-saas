// PrivateRoute.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { auth } from './firebase';
import { useAppDispatch } from './hooks/hooks';
import { setLoading } from './store/slices/loadingSlice';

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = auth.currentUser;

	useEffect(() => {
		dispatch(setLoading(true));
		if (user) {
			dispatch(setLoading(false));
		} else {
			navigate('/login');
			dispatch(setLoading(false));
		}
	}, [user]);
	return user && children;
};

export default PrivateRoute;
