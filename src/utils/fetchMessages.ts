import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Message } from '../types/dashboard'; // Utilizing shared type definition instead of component local type if possible, or correcting path

export const fetchMessages = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'messages'));
        const messagesData: Message[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const toDate = (val: any) => (val?.toDate ? val.toDate() : new Date(val));
            return {
                id: doc.id,
                ...data,
                timestamp: toDate(data.timestamp),
            } as Message;
        });
        return messagesData;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};
