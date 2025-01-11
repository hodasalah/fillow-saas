import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../../../components/Card';
import StackedBarChart from '../../../components/chart/StackedBarChart';

const TotalClients = () => {
	return (
		<div
			className='w-full h-full  relative mb-[1.8r75rem] transition-all border-0 border-transparent
    grid grid-cols-12 lg:gap-6 gap-4 fit-content-height '
		>
			<Card>
				<div className='w-full flex items-center justify-between py-1 px-5'>
					<div className='w-full'>
						<h4 className='whitespace-nowrap mb-4 text-[1.125rem] font-bold text-[var(--text-dark)]'>
							Total Clients
						</h4>
						<div className='flex items-center justify-between gap-4 w-full'>
							<h2 className='text-[2rem] font-bold text-black leading-6 mb-0'>
								68
							</h2>
							<div>
								<FontAwesomeIcon
									icon={faCaretUp}
									className='text-[1rem] text-[#09BD3C]'
								/>
								<strong className='text-[1rem] text-[#09BD3C]'>
									{' '}
									+0,5%
								</strong>
							</div>
						</div>
					</div>
					<div className='w-full relative'>
						<StackedBarChart />
					</div>
				</div>
			</Card>

			<Card>From</Card>

			<Card>me</Card>
			<Card>Hoda</Card>
		</div>
	);
};

export default TotalClients;
