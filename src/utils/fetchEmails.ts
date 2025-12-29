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
		console.log('Fetching from Firebase failed (likely rules not deployed), falling back to mock data.');
		try {
            const res = await fetch('/datas/emails.json');
            const data = await res.json();
            return data.emailsData || [];
        } catch (mockError) {
             console.error('Failed to load mock emails:', mockError);
             return [];
        }
	}
};


