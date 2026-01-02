import { useEffect, useState } from 'react';
import { Project } from '../types';
import { dataFetcher } from '../utils/dataFetcher';
import { fetchProjects } from '../utils/fetchData';

const PROJECTS_KEY = 'projects';

export const useProjectsData = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async (skipCache = false) => {
		try {
			const data = await dataFetcher.fetch<Project[]>(
				PROJECTS_KEY,
				fetchProjects,
				skipCache,
			);
			setProjects(data);
			setError(null);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to fetch projects',
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData(false);

		// Subscribe to updates
		const unsubscribe = dataFetcher.subscribe<Project[]>(
			PROJECTS_KEY,
			(data: Project[]) => {
				setProjects(data);
				setIsLoading(false);
			},
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return { projects, isLoading, error, refetch: () => fetchData(true) };
};
