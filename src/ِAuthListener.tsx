import { useEffect } from 'react';
import { auth, db } from './firebase';
import { setUser } from './store/slices/usersSlice';
import { doc, getDoc } from 'firebase/firestore';
import { ReactNode } from 'react';
import { useAppDispatch } from './hooks/hooks';
import { setLoading } from './store/slices/loadingSlice';
import { User } from './types';
import AppRoutes from './routes';

 const AuthListener = ({ children }: { children: ReactNode }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			dispatch(setLoading(true));
			try {
				if (user) {
					const userDocRef = doc(db, 'users', user.uid);
					const userDoc = await getDoc(userDocRef);

					if (userDoc.exists()) {
						const userData = userDoc.data();
						const typedUserData = userData as Partial<User>;

						dispatch(
							setUser({
								...typedUserData,
								uid: userDoc.id,
								createdAt:
									typedUserData.createdAt instanceof Date
										? typedUserData.createdAt.getTime()
										: typedUserData.createdAt,
								last_login:
									typedUserData.last_login instanceof Date
										? typedUserData.last_login.getTime()
										: typedUserData.last_login,
							} as User),
						);
					} else {
						console.warn(
							`User document not found for UID: ${user.uid}`,
						);
						dispatch(setUser(null));
					}
				} else {
					dispatch(setUser(null));
				}
			} catch (err: any) {
				console.error('Error in AuthListener:', err);
			} finally {
				dispatch(setLoading(false));
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return <><AppRoutes/></>;
};
export default AuthListener;