import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Message } from '../types/dashboard'; // Utilizing shared type definition instead of component local type if possible, or correcting path

// Helper to add timeout to promises
const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number = 5000): Promise<T> => {
	return Promise.race([
		promise,
		new Promise<T>((_, reject) => 
			setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
		)
	]);
};

export const fetchMessages = async () => {
    try {
        const querySnapshot = await withTimeout(getDocs(collection(db, 'messages')), 5000);
        const messagesData: Message[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const toDate = (val: any) => {
                if (!val) return new Date();
                if (val.toDate && typeof val.toDate === 'function') return val.toDate();
                return new Date(val);
            };
            
            return {
                id: doc.id,
                ...data,
                sender: {
                    name: data.sender?.name || data.name || data.displayName || 'Unknown User',
                    avatar: data.sender?.avatar || data.profileImage || data.photoURL || '/assets/fallback.png'
                },
                content: data.content || data.lastMessage || data.text || '',
                timestamp: toDate(data.timestamp || data.createdAt || data.lastMessageTime),
                isRead: !!(data.isRead || data.read)
            } as Message;
        });
        return messagesData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } catch (error) {
        console.log('Fetching from Firebase failed (timeout or error), falling back to mock data.');
        try {
            const res = await fetch('/datas/messages.json');
            const data = await res.json();
             // Map mock data structure if necessary, or assume it matches Message[]
             // Inspecting messages.json earlier: it has "lastMessage" which maps to "content" in my types
             // I need to map it here
            return (data.messages || []).map((m: any) => ({
                id: 'mock_' + Math.random().toString(36).substr(2, 9),
                sender: {
                    name: m.name,
                    avatar: m.profileImage || '/assets/fallback.png'
                },
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
