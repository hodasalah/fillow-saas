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
        console.warn('Error fetching messages from Firebase, falling back to mock data:', error);
        try {
            const res = await fetch('/datas/messages.json');
            const data = await res.json();
             // Map mock data structure if necessary, or assume it matches Message[]
             // Inspecting messages.json earlier: it has "lastMessage" which maps to "content" in my types
             // I need to map it here
            return (data.messages || []).map((m: any) => ({
                ...m,
                id: 'mock_' + Math.random().toString(36).substr(2, 9),
                content: m.lastMessage,
                timestamp: new Date(m.lastMessageTime || Date.now()),
                isRead: false
            }));
        } catch (mockError) {
             console.error('Failed to load mock messages:', mockError);
             return [];
        }
    }
};
