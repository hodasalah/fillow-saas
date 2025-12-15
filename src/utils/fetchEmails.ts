import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Email } from '../types/dashboard';

export const fetchEmails = async () => {
	try {
        const querySnapshot = await getDocs(collection(db, 'emails'));
        const emailsData: Email[] = querySnapshot.docs.map((doc) => {
             const data = doc.data();
             const toDate = (val: any) => (val?.toDate ? val.toDate() : new Date(val));
             return {
                id: doc.id,
                ...data,
                timestamp: toDate(data.timestamp),
            } as Email;
        });
		return emailsData;
	} catch (error) {
		console.error('Error fetching emails:', error);
		throw error;
	}
};


