import { v4 as uuidv4 } from 'uuid';
import { Message } from '../layout/dashboardLayout/pages/home/messages';

export const fetchMessages = async () => {
	try {
		const response = await fetch('/datas/messages.json');
		if (!response.ok) {
			throw new Error('Failed to fetch messages from server');
		}
		const data = await response.json();
		const messagesData: Message[] = data.messages.map(
			(message: Omit<Message, 'id'>) => ({
				...message,
				id: uuidv4(),
			}),
		);
		return messagesData;
	} catch (error) {
		console.error('Error fetching messages:', error);
		throw error;
	}
};
