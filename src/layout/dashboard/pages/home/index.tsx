import { useAppSelector } from '../../../../hooks/hooks';
import CompleteProject from './completeProject';
import DognutArea from './dognutArea';
import EmailCategories from './emailCategories';
import GradiantCard from './gradiantCard';
import ImportantProjects from './ImportantProjects';
import Messages from './messages';
import ProjectStatistics from './projectStatistics';
import RecentEmails from './recentEmails/index';
import TotalClients from './totalClientsComponents';

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
				} w-full bg-body-bg text-[0.875rem] min-h-[calc(100vh-7.7rem)]  pt-[--dz-header-height]`}
		>
			<div className='md:pl-[1.875rem] md:pr-[1.875rem] pt-[1.875rem]'>
				<div className='grid grid-cols-1 md:grid-cols-2  gap-4 xl:gap-8  mb-8 margin-auto'>
					{/* first column */}
					<div className='flex flex-col xl:gap-8 gap-4 max-w-[600px]'>
						<GradiantCard />
						<ProjectStatistics />
						<CompleteProject />
						<RecentEmails />
					</div>
					{/* second column */}
					<div className='flex flex-col xl:gap-8 gap-4 max-w-[600px]'>
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
