import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { useAppDispatch } from '../../hooks/hooks';
import { setUser } from '../../store/slices/authSlice';
import { setLoading } from '../../store/slices/loadingSlice';

interface AuthListenerProps {
	children: React.ReactNode;
}

const AuthListener = ({ children }: AuthListenerProps) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setLoading(true));
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(
					setUser({
						uid: user.uid,
						email: user.email,
						displayName: user.displayName,
						photoURL: user.photoURL,
					}),
				);
			} else {
				dispatch(setUser(null));
			}
			dispatch(setLoading(false));
		});

		return () => unsubscribe();
	}, [dispatch]);

	return <>{children}</>;
};

export default AuthListener;
