import RedCircle from '../../../../../../../components/svgs/RedCircle';
import YellowCircle from '../../../../../../../components/svgs/YellowCircle';
import TotalProjects from './TotalProjects';
import StatisticsItem from './StatisticsItem';

interface StatisticsOverviewProps {
	total: number;
	ongoing: number;
	unfinished: number;
	completionPercentage: number;
}

export const StatisticsOverview = ({
	total,
	ongoing,
	unfinished,
	completionPercentage,
}: StatisticsOverviewProps) => (
	<div className='w-full flex flex-1 pt-[1.875rem]'>
		<div className='flex items-center gap-4 w-full justify-between flex-wrap'>
			<TotalProjects
				total={total}
				percentage={completionPercentage}
			/>
			<div className='flex gap-8 flex-wrap'>
				<StatisticsItem
					value={ongoing}
					label='On Going'
					icon={<YellowCircle />}
				/>
				<StatisticsItem
					value={unfinished}
					label='Unfinished'
					icon={<RedCircle />}
				/>
			</div>
		</div>
	</div>
);
