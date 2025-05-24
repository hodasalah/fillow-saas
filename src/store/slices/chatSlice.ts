import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	addDoc,
	collection,
	getDocs,
	serverTimestamp,
	Timestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';

export interface ChatUser {
	id: string;
	name: string;
	email: string;
	photoURL: string | null;
}

export interface Message {
	id: string;
	text: string;
	senderId: string;
	receiverId: string;
	timestamp: Timestamp;
	participants: string[];
}

interface SendMessageParams {
	text: string;
	senderId: string;
	receiverId: string;
}

interface ChatState {
	users: ChatUser[];
	selectedUser: ChatUser | null;
	messages: Message[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export const fetchUsers = createAsyncThunk<ChatUser[]>(
	'chat/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			const usersCollection = collection(db, 'users');
			const snapshot = await getDocs(usersCollection);
			return snapshot.docs.map(
				(doc) =>
					({
						id: doc.id,
						...doc.data(),
					} as ChatUser),
			);
		} catch (error) {
			return rejectWithValue(
				error instanceof Error
					? error.message
					: 'An unknown error occurred',
			);
		}
	},
);

export const sendMessage = createAsyncThunk<void, SendMessageParams>(
	'chat/sendMessage',
	async ({ text, senderId, receiverId }, { rejectWithValue }) => {
		try {
			const messagesCollection = collection(db, 'messages');
			await addDoc(messagesCollection, {
				text,
				senderId,
				receiverId,
				participants: [senderId, receiverId],
				timestamp: serverTimestamp(),
			});
		} catch (error) {
			return rejectWithValue(
				error instanceof Error
					? error.message
					: 'An unknown error occurred',
			);
		}
	},
);

const initialState: ChatState = {
	users: [],
	selectedUser: null,
	messages: [],
	status: 'idle',
	error: null,
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		selectUser(state, action: PayloadAction<ChatUser>) {
			state.selectedUser = action.payload;
		},
		setMessages(state, action: PayloadAction<Message[]>) {
			state.messages = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	},
});

export const { selectUser, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
