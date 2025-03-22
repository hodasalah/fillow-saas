// PrivateRoute.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAppSelector } from './hooks/hooks';

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.users.currentUser);
	const location = useLocation();

	useEffect(() => {
		if (!user) {
			navigate('/login', { state: { from: location } });
		}
	}, [user, navigate, location]);

	return user ? <>{children}</> : null;
};

export default PrivateRoute;
