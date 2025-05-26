import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import {
	DashboardData,
	Email,
	Message,
	Project,
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

const DashboardHome = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [dashboardData, setDashboardData] = useState<DashboardData>({
		messages: [] as Message[],
		emails: [] as Email[],
		projects: [] as Project[],
		statistics: {
			total: 0,
			ongoing: 0,
			unfinished: 0,
			chartData: [],
			userId: 'local',
		},
	});

	useEffect(() => {
		const loadDashboardData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const [messages, emails, projects, statistics] =
					await Promise.all([
						fetchMessages(),
						fetchEmails(),
						fetchProjects(),
						fetchStatistics(),
					]);

				setDashboardData({
					messages,
					emails,
					projects,
					statistics,
				});
			} catch (error) {
				console.error('Error loading dashboard data:', error);
				setError(
					'Failed to load dashboard data. Please try again later.',
				);
			} finally {
				setIsLoading(false);
			}
		};

		loadDashboardData();
	}, []);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-full'>
				<p className='text-gray-500'>Loading dashboard...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center h-full'>
				<p className='text-red-500'>{error}</p>
			</div>
		);
	}

	return (
		<div
			className={`
        ${
			isMobileView
				? 'px-3'
				: mode === 'wide'
				? 'pl-[var(--dz-sidebar-width)]'
				: 'pl-[var(--dz-sidebar-width-mobile)]'
		} w-full bg-body-bg text-[0.875rem] min-h-[calc(100vh-5.3rem)]  pt-[--dz-header-height]`}
		>
			<div className='md:pl-[1.875rem] md:pr-[1.875rem] pt-[1.875rem] flex  justify-center'>
				<div className='grid grid-cols-1 md:grid-cols-2  gap-4 xl:gap-8  '>
					{/* first column */}
					<div className='flex flex-col xl:gap-8 gap-4 max-w-[600px] w-full'>
						{' '}
						{/* added w-full here */}
						<GradiantCard />
						<ProjectStatistics
							statistics={dashboardData.statistics}
						/>
						<CompleteProject projects={dashboardData.projects} />
						<RecentEmails emails={dashboardData.emails} />
					</div>
					{/* second column */}
					<div className='flex flex-col xl:gap-8 gap-4  max-w-[600px] w-full'>
						{' '}
						{/* added w-full here */}
						<TotalClients />
						<DognutArea />
						<EmailCategories emails={dashboardData.emails} />
						<ImportantProjects projects={dashboardData.projects} />
						<Messages messages={dashboardData.messages} />
					</div>
				</div>
			</div>
		</div>
	);
};
export default DashboardHome;
