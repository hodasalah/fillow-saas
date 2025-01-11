import Card from '../../../components/Card';
import Linear from './totalClientsComponents/Linear';
import LinearProjects from './totalClientsComponents/LinearProjects';
import Progress from './totalClientsComponents/Progress';
import Stacked from './totalClientsComponents/Stacked';

const TotalClients = () => {
	return (
		<div
			className='w-full h-full  relative mb-[1.8r75rem] transition-all border-0 border-transparent
    grid grid-cols-12  gap-4 fit-content-height '
		>
			<Card>
				<Stacked />
			</Card>

			<Card>
				<Progress />
			</Card>

			<Card>
				<Linear />
			</Card>
			<Card>
				<LinearProjects />
			</Card>
		</div>
	);
};

export default TotalClients;
