import { useAppSelector } from '../../../../hooks/hooks';
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
						<ProjectStatistics />
						<CompleteProject />
						<RecentEmails />
					</div>
					{/* second column */}
					<div className='flex flex-col xl:gap-8 gap-4  max-w-[600px] w-full'>
						{' '}
						{/* added w-full here */}
						<TotalClients />
						<DognutArea />
						<EmailCategories />
						<ImportantProjects />
						<Messages />
					</div>
				</div>
			</div>
		</div>
	);
};
export default DashboardHome;
