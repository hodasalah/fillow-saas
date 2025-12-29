import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    Chat,
    Message,
    getChat,
    getUserChats,
    initializeChatCollection,
    seedDefaultChats,
    sendMessage,
    subscribeToMessages
} from '../../../../services/firebase/chats';
import { UserData, getAllUsers } from '../../../../services/firebase/users';
import { fetchUsers } from '../../../../utils/fetchUsers';
import {
    getImageLoadErrorHandler,
    getImmediateProfilePictureUrl
} from '../../../../utils/profilePicture';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

const ChatPage: React.FC = () => {
    const location = useLocation();
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
	const [chats, setChats] = useState<Chat[]>([]);
	const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [chatListError, setChatListError] = useState<string | null>(null);
    const [sendError, setSendError] = useState<string | null>(null);
	const [showNewChatModal, setShowNewChatModal] = useState(false);
	const [availableUsers, setAvailableUsers] = useState<UserData[]>([]);

	// Fetch user's chats
	useEffect(() => {
		if (currentUser) {
            dispatch(fetchUsers()); // Ensure we have the user directory loaded
			const loadChats = async () => {
				setIsLoading(true);
				setChatListError(null);
				try {
					let userChats = await getUserChats(currentUser.uid);
                    
                    // Auto-Seed chats in Firebase if none exist (so the list isn't empty for new users)
                    if (userChats.length === 0) {
                        try {
                            await seedDefaultChats(currentUser.uid);
                            // Re-fetch after seeding
                            userChats = await getUserChats(currentUser.uid);
                        } catch (seedErr) {
                            console.warn("Seeding failed, proceeding with empty list:", seedErr);
                        }
                    }

					setChats(userChats);
				} catch (error) {
					console.error('Error loading chats:', error);
					setChatListError('Failed to load chats. Please try again later.');
				} finally {
					setIsLoading(false);
				}
			};
			loadChats();
		}
	}, [currentUser, dispatch]);

     // Check for navigation state (from sidebar click)
    useEffect(() => {
        const state = location.state as { chatId?: string; recruitUser?: { otherUserId: string } };
        if (state?.chatId) {
            const existingChat = chats.find(c => c.id === state.chatId);
            if (existingChat) {
                setSelectedChat(existingChat);
                window.history.replaceState({}, document.title);
            } else {
                // Chat not in current list (maybe new, or list is fallback). 
                // Try to resolve it.
                const resolveChat = async () => {
                     let newChat: Chat | null = null;
                     
                     // 1. Try fetching from DB
                     try {
                         newChat = await getChat(state.chatId!);
                     } catch (e) {
                         console.warn("Could not fetch individual chat:", e);
                     }

                     // 2. If not found, try optimistic construction if we have user details
                     if (!newChat && state.recruitUser && state.recruitUser.otherUserId && currentUser) {
                         console.log("Constructing optimistic chat for", state.recruitUser.otherUserId);
                         const recruitId = state.recruitUser.otherUserId;
                         newChat = {
                             id: state.chatId!,
                             participants: [currentUser.uid, recruitId],
                             createdAt: new Date(),
                             updatedAt: new Date(),
                             lastMessage: {
                                 id: 'optimistic_init',
                                 text: 'Start of conversation',
                                 senderId: currentUser.uid,
                                 createdAt: new Date(),
                                 read: true
                             }
                         };
                     }

                     if (newChat) {
                         setChats(prev => {
                             // dedupe just in case
                             if (prev.find(c => c.id === newChat!.id)) return prev;
                             return [newChat!, ...prev];
                         });
                         setSelectedChat(newChat);
                     }
                };
                resolveChat();
            }
        }
    }, [location.state, chats]);

	// Load available users for new chat
	useEffect(() => {
		const loadUsers = async () => {
			try {
				const users = await getAllUsers();
				// Filter out current user and users already in chats
				const availableUsers = users.filter(
					(user) => user.uid !== currentUser?.uid,
				);
				setAvailableUsers(availableUsers);
			} catch (error) {
				console.error('Error loading users:', error);
			}
		};
		if (showNewChatModal) {
			loadUsers();
		}
	}, [showNewChatModal, currentUser?.uid]);

	// Subscribe to messages when a chat is selected
	useEffect(() => {
		if (!selectedChat) return;

		setMessages([]); // Clear messages when switching chats
		setSendError(null);

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
            // Optimistic update if needed, but subscription handles it mostly.
		} catch (error) {
			console.error('Error sending message:', error);
			setSendError('Failed to send message. Please try again.');
		}
	};

	const handleStartNewChat = async (otherUserId: string) => {
		if (!currentUser) return;

		try {
			setChatListError(null);
			setIsLoading(true);
			const chatId = await initializeChatCollection(
				currentUser.uid,
				otherUserId,
			);
			const userChats = await getUserChats(currentUser.uid);
			setChats(userChats);
			const newChat = userChats.find((chat) => chat.id === chatId);
			if (newChat) {
				setSelectedChat(newChat);
			}
			setShowNewChatModal(false);
		} catch (error) {
			console.error('Error starting new chat:', error);
			setChatListError('Failed to start new chat. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const filteredChats = chats.filter((chat) =>
		chat.lastMessage?.text
			.toLowerCase()
			.includes(searchQuery.toLowerCase()),
	);

	if (!currentUser) {
		return (
			<div className='flex items-center justify-center h-full'>
				<p className='text-gray-500'>Please log in to access chat.</p>
			</div>
		);
	}

	return (
		<div
			className={`flex h-[calc(100vh-4.5rem)] pt-[4.5rem] ${
				isMobileView
					? 'ml-0'
					: mode === 'wide'
					? 'ml-[16.5rem]'
					: 'ml-[6rem]'
			} transition-all duration-300`}
		>
			{/* Left Sidebar - Chat List */}
			<div className='w-80 border-r border-gray-200 bg-white rounded-tl-xl flex flex-col '>
				<div className='p-4 border-b border-gray-200'>
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
						<button
							onClick={() => setShowNewChatModal(true)}
							className='p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200'
						>
							✏️
						</button>
					</div>
				</div>

				<div className='flex-1 overflow-y-auto'>
					{isLoading ? (
						<div className='flex items-center justify-center p-4'>
							<p className='text-gray-500'>Loading chats...</p>
						</div>
					) : chatListError ? (
						<div className='flex items-center justify-center p-4'>
							<p className='text-red-500'>{chatListError}</p>
						</div>
					) : (
						<ChatList
							chats={filteredChats}
							selectedChat={selectedChat}
							onSelectChat={setSelectedChat}
							currentUserId={currentUser?.uid}
						/>
					)}
				</div>
			</div>

			{/* Right Side - Chat Window */}
			<div className='flex-1 bg-gray-50 rounded-tr-xl flex flex-col h-full'>
				{selectedChat ? (
					<ChatWindow
						chat={selectedChat}
						messages={messages}
						currentUserId={currentUser?.uid}
						onSendMessage={handleSendMessage}
						error={sendError}
					/>
				) : (
					<div className='h-full flex items-center justify-center text-gray-500'>
						Select a chat to start messaging
					</div>
				)}
			</div>

			{/* New Chat Modal */}
			{showNewChatModal && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 w-96 max-h-[80vh] flex flex-col'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-lg font-semibold'>
								Start New Chat
							</h3>
							<button
								onClick={() => setShowNewChatModal(false)}
								className='text-gray-500 hover:text-gray-700'
							>
								✕
							</button>
						</div>
						<div className='flex-1 overflow-y-auto'>
							{availableUsers.map((user) => (
								<button
									key={user.uid}
									onClick={() => handleStartNewChat(user.uid)}
									className='w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-center space-x-3'
								>
									<img
										src={getImmediateProfilePictureUrl(
											user.photoURL,
											user.displayName,
										)}
										alt={user.displayName}
										className='w-10 h-10 rounded-full object-cover'
										onError={getImageLoadErrorHandler(
											user.displayName,
										)}
									/>
									<div>
										<p className='font-medium'>
											{user.displayName}
										</p>
										<p className='text-sm text-gray-500'>
											{user.email}
										</p>
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatPage;
