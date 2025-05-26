import { Message } from '@/types/dashboard';
import { dataFetcher } from '@/utils/dataFetcher';
import { fetchMessages } from '@/utils/fetchData';
import { useEffect, useState } from 'react';

const MESSAGES_KEY = 'messages';

export const useMessagesData = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async (skipCache = false) => {
		try {
			const data = await dataFetcher.fetch<Message[]>(
				MESSAGES_KEY,
				fetchMessages,
				skipCache,
			);
			setMessages(data);
			setError(null);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to fetch messages',
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData(false);

		// Subscribe to updates
		const unsubscribe = dataFetcher.subscribe<Message[]>(
			MESSAGES_KEY,
			(data) => {
				setMessages(data);
				setIsLoading(false);
			},
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return { messages, isLoading, error, refetch: () => fetchData(true) };
};
