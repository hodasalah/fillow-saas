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
import { db } from '../../firebase';
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

// Subscribe to messages in a conversation
export const subscribeToMessages = (
	chatId: string,
	callback: (messages: Message[]) => void,
) => {
	const messagesRef = collection(db, 'conversations', chatId, 'messages');
	const q = query(messagesRef, orderBy('createdAt', 'asc'));

	return onSnapshot(q, (snapshot) => {
		const messages = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as Message[];
		callback(messages);
	});
};

// Get user's conversations
export const getUserChats = async (userId: string) => {
	const conversationsRef = collection(db, 'conversations');
	const q = query(
		conversationsRef,
		where('participants', 'array-contains', userId),
		orderBy('updatedAt', 'desc'),
	);

	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Chat[];
};

// Subscribe to user's conversations
export const subscribeToUserChats = (
	userId: string,
	callback: (chats: Chat[]) => void,
) => {
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
	});
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
