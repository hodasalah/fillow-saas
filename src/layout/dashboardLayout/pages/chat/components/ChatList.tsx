import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Chat } from '../../../../../services/firebase/chats';
import { UserData, getUserData } from '../../../../../services/firebase/users';

interface ChatListProps {
	chats: Chat[];
	selectedChat: Chat | null;
	onSelectChat: (chat: Chat) => void;
	currentUserId?: string;
}

const ChatList: React.FC<ChatListProps> = ({
	chats,
	selectedChat,
	onSelectChat,
	currentUserId,
}) => {
	const [chatUsers, setChatUsers] = useState<Record<string, UserData>>({});

	// Fetch user data for each chat
	useEffect(() => {
		const fetchUsers = async () => {
			const users: Record<string, UserData> = {};

			for (const chat of chats) {
				const otherUserId = chat.participants.find(
					(id) => id !== currentUserId,
				);
				if (otherUserId && !chatUsers[otherUserId]) {
					const userData = await getUserData(otherUserId);
					if (userData) {
						users[otherUserId] = userData;
					}
				}
			}

			setChatUsers((prev) => ({ ...prev, ...users }));
		};

		fetchUsers();
	}, [chats, currentUserId]);

	const getChatUser = (chat: Chat) => {
		const otherUserId = chat.participants.find(
			(id) => id !== currentUserId,
		);
		return otherUserId ? chatUsers[otherUserId] : null;
	};

	return (
		<div className='overflow-y-auto h-[calc(100vh-180px)]'>
			{chats.map((chat) => {
				const user = getChatUser(chat);
				const isSelected = selectedChat?.id === chat.id;

				return (
					<div
						key={chat.id}
						className={`p-4 cursor-pointer hover:bg-gray-50 ${
							isSelected ? 'bg-purple-50' : ''
						}`}
						onClick={() => onSelectChat(chat)}
					>
						<div className='flex items-center space-x-3'>
							<div className='relative'>
								<img
									src={
										user?.photoURL ||
										'https://via.placeholder.com/40'
									}
									alt={user?.displayName}
									className='w-10 h-10 rounded-full'
								/>
								{user?.status === 'online' && (
									<span className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full'></span>
								)}
							</div>
							<div className='flex-1 min-w-0'>
								<div className='flex justify-between items-start'>
									<h3 className='text-sm font-semibold text-gray-900 truncate'>
										{user?.displayName || 'Loading...'}
									</h3>
									{chat.lastMessage?.createdAt && (
										<span className='text-xs text-gray-500'>
											{formatDistanceToNow(
												chat.lastMessage.createdAt,
												{ addSuffix: true },
											)}
										</span>
									)}
								</div>
								<p className='text-sm text-gray-500 truncate'>
									{chat.lastMessage?.text ||
										'No messages yet'}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ChatList;
