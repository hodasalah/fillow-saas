import { PrimaryOutlineBtn } from '../../../../components/buttons';
import Card from '../../../../components/Card';
import EmailChart from '../../../../components/chart/EmailChart';
import BlueRectDot from '../../../../components/svgs/rectDots/BlueRectDot';
import GreenRectDot from '../../../../components/svgs/rectDots/GreenRectDot';
import PinkRectDot from '../../../../components/svgs/rectDots/PinkRectDot';
import PurpleRectDot from '../../../../components/svgs/rectDots/PurpleRectDot';
import YellowRectDot from '../../../../components/svgs/rectDots/YellowRectDot';

const EmailCategories = () => {
	const emailData = [
		{
			icon: <PurpleRectDot />,
			name: 'Primary',
			value: 27,
			totalmemory: 763,
		},
		{
			icon: <GreenRectDot />,
			name: 'Promotion',
			value: 11,
			totalmemory: 321,
		},
		{
			icon: <BlueRectDot />,
			name: 'Forum',
			value: 19,
			totalmemory: 69,
		},
		{
			icon: <YellowRectDot />,
			name: 'Socials',
			value: 15,
			totalmemory: 147,
		},
		{
			icon: <PinkRectDot />,
			name: 'Spam',
			value: 25,
			totalmemory: 696,
		},
	];
	return (
		<div className='w-full h-fit'>
			<Card>
				<div className='w-full p-[1.875rem] pb-0'>
					<div className='mb-4 '>
						<h4 className='mb-0 text-xl font-semibold text-[var(--text-dark)] capitalize mt-0'>
							Email Categories
						</h4>
						<span className='text-sm'>
							Emails categories data sent
						</span>
					</div>
					<div>
						<EmailChart />
					</div>
					<div className='mb-3 mt-4'>
						<h4 className='text-[1.125rem] leading-[1.5] text-[var(--text-dark)] font-semibold'>
							Legend
						</h4>
					</div>
					<div>
						{emailData.map((item) => {
							return (
								<div
									className='flex items-center justify-between mb-3'
									key={item.name}
								>
									<span className='text-[1rem] leading-[1.6] text-[var(--text-gray)]'>
										{item.icon} {item.name} ({item.value}%)
									</span>
									<h5 className='mb-0 font-semibold text-[var(--text-dark)] text-[1rem]'>
										{item.totalmemory}
									</h5>
								</div>
							);
						})}
					</div>
					<div className='py-5'>
						<PrimaryOutlineBtn>Update Progress</PrimaryOutlineBtn>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default EmailCategories;
