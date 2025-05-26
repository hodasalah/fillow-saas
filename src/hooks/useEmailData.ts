import { Email } from '@/types/dashboard';
import { fetchEmails } from '@/utils/fetchData';
import { useEffect, useState } from 'react';

const CACHE_KEY = 'emailsCache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const REFRESH_INTERVAL = 30 * 1000; // 30 seconds

interface CacheData {
	data: Email[];
	timestamp: number;
}

export const useEmailData = () => {
	const [emails, setEmails] = useState<Email[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const getCachedData = (): CacheData | null => {
		const cached = localStorage.getItem(CACHE_KEY);
		if (!cached) return null;

		try {
			const parsedCache = JSON.parse(cached) as CacheData;
			const isExpired =
				Date.now() - parsedCache.timestamp > CACHE_DURATION;
			return isExpired ? null : parsedCache;
		} catch {
			return null;
		}
	};

	const setCachedData = (data: Email[]) => {
		const cacheData: CacheData = {
			data,
			timestamp: Date.now(),
		};
		localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
	};

	const fetchData = async (skipCache = false) => {
		try {
			// Check cache first unless skipCache is true
			if (!skipCache) {
				const cached = getCachedData();
				if (cached) {
					setEmails(cached.data);
					setIsLoading(false);
					return;
				}
			}

			const data = await fetchEmails();
			setEmails(data);
			setCachedData(data);
			setError(null);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to fetch emails',
			);
			// Keep showing old data if available
			const cached = getCachedData();
			if (cached) {
				setEmails(cached.data);
			}
		} finally {
			setIsLoading(false);
		}
	};

	// Initial fetch with cache
	useEffect(() => {
		fetchData(false);
	}, []);

	// Set up refresh interval
	useEffect(() => {
		const intervalId = setInterval(() => {
			fetchData(true); // Skip cache on refresh
		}, REFRESH_INTERVAL);

		return () => clearInterval(intervalId);
	}, []);

	return { emails, isLoading, error, refetch: () => fetchData(true) };
};
