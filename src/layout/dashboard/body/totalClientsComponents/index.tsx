import Card from '../../../../components/Card';
import Linear from './Linear';
import LinearProjects from './LinearProjects';
import Progress from './Progress';
import Stacked from './Stacked';

const index = () => {
	return (
		<div
			className='w-full relative transition-all border-0 border-transparent
    grid grid-cols-12 auto-rows-max gap-4 '
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

export default index;
