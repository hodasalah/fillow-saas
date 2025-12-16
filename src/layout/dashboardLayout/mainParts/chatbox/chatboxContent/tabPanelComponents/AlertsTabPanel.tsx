import {
    faEllipsis,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../../hooks/hooks'; // Assuming hooks location
import { Alert, seedDefaultAlerts, subscribeToAlerts } from '../../../../../../services/firebase/alerts';

const AlertsTabPanel = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const [alerts, setAlerts] = useState<Alert[]>([]);
    
    useEffect(() => {
        if (!currentUser) return;

        const unsubscribe = subscribeToAlerts(currentUser.uid, (data) => {
            setAlerts(data);
        });

        return () => unsubscribe();
    }, [currentUser]);

    // Group alerts by category
    const groupedAlerts = React.useMemo(() => {
         // Sort by date (newest first) since we removed backend sorting
         return [...alerts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); 
    }, [alerts]);

    const formatTime = (date: Date) => {
        // Simple fallback time format
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
    }

    const handleManualSeed = async () => {
        console.log("Manual seed clicked. CurrentUser:", currentUser?.uid);
        if (currentUser) {
            try {
                await seedDefaultAlerts(currentUser.uid);
                console.log("Seeding command sent.");
                alert("Seeding command sent! Alerts should appear momentarily.");
            } catch (error) {
                console.error("Manual seed failed:", error);
                alert("Failed to seed alerts. Check console.");
            }
        } else {
            console.warn("No current user found when trying to seed.");
            alert("No user found. Please wait for login or reload.");
        }
    };

	return (
		<div className='w-full h-full overflow-y-auto custom-scrollbar'>
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
						{alerts.length > 0 ? `Show All (${alerts.length})` : 'Notifications'}
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
                {/* 
                   We could group by category if desired, but flat list ordered by time 
                   is standard for notification centers. The original mock used categories headers,
                   so let's keep that structure if possible or simplify.
                   
                   Original mock structure:
                   { Notifications.map(...) <Fragment> <li CategoryHeader> <li Item> </Fragment> }
                   This implies the array was pre-sorted/grouped or manually arranged.
                   Let's stick to a simple list for dynamic data for now, 
                   or group by category dynamically. 
                   Let's grouping by Category for UI consistency.
                */}
				{['Social', 'System', 'Server Status'].map((category) => {
                    const categoryAlerts = groupedAlerts.filter(a => a.category === category);
                    if (categoryAlerts.length === 0) return null;
                    
                    return (
					<React.Fragment key={category}>
						<li className='bg-white py-1 px-4 text-black sticky top-0 z-[1] font-bold border-b-[0.0625rem] cursor-pointer'>
							{category}
						</li>
                        {categoryAlerts.map(alert => (
						<li key={alert.id} className='border-b-[0.0625rem] cursor-pointer py-[0.4375rem] px-4 hover:bg-[#f6f6f6]'>
							<div className='flex'>
								<div className='bg-rgba-primary-1 text-primary w-10 h-10 relative flex justify-center min-w-10 min-h-10 items-center rounded-[2.5rem] mr-[0.625rem] font-medium text-[0.875rem]'>
									{alert.code}
								</div>
								<div>
									<span className='text-[var(--text-dark)] text-[0.9375rem] font-medium mb-[0.3125rem] overflow-hidden block max-w-[10.625rem] leading-[1] text-ellipsis whitespace-nowrap'>
										{alert.message}
									</span>
									<p className='text-[0.8125rem] mb-0 max-w-[10.625rem] overflow-clip leading-[1]'>
										{formatTime(alert.createdAt)}
									</p>
								</div>
							</div>
						</li>
                        ))}
					</React.Fragment>
                    );
				})}
                {/* Handle Uncategorized */}
                {(() => {
                    const uncategorized = groupedAlerts.filter(a => !['Social', 'System', 'Server Status'].includes(a.category));
                    if (uncategorized.length === 0) return null;
                    return (
                         <React.Fragment key="Other">
                            <li className='bg-white py-1 px-4 text-black sticky top-0 z-[1] font-bold border-b-[0.0625rem] cursor-pointer'>
                                Other
                            </li>
                            {uncategorized.map(alert => (
                                <li key={alert.id} className='border-b-[0.0625rem] cursor-pointer py-[0.4375rem] px-4 hover:bg-[#f6f6f6]'>
                                    <div className='flex'>
                                        <div className='bg-rgba-primary-1 text-primary w-10 h-10 relative flex justify-center min-w-10 min-h-10 items-center rounded-[2.5rem] mr-[0.625rem] font-medium text-[0.875rem]'>
                                            {alert.code || '??'}
                                        </div>
                                        <div>
                                            <span className='text-[var(--text-dark)] text-[0.9375rem] font-medium mb-[0.3125rem] overflow-hidden block max-w-[10.625rem] leading-[1] text-ellipsis whitespace-nowrap'>
                                                {alert.message}
                                            </span>
                                            <p className='text-[0.8125rem] mb-0 max-w-[10.625rem] overflow-clip leading-[1]'>
                                                {formatTime(alert.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                         </React.Fragment>
                    );
                })()}
			</ul>
		</div>
	);
};

export default AlertsTabPanel;
