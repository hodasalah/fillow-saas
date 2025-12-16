import {
	faEllipsis,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../../hooks/hooks';
import { initializeChatCollection } from '../../../../../../services/firebase/chats';

const ChatListTab = () => {
    const { users } = useAppSelector((state) => state.users);
    const { currentUser } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleUserClick = async (otherUserId: string) => {
        if (!currentUser) return;
        try {
            console.log("Starting chat with:", otherUserId);
            const chatId = await initializeChatCollection(
                currentUser.uid,
                otherUserId
            );
            navigate('/dashboard/chat', { 
                state: { 
                    chatId,
                    recruitUser: { otherUserId }
                } 
            });
        } catch (error) {
            console.warn("Failed to init chat (likely permission), persisting with optimistic nav:", error);
            // FALLBACK: Navigate anyway with a temporary ID
            navigate('/dashboard/chat', { 
                state: { 
                    chatId: `temp_${otherUserId}`,
                    recruitUser: { otherUserId }
                } 
            });
        }
    };

    // Group users by first letter of their name
    const chatList = React.useMemo(() => {
        const groups: Record<string, any[]> = {};
        
        if (!users) return []; // Guard against undefined users

        users.forEach((user) => {
            if (!user.name) return; // Guard against missing name
            const letter = user.name.charAt(0).toUpperCase();
            if (!groups[letter]) {
                groups[letter] = [];
            }
            
            let lastSeenText = null;
            if (user.lastSeen) {
                 const dateStr = typeof user.lastSeen === 'string' ? user.lastSeen : new Date(user.lastSeen).toISOString();
                 lastSeenText = `last seen ${dateStr.split('T')[0]}`;
            }

            groups[letter].push({
                id: user.uid,
                name: user.name,
                status: user.status || 'offline',
                last_seen: lastSeenText,
                img: user.profilePicture
            });
        });

        // Convert to array and sort
        return Object.keys(groups).sort().map(letter => ({
            letter,
            contacts: groups[letter]
        }));
    }, [users]);
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
						Chat List
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

			<ul className='contacts'>
				{chatList.map((chatItem) => (
					<React.Fragment key={chatItem.letter}>
						<li className='bg-white py-1 px-4 text-black sticky top-0 z-[1] font-bold border-b-[0.0625rem] cursor-pointer'>
							{chatItem.letter}
						</li>
						{chatItem.contacts.map((contact) => (
							<li
								key={contact.id}
                                onClick={() => handleUserClick(contact.id)}
								className='border-b-[0.0625rem] cursor-pointer py-[0.4375rem] px-4 hover:bg-[#f6f6f6]'
							>
								<div className='flex'>
									<div className='bg-rgba-primary-1 text-primary w-10 h-10 relative flex justify-center min-w-10 min-h-10 items-center rounded-[2.5rem] mr-[0.625rem] font-medium text-[0.875rem]'>
										<img
											src={
												contact.img
													? contact.img
													: '/assets/fallback.png'
											}
											className='w-full h-full object-cover rounded-[2.5rem] absolute top-0 left-0'
											alt=''
										/>
										<span></span>
									</div>
									<div>
										<span className='text-[var(--text-dark)] text-[0.9375rem] font-medium mb-[0.3125rem] overflow-hidden block max-w-[10.625rem] leading-[1] text-ellipsis whitespace-nowrap'>
											{contact.name}
										</span>
										<p className='text-[0.8125rem] mb-0 max-w-[10.625rem] overflow-clip leading-[1]'>
											{contact.name +
												' is ' +
												contact.status}
											<br />
											{contact.last_seen && (
												<span className='text-[0.5425rem] mb-0 max-w-[10.625rem] overflow-clip text-primary'>
													{'last seen ' +
														contact.last_seen}
												</span>
											)}
										</p>
									</div>
								</div>
							</li>
						))}
					</React.Fragment>
				))}
			</ul>
		</div>
	);
};

export default ChatListTab;
