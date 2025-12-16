import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Card from '../../../../../components/Card';
import { useAppSelector } from '../../../../../hooks/hooks';
import { Alert, subscribeToAlerts } from '../../../../../services/firebase/alerts';

const Notifications = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        if (!currentUser) return;

        const unsubscribe = subscribeToAlerts(currentUser.uid, (data) => {
            // Sort by createdAt desc just in case
            const sorted = [...data].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            setAlerts(sorted);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const formatTime = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.round(diffMs / 60000);
        const diffHrs = Math.round(diffMs / 3600000);
        const diffDays = Math.round(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} mins ago`;
        if (diffHrs < 24) return `${diffHrs} hours ago`;
        if (diffDays === 1) return 'Yesterday';
        return `${diffDays} days ago`;
    };

	return (
		<Card>
			<div className='flex flex-col w-[17rem] p-4 h-[380px] overflow-hidden'>
				<ul className='scrollbar-w-thin overflow-auto h-full'>
                    {alerts.length === 0 ? (
                        <li className="text-center text-gray-500 py-4">No notifications</li>
                    ) : (
					alerts.map((notification) => (
						<li key={notification.id}>
							<div className='flex items-center border-b-[0.0625rem] border-[#eaeaea] pb-[0.9375rem] mb-[0.9375rem]'>
								<div
									className='mr-2 w-[3.125rem] h-[3.125rem] rounded-[.75rem] overflow-hidden text-lg text-center flex items-center justify-center font-bold self-start bg-gray-100 text-purple-600'
								>
                                    {/* Map category/code to icon/text */}
                                    {notification.code && notification.code.length <= 2 ? (
                                        <span className='rounded-[0.1875rem] w-[50px] flex items-center justify-center'>
                                            {notification.code}
                                        </span>
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faBell}
                                            className='rounded-[0.1875rem] w-[50px] text-lg'
                                        />
                                    )}
								</div>
								<div className='flex-1'>
									<h6 className='text-[0.938rem] mb-1 text-[var(--text-dark)] font-semibold leading-normal'>
										{notification.message}
									</h6>
									<small className='block text-[0.675em]'>
										{formatTime(notification.createdAt)}
									</small>
								</div>
							</div>
						</li>
					))
                    )}
				</ul>
			</div>
		</Card>
	);
};

export default Notifications;
