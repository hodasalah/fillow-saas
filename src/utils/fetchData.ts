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
                total: 0,
                ongoing: 0,
                unfinished: 0,
                chartData: [],
                userId: 'local',
            };
        }
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return {
            total: 0,
            ongoing: 0,
            unfinished: 0,
            chartData: [],
            userId: 'local',
        };
    }
};
