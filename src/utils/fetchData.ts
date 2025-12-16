import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Statistics } from '../types/dashboard';
import { fetchEmails } from './fetchEmails';
import { fetchMessages } from './fetchMessages';
import { fetchProjects } from './fetchProjects';

// Re-export the fetch functions
export { fetchEmails, fetchMessages, fetchProjects };

// Fetch statistics from Firestore
export const fetchStatistics = async (): Promise<Statistics> => {
    try {
        const docRef = doc(db, 'statistics', 'dashboard_stats');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
             return docSnap.data() as Statistics;
        } else {
            console.warn('Statistics document not found, returning default values.');
            return {
                total: 12,
                ongoing: 5,
                unfinished: 3,
                chartData: [
                    { name: 'Completed', value: 4 },
                    { name: 'In Progress', value: 5 },
                    { name: 'Not Started', value: 3 },
                ],
                userId: 'local',
            };
        }
    } catch (error) {
        console.warn('Error fetching statistics from Firebase, falling back to mock data:', error);
        return {
            total: 12,
            ongoing: 5,
            unfinished: 3,
            chartData: [
                { name: 'Completed', value: 4 },
                { name: 'In Progress', value: 5 },
                { name: 'Not Started', value: 3 },
            ],
            userId: 'local',
        };
    }
};
