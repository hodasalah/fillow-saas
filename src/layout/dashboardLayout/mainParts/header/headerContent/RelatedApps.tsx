import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../../../../../components/card';
import { relatedApps } from './constants';

const RelatedApps = () => {
	return (
		<Card>
			<div className='flex flex-col w-[17rem] p-4'>
				<div className='border-b-[1px] border-b-border'>
					<h5 className='text-[var(--text-dark)] font-semibold text-[1rem] pb-3'>
						Related Apps
					</h5>
				</div>
				<div className='flex flex-wrap'>
					{relatedApps.map((app) => (
						<div
							key={app.id}
							className='my-4 w-[33.33333%] px-8'
						>
							<div className='flex flex-col items-center'>
								<div className='w-[50px] h-[50px] rounded-[0.625rem] flex items-center justify-center bg-body-bg'>
									<FontAwesomeIcon
										icon={app.image}
										className='text-2xl '
										style={{ color: app.color }}
									/>
								</div>
								<p className='text-[.75rem] font-light'>
									{app.name}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default RelatedApps;
