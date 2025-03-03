import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { auth, db } from '../firebase';

const useAuthListener = () => {
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userRef = doc(db, 'users', user.uid);
				const userSnap = await getDoc(userRef);

				if (!userSnap.exists()) {
					await setDoc(userRef, {
						uid: user.uid,
						email: user.email,
						name: user.displayName || 'Anonymous',
						profilePicture: user.photoURL || '',
						createdAt: new Date(),
					});

					console.log('User added to Firestore');
				}
			}
		});

		return () => unsubscribe();
	}, []);
};

export default useAuthListener;
