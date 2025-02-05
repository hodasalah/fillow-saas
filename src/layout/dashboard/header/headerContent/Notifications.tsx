import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../../../../components/Card';
import { notifications } from './constants';



const Notifications = () => {
	return (
		<Card>
			<div className='flex flex-col w-[17rem] p-4 h-[380px] overflow-hidden'>
				<ul className='scrollbar-w-thin overflow-auto'>
					{notifications.map((notification) => (
						<li key={notification.id}>
							<div className='flex items-center border-b-[0.0625rem] border-[#eaeaea] pb-[0.9375rem] mb-[0.9375rem]'>
								<div
									className='mr-2 w-[3.125rem] h-[3.125rem] rounded-[.75rem] overflow-hidden text-lg text-center flex items-center justify-center font-bold self-start'
									style={{
										backgroundColor: notification.background
											? notification.background
											: '#eee',
										color: notification.color
											? notification.color
											: '',
									}}
								>
									{/* image herer */}
									{notification.icon &&
										(typeof notification.icon ===
										'string' ? (
											notification.icon.startsWith(
												'/',
											) ? (
												// Image URL case
												<img
													src={notification.icon}
													alt='icon'
													className='rounded-[0.1875rem] w-[50px]'
												/>
											) : (
												// Initials/text case (like 'KG')
												<span className='rounded-[0.1875rem] w-[50px] flex items-center justify-center'>
													{notification.icon}
												</span>
											)
										) : (
											// Font Awesome icon case
											<FontAwesomeIcon
												icon={notification.icon}
												className='rounded-[0.1875rem] w-[50px] text-lg'
											/>
										))}
								</div>
								<div className='flex-1'>
									<h6 className='text-[0.938rem] mb-1 text-[var(--text-dark)] font-semibold leading-normal'>
										{notification.title}
									</h6>
									<small className='block text-[0.675em]'>
										{notification.time}
									</small>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</Card>
	);
};

export default Notifications;
