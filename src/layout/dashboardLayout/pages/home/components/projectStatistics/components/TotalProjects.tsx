import ProgressCircle from '../../../../../../../components/svgs/progressCircle';

const TotalProjects = ({
	total,
	percentage,
}: {
	total: number;
	percentage: number;
}) => (
	<div className='flex items-center gap-4'>
		<ProgressCircle
			percentage={percentage}
			colour='#886cc0'
		/>
		<div>
			<h2 className='text-2xl font-semibold text-text-dark'>{total}</h2>
			<p className='text-secondary-500'>Total Projects</p>
		</div>
	</div>
);
export default TotalProjects;
