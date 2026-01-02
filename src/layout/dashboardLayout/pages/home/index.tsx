import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import DataSourceIndicator from '../../../../components/DataSourceIndicator';
import { useAppSelector } from '../../../../hooks/hooks';
import type {
    DashboardData
} from '../../../../types/dashboard';
import {
    fetchEmails,
    fetchMessages,
    fetchProjects,
    fetchStatistics,
} from '../../../../utils/fetchData';
import CompleteProject from './components/completeProject';
import DognutArea from './components/dognutArea';
import EmailCategories from './components/emailCategories';
import GradiantCard from './components/gradiantCard';
import ImportantProjects from './components/ImportantProjects';
import Messages from './components/messages';
import ProjectStatistics from './components/projectStatistics';
import RecentEmails from './components/recentEmails';
import TotalClients from './components/totalClientsComponents';


// Memoized loading component
const LoadingSpinner = memo(() => (
	<div className='flex items-center justify-center min-h-screen'>
		<div className='w-8 h-8 border-4 border-purple-600 rounded-full animate-spin border-t-transparent'></div>
	</div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// Memoized error component
const ErrorDisplay = memo(({ message }: { message: string }) => (
	<div className='flex items-center justify-center min-h-screen'>
		<p className='text-red-500'>{message}</p>
	</div>
));

ErrorDisplay.displayName = 'ErrorDisplay';

interface ColumnProps {
	data: DashboardData;
}

// Memoized layout components
const FirstColumn = memo(({ data }: ColumnProps) => (
	<div className='flex flex-col xl:gap-8 gap-4 max-w-[600px] w-full'>
		<GradiantCard />
		<ProjectStatistics />
		<CompleteProject projects={data.projects} />
		<RecentEmails emails={data.emails} />
	</div>
));

FirstColumn.displayName = 'FirstColumn';

const SecondColumn = memo(({ data }: ColumnProps) => (
	<div className='flex flex-col xl:gap-8 gap-4 max-w-[600px] w-full'>
		<TotalClients />
		<DognutArea />
		<EmailCategories emails={data.emails} />
		<ImportantProjects projects={data.projects} />
		<Messages messages={data.messages} />
	</div>
));

SecondColumn.displayName = 'SecondColumn';

const initialDashboardData: DashboardData = {
	messages: [],
	emails: [],
	projects: [],
	statistics: {
		total: 0,
		ongoing: 0,
		unfinished: 0,
		chartData: [],
		userId: 'local',
	},
};


const DashboardHome = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [dashboardData, setDashboardData] =
		useState<DashboardData>(initialDashboardData);

	const loadDashboardData = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const [messagesData, emailsData, projectsData, statisticsData] =
				await Promise.all([
					fetchMessages(),
					fetchEmails(),
					fetchProjects(),
					fetchStatistics(),
				]);

			// Since fetchProjects is an async thunk, we need to handle it differently
			const projects = await projectsData;

			setDashboardData({
				messages: messagesData,
				emails: emailsData,
				projects,
				statistics: statisticsData,
			});
		} catch (error) {
			console.error('Error loading dashboard data:', error);
			setError('Failed to load dashboard data. Please try again later.');
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadDashboardData();
	}, [loadDashboardData]);


	const containerClassName = useMemo(
		() =>
			`
        ${
			isMobileView
				? 'px-3'
				: mode === 'wide'
				? 'pl-[var(--dz-sidebar-width)]'
				: 'pl-[var(--dz-sidebar-width-mobile)]'
		} w-full bg-body-bg text-[0.875rem] min-h-[calc(100vh-5.3rem)]  pt-[--dz-header-height]`,
		[isMobileView, mode],
	);

	if (isLoading) return <LoadingSpinner />;
	if (error) return <ErrorDisplay message={error} />;



	return (
		<div className={containerClassName}>
			<div className='md:pl-[1.875rem] md:pr-[1.875rem] pt-[1.875rem] flex  justify-center'>
				<div className='grid grid-cols-1 md:grid-cols-2  gap-4 xl:gap-8  '>
					<FirstColumn data={dashboardData} />
					<SecondColumn data={dashboardData} />
				</div>
			</div>
            <DataSourceIndicator source={error ? 'Mock' : 'Firebase'} />
		</div>
	);
};

export default memo(DashboardHome);
