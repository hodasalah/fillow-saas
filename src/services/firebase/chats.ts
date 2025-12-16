import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
    writeBatch,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { UserData } from './users';

export interface Message {
	id: string;
	text: string;
	senderId: string;
	createdAt: Date;
	read: boolean;
}

export interface Chat {
	id: string;
	participants: string[];
	lastMessage?: Message;
	createdAt: Date;
	updatedAt: Date;
}

// Initialize conversation collection
export const initializeChatCollection = async (
	currentUserId: string,
	otherUserId: string,
) => {
	try {
		// Check if a conversation already exists between these users
		const conversationsRef = collection(db, 'conversations');
		const q = query(
			conversationsRef,
			where('participants', 'array-contains', currentUserId),
		);
		const querySnapshot = await getDocs(q);

		let existingChat: Chat | null = null;
		querySnapshot.forEach((doc) => {
			const chatData = doc.data();
			if (chatData.participants.includes(otherUserId)) {
				existingChat = { id: doc.id, ...chatData } as Chat;
			}
		});

		if (existingChat) {
			console.log('Conversation already exists:', existingChat.id);
			return existingChat.id;
		}

		// Create a new conversation
		const chatRef = await addDoc(collection(db, 'conversations'), {
			participants: [currentUserId, otherUserId],
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});

		// Add initial message
		const messageRef = await addDoc(
			collection(db, 'conversations', chatRef.id, 'messages'),
			{
				text: 'Chat started',
				senderId: currentUserId,
				createdAt: serverTimestamp(),
				read: false,
			},
		);

		// Update the conversation with the last message
		await updateDoc(doc(db, 'conversations', chatRef.id), {
			lastMessage: {
				id: messageRef.id,
				text: 'Chat started',
				senderId: currentUserId,
				createdAt: new Date(),
				read: false,
			},
		});

		console.log('Created new conversation:', chatRef.id);
		return chatRef.id;
	} catch (error) {
		console.error('Error initializing conversation:', error);
		throw error;
	}
};

// Seed Default Chats for Demo
export const seedDefaultChats = async (currentUserId: string) => {
    try {
        console.log("Seeding default conversations for demo...");
        // Ensure chats exist for the default mock users (user_1, user_2)
        // This ensures the "Recent Chats" list is populated in Firebase
        await initializeChatCollection(currentUserId, 'user_1');
        await initializeChatCollection(currentUserId, 'user_2');
        console.log("Default conversations seeded.");
    } catch (error) {
        console.warn("Failed to seed default chats:", error);
    }
};

// Create a new conversation
export const createChat = async (participants: string[]) => {
	try {
		const chatRef = await addDoc(collection(db, 'conversations'), {
			participants,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});

		return chatRef.id;
	} catch (error) {
		console.error('Error creating conversation:', error);
		throw error;
	}
};

// Send a message in a conversation
export const sendMessage = async (
	chatId: string,
	senderId: string,
	text: string,
) => {
	try {
		const messageRef = await addDoc(
			collection(db, 'conversations', chatId, 'messages'),
			{
				text,
				senderId,
				createdAt: serverTimestamp(),
				read: false,
			},
		);

		// Update the conversation's last message and timestamp
		const chatRef = doc(db, 'conversations', chatId);
		await updateDoc(chatRef, {
			lastMessage: {
				id: messageRef.id,
				text,
				senderId,
				createdAt: new Date(),
				read: false,
			},
			updatedAt: serverTimestamp(),
		});

		return messageRef.id;
	} catch (error) {
		console.error('Error sending message:', error);
		throw error;
	}
};

// Mock Data for Fallback
const MOCK_CHATS: Chat[] = [
    {
        id: 'mock_chat_1',
        participants: ['local', 'mock_user_1'],
        lastMessage: {
            id: 'msg_1',
            text: 'Hey, how is the project going?',
            senderId: 'mock_user_1',
            createdAt: new Date(),
            read: false,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
     {
        id: 'mock_chat_2',
        participants: ['local', 'mock_user_2'],
        lastMessage: {
            id: 'msg_2',
            text: 'Can we meet tomorrow?',
            senderId: 'local',
            createdAt: new Date(),
            read: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
    'mock_chat_1': [
        { id: 'm1', text: 'Hi there!', senderId: 'local', createdAt: new Date(Date.now() - 10000), read: true },
        { id: 'm2', text: 'Hey, how is the project going?', senderId: 'mock_user_1', createdAt: new Date(), read: false }
    ],
    'mock_chat_2': [
         { id: 'm3', text: 'Can we meet tomorrow?', senderId: 'local', createdAt: new Date(), read: true }
    ]
};

// Subscribe to messages in a conversation
export const subscribeToMessages = (
	chatId: string,
	callback: (messages: Message[]) => void,
) => {
     // fallback auth check
    const currentUserId = auth.currentUser?.uid || 'local';

    try {
        const messagesRef = collection(db, 'conversations', chatId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        return onSnapshot(q, async (snapshot) => {
            const messages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Message[];
            
            // Auto-Seed: If no messages exist in DB, fetch from API and save them.
            if (messages.length === 0) {
                 // Use a session storage flag to prevent infinite loops if write fails
                 const seededKey = `seeded_${chatId}`;
                 if (!sessionStorage.getItem(seededKey)) {
                     console.log(`Chat ${chatId} is empty. Auto-seeding from API...`);
                     sessionStorage.setItem(seededKey, 'true');

                     try {
                        const skip = chatId === 'mock_chat_2' ? 10 : 0;
                        const response = await fetch(`https://dummyjson.com/comments?limit=10&skip=${skip}`);
                        const data = await response.json();
                        
                        const otherUserId = chatId === 'mock_chat_2' ? 'user_2' : 'user_1';
                        // currentUserId is defined in scope above
                        
                        const batch = writeBatch(db);
                        
                        data.comments.forEach((comment: any, index: number) => {
                            const isMe = index % 2 !== 0; // consistent with fallback
                            const msgData = {
                                text: comment.body,
                                senderId: isMe ? currentUserId : otherUserId,
                                createdAt: new Date(Date.now() - (10 - index) * 60000), 
                                read: true
                            };
                            
                            // Create a ref with a generated ID (or use comment.id)
                            const newMsgRef = doc(collection(db, 'conversations', chatId, 'messages'));
                            batch.set(newMsgRef, msgData);
                        });

                        await batch.commit();
                        console.log(`Successfully seeded ${data.comments.length} messages to ${chatId}`);
                        // The snapshot listener will automatically fire again with the new data!
                     } catch (seedError) {
                         console.warn("Failed to auto-seed messages (likely permission error):", seedError);
                         // Fallback to in-memory display if write failed? 
                         // No, if write failed, we probably can't see them anyway. 
                         // But the Error Callback handles the "Complete Block" case.
                         // This block handles the "Read OK, Write Fail" or "Read OK, Empty" case.
                     }
                 }
            }

            callback(messages);
        }, async (error) => {
            console.warn("Error subscribing messages, falling back to External API (dummyjson.com):", error);
            
            try {
                 const skip = chatId === 'mock_chat_2' ? 10 : 0;
                 const response = await fetch(`https://dummyjson.com/comments?limit=10&skip=${skip}`);
                 const data = await response.json();
                 
                 const otherUserId = chatId === 'mock_chat_2' ? 'user_2' : 'user_1';
                 
                 const apiMessages: Message[] = data.comments.map((comment: any, index: number) => {
                    // Alternate senders: Even index = other user, Odd index = me (local)
                    // We flip this: Index 0, 2, 4 = Other User. Index 1, 3, 5 = Me.
                    // Actually, let's mix it up.
                    const isMe = index % 2 !== 0;
                    
                    return {
                        id: comment.id.toString(),
                        text: comment.body,
                        senderId: isMe ? currentUserId : otherUserId,
                        createdAt: new Date(Date.now() - (10 - index) * 60000), 
                        read: true
                    } as Message;
                 });
                 
                 callback(apiMessages);

            } catch (err) {
                 console.error("External Message API failed, using static mock:", err);
                 // Fix static mock to use currentUserId too if possible, or just fallback
                 callback([]); 
            }
        });
    } catch (e) {
         console.warn("Error setting up message listener, using mock:", e);
         callback([]);
         return () => {};
    }
};

// Get user's conversations
export const getUserChats = async (userId: string) => {
    try {
        const conversationsRef = collection(db, 'conversations');
        const q = query(
            conversationsRef,
            where('participants', 'array-contains', userId),
            orderBy('updatedAt', 'desc'),
        );

        const snapshot = await getDocs(q);
        
        // If empty or if we are the 'local' user (which implies forced fallback or simple dev mode)
        // We also check if we are in the "blocked permission" state by assuming if snapshot is empty but we wanted results...
        // Actually, explicit error catch handles the block. 
        // But if DB is just empty, we want mocks too.
        if (snapshot.empty) {
             // Generate Dynamic Mock Chats based on the REAL userId
             const dynamicMocks: Chat[] = [
                {
                    id: 'mock_chat_1',
                    participants: [userId, 'user_1'], // ME and User 1
                    lastMessage: {
                        id: 'msg_1',
                        text: 'Hey, how is the project going?',
                        senderId: 'user_1',
                        createdAt: new Date(),
                        read: false,
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'mock_chat_2',
                    participants: [userId, 'user_2'], // ME and User 2
                    lastMessage: {
                        id: 'msg_2',
                        text: 'Can we meet tomorrow?',
                        senderId: userId,
                        createdAt: new Date(),
                        read: true,
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
             ];
             return dynamicMocks;
        }

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Chat[];
    } catch (error) {
        console.warn('Error fetching chats from Firebase, using dynamic mock:', error);
         const dynamicMocks: Chat[] = [
            {
                id: 'mock_chat_1',
                participants: [userId, 'user_1'], 
                lastMessage: {
                    id: 'msg_1',
                    text: 'Hey, how is the project going?',
                    senderId: 'user_1',
                    createdAt: new Date(),
                    read: false,
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'mock_chat_2',
                participants: [userId, 'user_2'],
                lastMessage: {
                    id: 'msg_2',
                    text: 'Can we meet tomorrow?',
                    senderId: userId,
                    createdAt: new Date(),
                    read: true,
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            },
         ];
        return dynamicMocks;
    }
};

// Subscribe to user's conversations
export const subscribeToUserChats = (
	userId: string,
	callback: (chats: Chat[]) => void,
) => {
    try {
        const conversationsRef = collection(db, 'conversations');
        const q = query(
            conversationsRef,
            where('participants', 'array-contains', userId),
            orderBy('updatedAt', 'desc'),
        );

        return onSnapshot(q, (snapshot) => {
            const chats = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Chat[];
            callback(chats);
        }, (error) => {
             console.warn("Error subscribing chats, using mock:", error);
             // Return same dynamic mocks for subscription fallback
             const dynamicMocks: Chat[] = [
                {
                    id: 'mock_chat_1',
                    participants: [userId, 'user_1'], 
                    lastMessage: {
                        id: 'msg_1',
                        text: 'Hey, how is the project going?',
                        senderId: 'user_1',
                        createdAt: new Date(),
                        read: false,
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'mock_chat_2',
                    participants: [userId, 'user_2'],
                    lastMessage: {
                        id: 'msg_2',
                        text: 'Can we meet tomorrow?',
                        senderId: userId,
                        createdAt: new Date(),
                        read: true,
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
             ];
             callback(dynamicMocks);
        });
    } catch (e) {
        console.warn("Error setting up chat listener, using mock:", e);
        // callback([]); // Don't return empty, it might flash
        return () => {};
    }
};

// Mark messages as read
export const markMessagesAsRead = async (
	chatId: string,
	messageIds: string[],
) => {
	const batch = writeBatch(db);

	messageIds.forEach((messageId) => {
		const messageRef = doc(
			db,
			'conversations',
			chatId,
			'messages',
			messageId,
		);
		batch.update(messageRef, { read: true });
	});

	await batch.commit();
};

// Get conversation participants' data
export const getChatParticipants = async (
	chatId: string,
): Promise<UserData[]> => {
	const chatRef = doc(db, 'conversations', chatId);
	const chatSnap = await getDoc(chatRef);

	if (!chatSnap.exists()) {
		throw new Error('Conversation not found');
	}

	const chat = chatSnap.data() as Chat;
	const participantsPromises = chat.participants.map((uid) => {
		const userRef = doc(db, 'users', uid);
		return getDoc(userRef);
	});

	const participantsSnaps = await Promise.all(participantsPromises);
	return participantsSnaps
		.filter((snap) => snap.exists())
		.map((snap) => snap.data() as UserData);
};

// Get single chat by ID
export const getChat = async (chatId: string): Promise<Chat | null> => {
    try {
        const chatRef = doc(db, 'conversations', chatId);
        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
            return { id: chatSnap.id, ...chatSnap.data() } as Chat;
        }
        return null;
    } catch (error) {
        console.warn(`Error fetching specific chat ${chatId}:`, error);
        return null;
    }
};
