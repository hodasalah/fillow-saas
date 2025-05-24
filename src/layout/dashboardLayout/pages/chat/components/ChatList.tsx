import React from 'react';
import { useAppSelector } from '../../../../../hooks/hooks';
import { Chat } from '../../../../../services/firebase/chats';
import { formatTimestamp } from '../../../../../utils/dateUtils';
import {
	getImageLoadErrorHandler,
	getProfilePictureUrl,
} from '../../../../../utils/profilePicture';

interface ChatListProps {
	chats: Chat[];
	selectedChat: Chat | null;
	onSelectChat: (chat: Chat) => void;
	currentUserId: string | undefined;
}

const ChatList: React.FC<ChatListProps> = ({
	chats,
	selectedChat,
	onSelectChat,
	currentUserId,
}) => {
	const users = useAppSelector((state) => state.users.users);

	const getOtherUserFromChat = (chat: Chat) => {
		const otherUserId = chat.participants.find(
			(id) => id !== currentUserId,
		);
		return users.find((user) => user.uid === otherUserId);
	};

	const getUserName = (chat: Chat) => {
		const otherUser = getOtherUserFromChat(chat);
		return otherUser?.name || 'Unknown User';
	};

	return (
		<div className='overflow-y-auto'>
			{chats.map((chat) => {
				const otherUser = getOtherUserFromChat(chat);
				return (
					<div
						key={chat.id}
						className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
							selectedChat?.id === chat.id ? 'bg-purple-50' : ''
						}`}
						onClick={() => onSelectChat(chat)}
					>
						<div className='relative'>
							<img
								src={getProfilePictureUrl(
									otherUser?.profilePicture,
									otherUser?.name || 'User',
								)}
								alt={getUserName(chat)}
								className='w-12 h-12 rounded-full object-cover'
								onError={getImageLoadErrorHandler(
									otherUser?.name || 'User',
								)}
							/>
							<span
								className={`absolute bottom-0 right-0 w-3 h-3 ${
									otherUser?.status === 'online'
										? 'bg-green-500'
										: 'bg-gray-400'
								} border-2 border-white rounded-full`}
							></span>
						</div>
						<div className='ml-4 flex-1'>
							<h3 className='text-sm font-semibold text-gray-900'>
								{getUserName(chat)}
							</h3>
							<p className='text-sm text-gray-500 truncate'>
								{chat.lastMessage?.text || 'No messages yet'}
							</p>
						</div>
						{chat.lastMessage && (
							<div className='text-xs text-gray-400'>
								{formatTimestamp(chat.lastMessage.createdAt)}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default ChatList;
