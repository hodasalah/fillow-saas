import { v4 as uuidv4 } from 'uuid';
import { Project } from '../types';

export const fetchProjects = async () => {
	try {
		const response = await fetch('/datas/projects.json');
		if (!response.ok) {
			throw new Error('Failed to fetch projects from server');
		}
		const data = await response.json();
		const projectsData: Project[] = data.projects.map(
			(project: Omit<Project, 'id'>) => ({
				...project,
				id: uuidv4(),
			}),
		);
		return projectsData;
	} catch (error) {
		console.error('Error fetching messages:', error);
		throw error;
	}
};
