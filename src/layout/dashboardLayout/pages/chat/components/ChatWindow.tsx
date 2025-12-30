import React, { memo, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../../hooks/hooks';
import { Chat, Message } from '../../../../../services/firebase/chats';
import { getUserData } from '../../../../../services/firebase/users';
import { formatMessageTime } from '../../../../../utils/dateUtils';

import {
    getImageLoadErrorHandler,
    getImmediateProfilePictureUrl,
} from '../../../../../utils/profilePicture';

interface ChatWindowProps {
	chat: Chat;
	messages: Message[];
	currentUserId: string | undefined;
	onSendMessage: (text: string) => void;
	error: string | null;
	isLoading?: boolean;
}

import { faPaperclip, faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MessageItem = memo(
	({
		message,
		isCurrentUser,
		messageUser,
        isFirstInGroup,
        isLastInGroup
	}: {
		message: Message;
		isCurrentUser: boolean;
		messageUser: any;
        isFirstInGroup: boolean;
        isLastInGroup: boolean;
	}) => (
		<div
			className={`flex w-full mb-1 ${
				isCurrentUser ? 'justify-end' : 'justify-start'
			} ${isFirstInGroup ? 'mt-4' : ''} message-enter`}
		>
			<div
				className={`flex ${
					isCurrentUser ? 'flex-row-reverse' : 'flex-row'
				} items-end max-w-[75%]`}
			>
                {/* Avatar Column */}
                <div className={`w-8 h-8 flex-shrink-0 ${isCurrentUser ? 'ml-2' : 'mr-2'}`}>
                    {isLastInGroup && (
                        <img
                            src={getImmediateProfilePictureUrl(
                                messageUser?.profilePicture,
                                messageUser?.name || 'User',
                            )}
                            alt={messageUser?.name || 'Unknown User'}
                            className='w-8 h-8 rounded-full object-cover shadow-sm'
                            onError={getImageLoadErrorHandler(
                                messageUser?.name || 'User',
                            )}
                        />
                    )}
                </div>

                {/* Message Bubble */}
				<div
					className={`px-4 py-2.5 shadow-sm relative group transition-all duration-200 ${
						isCurrentUser
							? 'message-bubble-gradient text-white'
							: 'bg-white text-gray-800 border-gray-100 border'
					} ${
                        /* Corner Logic */
                        isCurrentUser
                            ? `rounded-2xl ${
                                  !isLastInGroup ? 'rounded-br-sm' : ''
                              } ${!isFirstInGroup ? 'rounded-tr-sm' : ''}`
                            : `rounded-2xl ${
                                  !isLastInGroup ? 'rounded-bl-sm' : ''
                              } ${!isFirstInGroup ? 'rounded-tl-sm' : ''}`
                    }`}
				>
					<p className="text-[15px] leading-relaxed">{message.text}</p>
					<span
						className={`text-[10px] absolute bottom-1 ${
                            isCurrentUser ? 'right-3 text-white/70' : 'right-3 text-gray-400'
                        } opacity-0 group-hover:opacity-100 transition-opacity`}
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

    // Debugging alignment issue
    useEffect(() => {
        if (messages.length > 0) {
            console.log('ChatWindow Debug:', {
                currentUserId,
                sampleMessageSender: messages[messages.length - 1].senderId,
                match: messages[messages.length - 1].senderId === currentUserId
            });
        }
    }, [messages, currentUserId]);


// ... (inside component)
	const [fetchedOtherUser, setFetchedOtherUser] = useState<any | null>(null);
	const users = useAppSelector((state) => state.users.users);
    const authUser = useAppSelector((state) => state.auth.currentUser);

	const getUser = (userId: string) => {
        if (authUser && authUser.uid === userId) return authUser;
		const reduxUser = users.find((user) => user.uid === userId);
        if (reduxUser) return reduxUser;
        // If not in Redux, check if it's the fetched other user
        if (fetchedOtherUser && fetchedOtherUser.uid === userId) return fetchedOtherUser;
        return undefined;
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);
    
    // Effect to fetch missing other user
    useEffect(() => {
        const otherUserId = chat.participants.find((id) => id !== currentUserId);
        if (otherUserId && !users.find(u => u.uid === otherUserId)) {
            getUserData(otherUserId).then(data => {
                if (data) {
                    // Normalize UserData (displayName) to User (name) shape expected by component
                    setFetchedOtherUser({
                        ...data,
                        name: data.displayName || 'User',
                        profilePicture: data.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.displayName || 'User')}&background=886cc0&color=fff`,
                    });
                }
            });
        }
    }, [chat, users, currentUserId]);

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
						src={getImmediateProfilePictureUrl(
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
						{messages.map((message, index) => {
                            const isFirstInGroup = index === 0 || messages[index - 1].senderId !== message.senderId;
                            const isLastInGroup = index === messages.length - 1 || messages[index + 1].senderId !== message.senderId;
                            
                            return (
                                <MessageItem
                                    key={message.id}
                                    message={message}
                                    isCurrentUser={message.senderId === currentUserId}
                                    messageUser={getUser(message.senderId)}
                                    isFirstInGroup={isFirstInGroup}
                                    isLastInGroup={isLastInGroup}
                                />
                            );
                        })}
						<div ref={messagesEndRef} />
					</>
				)}
			</div>

			<form
				onSubmit={handleSubmit}
				className='p-4 bg-white/50 backdrop-blur-sm border-t border-gray-100'
				aria-label='Message form'
			>
				{error && (
					<p className='text-red-500 mb-2 text-sm text-center animate-pulse'>
						{error}
					</p>
				)}
				<div className='flex items-center space-x-3 max-w-4xl mx-auto'>
                    
                    {/* Attachments Button (Dummy) */}
                    <button type="button" className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                        <FontAwesomeIcon icon={faPaperclip} />
                    </button>

					<div className='flex-1 relative'>
                        <input
                            type='text'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder='Type a message...'
                            className='w-full pl-5 pr-12 py-3 bg-white border-0 ring-1 ring-gray-200 rounded-full focus:ring-2 focus:ring-purple-500/50 shadow-sm text-gray-700 placeholder-gray-400 transition-all'
                        />
                        <button 
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faSmile} />
                        </button>
                    </div>

					<button
						type='submit'
						disabled={!newMessage.trim()}
						className='w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-purple-500 text-white shadow-lg hover:shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none'
					>
						<FontAwesomeIcon icon={faPaperPlane} className="ml-0.5" />
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChatWindow;
