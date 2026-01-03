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
                sender: data.sender || {
                    name: data.name || 'Unknown',
                    avatar: data.profileImage || '/assets/fallback.png'
                },
                subject: data.subject || data.title || 'No Subject',
                content: data.content || data.body || '',
                timestamp: toDate(data.timestamp),
                isRead: !!data.isRead
            } as Email;
        });
		return emailsData;
	} catch (error) {
		console.log('Fetching from Firebase failed (likely rules not deployed), falling back to mock data.');
		try {
            const res = await fetch('/datas/emails.json');
            const data = await res.json();
            return (data.emailsData || []).map((e: any) => ({
                ...e,
                sender: {
                    name: e.name,
                    avatar: e.profileImage || '/assets/fallback.png'
                },
                // Ensure other required fields are present or mapped
                subject: e.title || 'No Subject',
                content: e.body || '',
                timestamp: new Date(),
                category: 'primary',
                isRead: false
            }));
        } catch (mockError) {
             console.error('Failed to load mock emails:', mockError);
             return [];
        }
	}
};


