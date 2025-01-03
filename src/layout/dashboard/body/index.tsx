import Barchart from '../../../components/chart/Barchart';
import EmailChart from '../../../components/chart/EmailChart';
import LineChart from '../../../components/chart/LineChart';
import NewCustomerLineChart from '../../../components/chart/NewCustomerLineChart';
import Radial from '../../../components/chart/Radial';
import StackedBarChart from '../../../components/chart/StackedBarChart';

const BodyContent = () => {
	return (
		<div className='overflow-hidden pl-[--dz-sidebar-width] bg-body-bg text-[0.875rem]  min-h-[calc(100vh-7.7rem)]  pt-[--dz-header-height]'>
			<Barchart />
			DASHBOARD
			<LineChart />
			<StackedBarChart />
			<NewCustomerLineChart />
			<Radial />
			<EmailChart />
		</div>
	);
};

export default BodyContent;
