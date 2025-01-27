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
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);
	return (
		<div
			className={`overflow-hidden ${
				isOpen
					? 'ml-[var(--dz-sidebar-width)]'
					: 'ml-[var(--dz-sidebar-width-mobile)]'
			} bg-body-bg text-[0.875rem] min-h-[calc(100vh-7.7rem)]  pt-[--dz-header-height]`}
		>
			<div className='pl-[1.875rem] pr-[1.875rem] pt-[1.875rem] '>
				<div className='grid grid-cols-1 xl:grid-cols-2  gap-4 xl:gap-8  w-full mb-8'>
					{/* first column */}
					<div className='flex flex-col xl:gap-8 gap-4'>
						<GradiantCard />
						<ProjectStatistics />
						<CompleteProject />
						<RecentEmails />
					</div>
					{/* second column */}
					<div className='flex flex-col xl:gap-8 gap-4'>
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
