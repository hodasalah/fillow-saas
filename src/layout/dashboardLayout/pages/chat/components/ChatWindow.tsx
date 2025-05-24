import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { Chat, Message } from '../../../../../services/firebase/chats';
import { UserData, getUserData } from '../../../../../services/firebase/users';

interface ChatWindowProps {
	chat: Chat;
	messages: Message[];
	currentUserId?: string;
	onSendMessage: (text: string) => void;
	error?: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
	chat,
	messages,
	currentUserId,
	onSendMessage,
	error,
}) => {
	const [newMessage, setNewMessage] = useState('');
	const [chatUser, setChatUser] = useState<UserData | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Fetch other user's data
	useEffect(() => {
		const fetchUser = async () => {
			const otherUserId = chat.participants.find(
				(id) => id !== currentUserId,
			);
			if (otherUserId) {
				const userData = await getUserData(otherUserId);
				setChatUser(userData);
			}
		};
		fetchUser();
	}, [chat, currentUserId]);

	// Scroll to bottom when new messages arrive
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

	return (
		<div className='flex flex-col h-full'>
			{/* Chat Header */}
			<div className='p-4 border-b bg-white flex items-center space-x-3'>
				<div className='relative'>
					<img
						src={
							chatUser?.photoURL ||
							'https://via.placeholder.com/40'
						}
						alt={chatUser?.displayName}
						className='w-10 h-10 rounded-full'
					/>
					{chatUser?.status === 'online' && (
						<span className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full'></span>
					)}
				</div>
				<div>
					<h2 className='font-semibold text-gray-900'>
						{chatUser?.displayName || 'Loading...'}
					</h2>
					<p className='text-sm text-gray-500'>
						{chatUser?.status === 'online' ? 'Online' : 'Offline'}
					</p>
				</div>
			</div>

			{/* Messages */}
			<div className='flex-1 overflow-y-auto p-4 space-y-4'>
				{messages.map((message, index) => {
					const isCurrentUser = message.senderId === currentUserId;
					const showAvatar =
						index === 0 ||
						messages[index - 1].senderId !== message.senderId;

					return (
						<div
							key={message.id}
							className={`flex ${
								isCurrentUser ? 'justify-end' : 'justify-start'
							}`}
						>
							<div
								className={`flex items-end space-x-2 max-w-[70%] ${
									!isCurrentUser
										? 'flex-row'
										: 'flex-row-reverse'
								}`}
							>
								{!isCurrentUser && showAvatar && (
									<img
										src={
											chatUser?.photoURL ||
											'https://via.placeholder.com/32'
										}
										alt={chatUser?.displayName}
										className='w-8 h-8 rounded-full'
									/>
								)}
								<div
									className={`rounded-lg p-3 ${
										isCurrentUser
											? 'bg-purple-500 text-white'
											: 'bg-white text-gray-900'
									}`}
								>
									<p>{message.text}</p>
									<span className='text-xs opacity-75 mt-1 block'>
										{formatDistanceToNow(
											message.createdAt,
											{ addSuffix: true },
										)}
									</span>
								</div>
							</div>
						</div>
					);
				})}
				<div ref={messagesEndRef} />
			</div>

			{/* Error Message */}
			{error && (
				<div className='px-4 py-2 bg-red-100 text-red-600'>{error}</div>
			)}

			{/* Message Input */}
			<form
				onSubmit={handleSubmit}
				className='p-4 bg-white border-t'
			>
				<div className='flex items-center space-x-2'>
					<input
						type='text'
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder='Type a message...'
						className='flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500'
					/>
					<button
						type='submit'
						disabled={!newMessage.trim()}
						className='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChatWindow;
