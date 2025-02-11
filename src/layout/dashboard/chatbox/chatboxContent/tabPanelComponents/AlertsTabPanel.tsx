import { faEllipsis, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notifications = [
	{
		category: 'Server Status',
		code: 'KK',
		message: 'David Nester Birthday',
		time: 'Today',
	},
	{
		category: 'Social',
		code: 'RU',
		message: 'Perfection Simplified\nJame Smith commented on your status',
		time: "Today",
	},
	{
		category: 'Server Status',
		code: 'AU',
		message: 'AharlieKane\nSami is online',
		time: 'Yesterday',
	},
	{
		category: 'Server Status',
		code: 'MO',
		message: 'Athan Jacoby\nNargis left 30 mins ago',
		time: "2 days ago",
	},
];
const AlertsTabPanel = () => {
	return (
		<div className='w-full '>
			<div
				className='flex justify-between items-center text-center border-b-[0.0625rem]
					border-border py-[0.9375rem] px-[1.25rem] text-[var(--text-dark)]'
			>
				<button className='cursor-pointer'>
					<FontAwesomeIcon
						icon={faEllipsis}
						className='text-[1.05rem]'
					/>
				</button>
				<div className='cursor-pointer'>
					<h6 className='mb-1 text-[0.9375rem] font-semibold'>
						Notifications
					</h6>
					<p className='mb-0 leading-5 text-[.75rem] text-[#9da1a5]'>
						Show All
					</p>
				</div>
				<button className='cursor-pointer'>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className='text-[1.05rem]'
					/>
				</button>
			</div>
			<ul>
				{Notifications.map((notification)=>(
					<>
					<li className='bg-white py-1 px-4 text-black sticky top-0 z-[1] font-bold border-b-[0.0625rem] cursor-pointer'>
					{notification.category}
				</li>
				<li className='border-b-[0.0625rem] cursor-pointer py-[0.4375rem] px-4'>
					<div className='flex'>
						<div className='bg-rgba-primary-1 text-primary w-10 h-10 relative flex justify-center min-w-10 min-h-10 items-center rounded-[2.5rem] mr-[0.625rem] font-medium text-[0.875rem]'>
							{notification.code}
						</div>
						<div className=''>
							<span className='text-[var(--text-dark)] text-[0.9375rem] font-medium mb-[0.3125rem] overflow-hidden block max-w-[10.625rem] leading-[1] text-ellipsis whitespace-nowrap'>
								{notification.message}
							</span>
							<p className='text-[0.8125rem] mb-0 max-w-[10.625rem] overflow-clip leading-[1]'>
								{notification.time}
							</p>
						</div>
					</div>
				</li>
				</>
				))}
				
			</ul>
		</div>
	);
};

export default AlertsTabPanel;
