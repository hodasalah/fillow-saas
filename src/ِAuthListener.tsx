import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { auth, db } from './firebase';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { authError, setUser } from './store/slices/authSlice';
import { setAuthLoading, setLoading } from './store/slices/loadingSlice';
import { User } from './types';
import { convertTimestamp } from './utils/helpers/convertTimeStamp';
import { useNavigate } from 'react-router';

const AuthListener = () => {
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	const loading = useAppSelector((state) => state.loading.auth);
	const dispatch = useAppDispatch();
	const isMounted = useRef(true);
const navigate= useNavigate()
	useEffect(() => {
		dispatch(setLoading(true));

		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			try {
				if (user) {
					const userDocRef = doc(db, 'users', user.uid);
					const userDoc = await getDoc(userDocRef);

					if (!userDoc.exists()) {
						dispatch(authError('User document not found'));
						await auth.signOut();
						dispatch(setLoading(false));
					navigate("/login")
						return;
					}

					const userData = userDoc.data() as User;
					dispatch(
						setUser({
							...userData,
							last_login: userData.last_login
								? convertTimestamp(userData.last_login)
								: null,
							createdAt: userData.createdAt
								? convertTimestamp(userData.createdAt)
								: null,
							lastSeen: userData.lastSeen
								? convertTimestamp(userData.lastSeen)
								: null,
						}),
					);
					dispatch(setLoading(false));
				} else {
					dispatch(setUser(null));
					dispatch(setLoading(false));
				}
			} catch (err) {
				if (isMounted.current) {
					dispatch(
						authError(
							err instanceof Error ? err.message : 'Auth error',
						),
					);
					dispatch(setUser(null));
					dispatch(setLoading(false));
				}
			}
		});

		return () => {
			isMounted.current = false;
			unsubscribe();
		};
	}, [dispatch]);

	

	return null;
};

export default AuthListener;
