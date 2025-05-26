import React, { memo, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../../hooks/hooks';
import { Chat, Message } from '../../../../../services/firebase/chats';
import { formatMessageTime } from '../../../../../utils/dateUtils';
import {
	getImageLoadErrorHandler,
	getProfilePictureUrl,
} from '../../../../../utils/profilePicture';

interface ChatWindowProps {
	chat: Chat;
	messages: Message[];
	currentUserId: string | undefined;
	onSendMessage: (text: string) => void;
	error: string | null;
	isLoading?: boolean;
}

const MessageItem = memo(
	({
		message,
		isCurrentUser,
		messageUser,
	}: {
		message: Message;
		isCurrentUser: boolean;
		messageUser: any;
	}) => (
		<div
			className={`flex ${
				isCurrentUser ? 'justify-end' : 'justify-start'
			}`}
		>
			<div
				className={`flex ${
					isCurrentUser ? 'flex-row-reverse' : 'flex-row'
				} items-end max-w-[70%]`}
			>
				<img
					src={getProfilePictureUrl(
						messageUser?.profilePicture,
						messageUser?.name || 'User',
					)}
					alt={messageUser?.name || 'Unknown User'}
					className='w-8 h-8 rounded-full object-cover mx-2'
					onError={getImageLoadErrorHandler(
						messageUser?.name || 'User',
					)}
				/>
				<div
					className={`px-4 py-2 rounded-2xl ${
						isCurrentUser
							? 'bg-purple-600 text-white rounded-br-none'
							: 'bg-gray-200 text-gray-900 rounded-bl-none'
					}`}
				>
					<p>{message.text}</p>
					<span
						className={`text-xs ${
							isCurrentUser ? 'text-purple-200' : 'text-gray-500'
						}`}
					>
						{formatMessageTime(message.createdAt)}
					</span>
				</div>
			</div>
		</div>
	),
);

const LoadingSkeleton = () => (
	<div className='space-y-4'>
		{[1, 2, 3].map((i) => (
			<div
				key={i}
				className='flex items-end animate-pulse'
			>
				<div className='w-8 h-8 bg-gray-200 rounded-full'></div>
				<div className='ml-2 space-y-2'>
					<div className='w-48 h-4 bg-gray-200 rounded'></div>
					<div className='w-24 h-3 bg-gray-200 rounded'></div>
				</div>
			</div>
		))}
	</div>
);

const ChatWindow: React.FC<ChatWindowProps> = ({
	chat,
	messages,
	currentUserId,
	onSendMessage,
	error,
	isLoading = false,
}) => {
	const [newMessage, setNewMessage] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const users = useAppSelector((state) => state.users.users);

	const getUser = (userId: string) => {
		return users.find((user) => user.uid === userId);
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (newMessage.trim()) {
			onSendMessage(newMessage.trim());
			setNewMessage('');
		}
	};

	const otherUser = getUser(
		chat.participants.find((id) => id !== currentUserId) || '',
	);

	return (
		<div className='flex flex-col h-full'>
			<div className='p-4 border-b border-gray-200 bg-white rounded-tr-xl'>
				<div className='flex items-center'>
					<img
						src={getProfilePictureUrl(
							otherUser?.profilePicture,
							otherUser?.name || 'User',
						)}
						alt={otherUser?.name || 'Unknown User'}
						className='w-10 h-10 rounded-full object-cover'
						onError={getImageLoadErrorHandler(
							otherUser?.name || 'User',
						)}
					/>
					<div className='ml-3'>
						<h2 className='text-lg font-semibold text-gray-900'>
							{otherUser?.name || 'Unknown User'}
						</h2>
						<p className='text-sm text-gray-500'>
							{otherUser?.status === 'online'
								? 'Online'
								: 'Offline'}
						</p>
					</div>
				</div>
			</div>

			<div className='flex-1 overflow-y-auto p-4 space-y-4'>
				{isLoading ? (
					<LoadingSkeleton />
				) : messages.length === 0 ? (
					<div className='flex items-center justify-center h-full text-gray-500'>
						No messages yet. Start a conversation!
					</div>
				) : (
					<>
						{messages.map((message) => (
							<MessageItem
								key={message.id}
								message={message}
								isCurrentUser={
									message.senderId === currentUserId
								}
								messageUser={getUser(message.senderId)}
							/>
						))}
						<div ref={messagesEndRef} />
					</>
				)}
			</div>

			<form
				onSubmit={handleSubmit}
				className='p-4 bg-white border-t border-gray-200'
				aria-label='Message form'
			>
				{error && (
					<p
						className='text-red-500 mb-2'
						role='alert'
					>
						{error}
					</p>
				)}
				<div className='flex space-x-2'>
					<input
						type='text'
						id='messageInput'
						name='messageInput'
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder='Type a message...'
						className='flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500'
						aria-label='Message input'
						autoComplete='off'
					/>
					<button
						type='submit'
						disabled={!newMessage.trim()}
						className='px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed'
						aria-label='Send message'
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChatWindow;
