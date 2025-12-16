import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Project } from '../types';

export const fetchProjects = async () => {
	try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData: Project[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const toDate = (val: any) => (val?.toDate ? val.toDate() : new Date(val));
            return {
                id: doc.id,
                ...data,
                startDate: toDate(data.startDate),
                endDate: toDate(data.endDate),
                deadline: toDate(data.deadline),
            } as Project;
        });
		return projectsData;
	} catch (error) {
		console.warn('Error fetching projects from Firebase, falling back to mock data:', error);
		try {
            const res = await fetch('/datas/projects.json');
            const data = await res.json();
            // Need to map strings to Dates for Project type compatibility
            return (data.projects || []).map((p: any) => ({
                ...p,
                id: 'mock_' + (p.id || Math.random().toString(36).substr(2, 9)),
                startDate: new Date(p.startDate),
                endDate: new Date(p.endDate),
                deadline: new Date(p.deadline),
            }));
        } catch (mockError) {
             console.error('Failed to load mock projects:', mockError);
             return [];
        }
	}
};
