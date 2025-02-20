// PrivateRoute.tsx
import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { Navigate } from 'react-router';
import { auth } from './firebase';

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	// This example uses a simple hook to get the current user.
	// In a real app you might use a context or Redux to store auth state.
	const [user, setUser] = React.useState<any>(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return unsubscribe;
	}, []);
console.log(user)
	if (loading) return <p>Loading...</p>;
	return user ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
