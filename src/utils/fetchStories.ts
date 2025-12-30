import { collection, getDocs, query, where } from 'firebase/firestore'; // Added query, where
import { db } from '../firebase';

export interface Story {
    id: string;
    imageUrl: string;
    title?: string;
    authorName?: string;
}

export const fetchStories = async (userId?: string): Promise<Story[]> => { // Added userId optional param
    try {
        let q;
        if (userId) {
            q = query(collection(db, 'stories'), where('userId', '==', userId));
        } else {
            q = collection(db, 'stories');
        }
        
        const querySnapshot = await getDocs(q);
        const stories = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                imageUrl: data.imageUrl || 'https://source.unsplash.com/random/800x600?nature',
                title: data.title || 'Untitled Story',
                authorName: data.authorName || 'Unknown Author'
            };
        });
        
        if (stories.length === 0) {
             console.warn('No stories found in DB, falling back to mock');
             // Fallback to match existing hardcoded but with objects
             return [
                { id: '1', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop', title: 'Mountain View', authorName: 'John Doe' },
                { id: '2', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop', title: 'City Lights', authorName: 'Jane Smith' },
                { id: '3', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop', title: 'Tech Trends', authorName: 'Alex Johnson' },
                { id: '4', imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=600&fit=crop', title: 'Design Daily', authorName: 'Sarah Wilson' },
             ];
        }
        return stories;
    } catch (error) {
        console.warn('Error fetching stories:', error);
        return [];
    }
};
