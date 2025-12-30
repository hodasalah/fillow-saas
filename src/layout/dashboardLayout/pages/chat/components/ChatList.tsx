import React from 'react';
import { useAppSelector } from '../../../../../hooks/hooks';
import { Chat } from '../../../../../services/firebase/chats';
import { formatTimestamp } from '../../../../../utils/dateUtils';
import {
    getImageLoadErrorHandler,
    getImmediateProfilePictureUrl,
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
		<div className='overflow-y-auto flex flex-col h-full'>
			{chats.map((chat) => {
				const otherUser = getOtherUserFromChat(chat);
				const isActive = selectedChat?.id === chat.id;
				
				return (
					<div
						key={chat.id}
						className={`group relative flex items-center p-3 mx-2 mb-1 rounded-xl cursor-pointer transition-all duration-200 border-l-4 ${
							isActive
								? 'bg-gradient-to-r from-purple-100/60 to-transparent border-purple-500 shadow-sm translate-x-1'
								: 'hover:bg-gray-50 border-transparent hover:border-gray-200'
						}`}
						onClick={() => onSelectChat(chat)}
					>
						<div className='relative'>
							<img
								src={getImmediateProfilePictureUrl(
									otherUser?.profilePicture,
									otherUser?.name || 'User',
								)} 
								alt={getUserName(chat)}
								className={`w-12 h-12 rounded-full object-cover transition-transform duration-200 ${isActive ? 'ring-2 ring-purple-200 scale-105' : 'group-hover:scale-105'}`}
								onError={getImageLoadErrorHandler(
									otherUser?.name || 'User',
								)}
							/>
							<span
								className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${
									otherUser?.status === 'online'
										? 'bg-green-500'
										: 'bg-gray-300'
								} border-2 border-white rounded-full`}
							></span>
						</div>
						<div className='ml-4 flex-1 min-w-0'>
							<div className="flex justify-between items-baseline">
								<h3 className={`text-sm font-semibold truncate ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
									{getUserName(chat)}
								</h3>
								{chat.lastMessage && (
									<span className={`text-[10px] ml-2 ${isActive ? 'text-purple-500' : 'text-gray-400'}`}>
										{formatTimestamp(chat.lastMessage.createdAt)}
									</span>
								)}
							</div>
							<p className={`text-xs truncate mt-0.5 ${isActive ? 'text-purple-600 font-medium' : 'text-gray-500 group-hover:text-gray-600'}`}>
								{chat.lastMessage?.senderId === currentUserId && 'You: '}
								{chat.lastMessage?.text || 'No messages yet'}
							</p>
						</div>
					</div>
				);
			})}
            
		</div>
	);
};

export default ChatList;
