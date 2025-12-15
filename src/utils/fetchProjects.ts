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
		console.error('Error fetching projects:', error);
		throw error;
	}
};
