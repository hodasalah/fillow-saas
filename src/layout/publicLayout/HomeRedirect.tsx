// src/layout/publicLayout/HomeRedirect.tsx
import { Navigate } from 'react-router';
import { useAppSelector } from '../../hooks/hooks';
import Home from './Home';

const HomeRedirect = () => {
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	const isLoading = useAppSelector((state) => state.loading.isLoading);

	// If still loading, don't redirect yet
	if (isLoading) {
		return null; // or a loading spinner component
	}

	if (currentUser) {
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);
	}

	return <Home />;
};

export default HomeRedirect;
