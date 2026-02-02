import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Email } from '../types/dashboard';

// Helper to add timeout to promises
const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number = 5000): Promise<T> => {
	return Promise.race([
		promise,
		new Promise<T>((_, reject) => 
			setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
		)
	]);
};

export const fetchEmails = async () => {
	try {
        const querySnapshot = await withTimeout(getDocs(collection(db, 'emails')), 5000);
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
		
		// Deduplicate emails by ID to prevent React key warnings
		const uniqueEmails = emailsData.filter((email, index, self) => 
			index === self.findIndex((e) => e.id === email.id)
		);
		
		return uniqueEmails;
	} catch (error) {
		console.log('Fetching from Firebase failed (timeout or error), falling back to mock data.');
		try {
            const res = await fetch('/datas/emails.json');
            const data = await res.json();
            const emails = (data.emailsData || []).map((e: any) => ({
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
			
			// Deduplicate mock emails by ID as well
			const uniqueEmails = emails.filter((email: Email, index: number, self: Email[]) => 
				index === self.findIndex((e) => e.id === email.id)
			);
			
			return uniqueEmails;
        } catch (mockError) {
             console.error('Failed to load mock emails:', mockError);
             return [];
        }
	}
};


