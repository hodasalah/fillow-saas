import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { useAppDispatch } from '../../hooks/hooks';
import { createUserDocument, getUserData } from '../../services/firebase/users';
import { setUser } from '../../store/slices/authSlice';
import { setLoading } from '../../store/slices/loadingSlice';
import { makeSerializable } from '../../utils/dateUtils';

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
                let userData = await getUserData(user.uid);

                if (!userData) {
                    // Create if doesn't exist (e.g. first login)
                    const result = await createUserDocument(user);
                    userData = result || null;
                }

                const userPayload = {
                    uid: user.uid,
                    email: user.email,
                    name: userData?.displayName || user.displayName || 'User',
                    profilePicture: userData?.photoURL || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=886cc0&color=fff`,
                    bio: userData?.bio,
                    title: userData?.title,
                    phone: userData?.phone,
                    role: 'user', // Default or from userData if you added role to UserData interface
                    ...userData, // Spread all userData properties (including projects)
                    createdAt: userData?.createdAt || Date.now(),
                    lastSeen: userData?.lastSeen || null,
                    last_login: Date.now()
                };

                // Apply makeSerializable to the entire payload to convert all Timestamps
                dispatch(setUser(makeSerializable(userPayload)));
            } else {
                dispatch(setUser(null));
                // Removed anonymous login to ensure users stay logged out
            }
            dispatch(setLoading(false));
        });

        return () => unsubscribe();
    }, [ dispatch ]);

    return <>{children}</>;
};

export default AuthListener;
