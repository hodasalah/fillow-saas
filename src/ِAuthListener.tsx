import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { useEffect } from 'react';
import { auth, db } from './firebase';
import { useAppDispatch } from './hooks/hooks';
import AppRoutes from './routes';
import { setLoading } from './store/slices/loadingSlice';
import { setUser } from './store/slices/usersSlice';
import { User } from './types';

const AuthListener = () => {
	console.log('2. AuthListener: AuthListener starts listening.'); // Step 2

	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			console.log(
				'4. AuthListener: onAuthStateChanged callback fires.',
				user,
			); // Step 4
			dispatch(setLoading(true));
			console.log('AuthListener: setLoading(true) dispatched');
			try {
				if (user) {
					console.log('AuthListener: user is logged in', user);
					const userDocRef = doc(db, 'users', user.uid);
					console.log('AuthListener: userDocRef created', userDocRef);
					const userDoc = await getDoc(userDocRef);
					console.log('AuthListener: userDoc fetched', userDoc);

					if (userDoc.exists()) {
						console.log('5. AuthListener: userDoc exists');
						// Convert Timestamp to Date BEFORE dispatching
						const userData = userDoc.data() as User;
						const last_login =
							userData.last_login instanceof Timestamp
								? userData.last_login.toDate()
								: userData.last_login;
						const createdAt =
							userData.createdAt instanceof Timestamp
								? userData.createdAt.toDate()
								: userData.createdAt;
						const lastSeen =
							userData.lastSeen instanceof Timestamp
								? userData.lastSeen.toDate()
								: userData.lastSeen;

						const convertedUserData: User = {
							...userData,
							last_login: last_login,
							createdAt: createdAt,
							lastSeen: lastSeen,
						};

						console.log(
							'AuthListener: userData',
							convertedUserData,
						);
						dispatch(setUser(convertedUserData));
						console.log('AuthListener: setUser dispatched');
					} else {
						console.log('AuthListener: userDoc does not exist');
						dispatch(setUser(null));
						console.log('AuthListener: setUser(null) dispatched');
					}
				} else {
					console.log('AuthListener: user is logged out');
					dispatch(setUser(null));
					console.log('AuthListener: setUser(null) dispatched');
				}
			} catch (err: any) {
				console.error('AuthListener: Error fetching user data:', err);
			} finally {
				dispatch(setLoading(false));
				console.log('AuthListener: setLoading(false) dispatched');
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return (
		<>
			<AppRoutes />
		</>
	);
};

export default AuthListener;
