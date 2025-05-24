import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import {
	Chat,
	Message,
	getUserChats,
	sendMessage,
	subscribeToMessages,
} from '../../../../services/firebase/chats';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

const ChatPage: React.FC = () => {
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	const [chats, setChats] = useState<Chat[]>([]);
	const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [searchQuery, setSearchQuery] = useState('');

	// Fetch user's chats
	useEffect(() => {
		if (currentUser) {
			const loadChats = async () => {
				try {
					const userChats = await getUserChats(currentUser.uid);
					setChats(userChats);
				} catch (error) {
					console.error('Error loading chats:', error);
				}
			};
			loadChats();
		}
	}, [currentUser]);

	// Subscribe to messages when a chat is selected
	useEffect(() => {
		if (!selectedChat) return;

		const unsubscribe = subscribeToMessages(
			selectedChat.id,
			(newMessages) => {
				setMessages(newMessages);
			},
		);

		return () => unsubscribe();
	}, [selectedChat]);

	const handleSendMessage = async (text: string) => {
		if (!selectedChat || !currentUser) return;

		try {
			await sendMessage(selectedChat.id, currentUser.uid, text);
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	const filteredChats = chats.filter((chat) =>
		chat.lastMessage?.text
			.toLowerCase()
			.includes(searchQuery.toLowerCase()),
	);

	return (
		<div className='flex h-[calc(100vh-64px)]'>
			{/* Left Sidebar - Chat List */}
			<div className='w-80 border-r border-gray-200 bg-white'>
				<div className='p-4'>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search messages...'
							className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<span className='absolute left-3 top-2.5 text-gray-400'>
							🔍
						</span>
					</div>
					<div className='mt-4 flex items-center justify-between'>
						<h2 className='text-xl font-semibold text-gray-800'>
							Messages
						</h2>
						<button className='p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200'>
							✏️
						</button>
					</div>
				</div>

				<ChatList
					chats={filteredChats}
					selectedChat={selectedChat}
					onSelectChat={setSelectedChat}
					currentUserId={currentUser?.uid}
				/>
			</div>

			{/* Right Side - Chat Window */}
			<div className='flex-1 bg-gray-50'>
				{selectedChat ? (
					<ChatWindow
						chat={selectedChat}
						messages={messages}
						currentUserId={currentUser?.uid}
						onSendMessage={handleSendMessage}
					/>
				) : (
					<div className='h-full flex items-center justify-center text-gray-500'>
						Select a chat to start messaging
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatPage;
