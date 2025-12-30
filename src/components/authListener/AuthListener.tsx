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
		// Initial loading is set to true in slice
        
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
						name: user.displayName || 'User',
						profilePicture: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=886cc0&color=fff`,
					}),
				);
                // fetchUsers called by individual pages that need it
			} else {
				dispatch(setUser(null));
                // Removed anonymous login to ensure users stay logged out
			}
			dispatch(setLoading(false));
		});

		return () => unsubscribe();
	}, [dispatch]);

	return <>{children}</>;
};

export default AuthListener;
