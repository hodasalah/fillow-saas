import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export interface Story {
    id: string;
    imageUrl: string;
    title?: string;
}

export const fetchStories = async (): Promise<string[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'stories'));
        const stories = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return data.imageUrl || '';
        }).filter(url => url !== '');
        
        if (stories.length === 0) {
             console.warn('No stories found in DB, falling back to mock');
             // Fallback to match existing hardcoded
             return [
                'https://source.unsplash.com/random/800x600?nature1',
                'https://source.unsplash.com/random/800x600?nature2',
                'https://source.unsplash.com/random/800x600?nature3',
                'https://source.unsplash.com/random/800x600?nature4',
                'https://source.unsplash.com/random/800x600?nature5',
                'https://source.unsplash.com/random/800x600?nature6',
             ];
        }
        return stories;
    } catch (error) {
        console.warn('Error fetching stories:', error);
        return [
            'https://source.unsplash.com/random/800x600?nature1',
            'https://source.unsplash.com/random/800x600?nature2',
            'https://source.unsplash.com/random/800x600?nature3',
            'https://source.unsplash.com/random/800x600?nature4',
            'https://source.unsplash.com/random/800x600?nature5',
            'https://source.unsplash.com/random/800x600?nature6',
        ];
    }
};
