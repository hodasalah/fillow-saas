import { useEffect } from 'react';
import { auth, db } from './firebase';
import { setUser } from './store/slices/usersSlice';

import { doc, getDoc } from 'firebase/firestore';
import { ReactNode } from 'react';
import { useAppDispatch } from './hooks/hooks';
import { setLoading } from './store/slices/loadingSlice';

const AuthListener = ({ children }: { children: ReactNode }) => {
	const dispatch = useAppDispatch();
	const user = auth.currentUser;

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			dispatch(setLoading(true));
			if (user) {
				const userDoc = await getDoc(doc(db, 'users', user.uid));
				const userData = userDoc.data();
				dispatch(setLoading(false));
				dispatch(
					setUser({
						...userData,
						createdAt: userData?.createdAt.toMillis(),
					}),
				);
			} else {
				dispatch(setLoading(false));
				dispatch(setUser(null));
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return children;
};

export default AuthListener;
