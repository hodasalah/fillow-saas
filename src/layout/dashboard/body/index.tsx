import Barchart from '../../../components/chart/Barchart';
import EmailChart from '../../../components/chart/EmailChart';
import LineChart from '../../../components/chart/LineChart';
import NewCustomerLineChart from '../../../components/chart/NewCustomerLineChart';
import Radial from '../../../components/chart/Radial';
import StackedBarChart from '../../../components/chart/StackedBarChart';
import { useAppSelector } from '../../../hooks/hooks';
import GradiantCard from './gradiantCard';
import TotalClients from './TotalClients';

const BodyContent = () => {
	const isActive = useAppSelector((state) => state.activeSidebar.isActive);
	return (
		<div
			className={`overflow-hidden ${
				isActive ? 'pl-[6rem]' : 'pl-[--dz-sidebar-width]'
			} bg-body-bg text-[0.875rem]  min-h-[calc(100vh-7.7rem)]  pt-[--dz-header-height]`}
		>
			<div className='pl-[1.875rem] pr-[1.875rem] pt-[1.875rem]'>
				<div className='grid grid-cols-1 xl:grid-cols-2  gap-4 xl:gap-8  w-full'>
					<GradiantCard />
					<TotalClients/>
				</div>
				<Barchart />
				<LineChart />
				DASHBOARD
				<StackedBarChart />
				<NewCustomerLineChart />
				<Radial />
				<EmailChart />
			</div>
		</div>
	);
};

export default BodyContent;
