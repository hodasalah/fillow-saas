import { useEffect } from 'react';
import { auth, db } from './firebase';
import { setUser } from './store/slices/usersSlice';

import { doc, getDoc } from 'firebase/firestore';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from './hooks/hooks';
import { setLoading } from './store/slices/loadingSlice';

const AuthListener = ({ children }: { children: ReactNode }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = auth.currentUser;

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			try {
				if (user) {
					const userDoc = await getDoc(doc(db, 'users', user.uid));
					const userData = userDoc.data();
					dispatch(
						setUser({
							...userData,
							createdAt: userData?.createdAt.toMillis(),
							last_login: userData?.last_login.toMillis(),
						}),
					);
				} else {
					dispatch(setUser(null));
					dispatch(setLoading(false));
				}
			} catch (err: any) {
				console.log(err);
			} finally {
				dispatch(setLoading(false));
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return children;
};

export default AuthListener;
