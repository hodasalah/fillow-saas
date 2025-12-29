import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { useAppDispatch } from '../../hooks/hooks';
import { setUser } from '../../store/slices/authSlice';
import { setLoading } from '../../store/slices/loadingSlice';
import { fetchUsers } from '../../utils/fetchUsers';

interface AuthListenerProps {
	children: React.ReactNode;
}

const AuthListener = ({ children }: AuthListenerProps) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setLoading(true));
        
        if (!auth) {
            console.error("AuthListener: Firebase auth object is missing!");
            dispatch(setLoading(false));
            return;
        }

		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				dispatch(
					setUser({
						uid: user.uid,
						email: user.email,
						displayName: user.displayName,
						photoURL: user.photoURL,
					}),
				);
                dispatch(fetchUsers());
			} else {
				dispatch(setUser(null));
                // Allow explicit logout if needed, but for now we auto-signin for DB access if not logged in
                // Trying to sign in anonymously
                try {
                    const { signInAnonymously } = await import('firebase/auth');
                    await signInAnonymously(auth);
                } catch (error) {
                    console.error("Anonymous auth failed", error);
                }
			}
			dispatch(setLoading(false));
		});

		return () => unsubscribe();
	}, [dispatch]);

	return <>{children}</>;
};

export default AuthListener;
