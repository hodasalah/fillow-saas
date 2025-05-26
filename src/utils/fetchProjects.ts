import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Project } from '../types';

export const fetchProjects = async (): Promise<Project[]> => {
	try {
		const projectsCollection = collection(db, 'projects');
		const projectsSnapshot = await getDocs(projectsCollection);
		const projectsList = projectsSnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		})) as Project[];
		return projectsList;
	} catch (error) {
		console.error('Error fetching projects:', error);
		throw new Error(
			error instanceof Error ? error.message : 'Failed to fetch projects',
		);
	}
};
