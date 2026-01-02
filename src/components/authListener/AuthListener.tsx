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
                // Fetch full user data from Firestore to get bio, phone, etc.
                const { getUserData, createUserDocument } = await import('../../services/firebase/users');
                let userData = await getUserData(user.uid);

                if (!userData) {
                    // Create if doesn't exist (e.g. first login)
                    const result = await createUserDocument(user);
                    userData = result || null;
                }

				dispatch(
					setUser({
						uid: user.uid,
						email: user.email,
						name: userData?.displayName || user.displayName || 'User',
						profilePicture: userData?.photoURL || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=886cc0&color=fff`,
                        bio: userData?.bio,
                        title: userData?.title,
                        phone: userData?.phone,
						role: 'user', // Default or from userData if you added role to UserData interface
                        ...userData,
                        // Ensure dates are serializable (convert to millis)
                        createdAt: userData?.createdAt ? 
                            (typeof (userData.createdAt as any).toMillis === 'function' ? (userData.createdAt as any).toMillis() : 
                             userData.createdAt instanceof Date ? userData.createdAt.getTime() : userData.createdAt) 
                            : Date.now(),
                        lastSeen: userData?.lastSeen ? 
                            (typeof (userData.lastSeen as any).toMillis === 'function' ? (userData.lastSeen as any).toMillis() : 
                             userData.lastSeen instanceof Date ? userData.lastSeen.getTime() : userData.lastSeen)
                            : null,
                        last_login: Date.now()
					}),
				);
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
