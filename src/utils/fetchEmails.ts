import { v4 as uuidv4 } from 'uuid';

export const fetchEmails = async () => {
	try {
		const response = await fetch('/datas/emails.json');
		if (!response.ok) {
			throw new Error('Failed to fetch emails');
		}
		const data = await response.json();
		const emailsData: Email[] = data.emailsData.map((email: Omit<Email, 'id'>) => ({
			...email,
			id: uuidv4(),
		}));
		return emailsData;
	} catch (error) {
		console.error('Error fetching emails:', error);
		throw error;
	}
};


