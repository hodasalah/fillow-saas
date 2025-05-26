import { Statistics } from '../types/dashboard';
import { fetchEmails } from './fetchEmails';
import { fetchMessages } from './fetchMessages';
import { fetchProjects } from './fetchProjects';

// Re-export the fetch functions
export { fetchEmails, fetchMessages, fetchProjects };

// Mock statistics since there's no fetchStatistics file
export const fetchStatistics = async (): Promise<Statistics> => {
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
};
