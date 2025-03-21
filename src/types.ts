import { Timestamp } from 'firebase/firestore';

// User
import { FieldValue } from 'firebase/firestore';

export interface User {
	uid: string;
	email: string;
	name: string;
	profilePicture: string;
	createdAt?: number | Timestamp | FieldValue;
	last_login?: number | Timestamp | FieldValue;
	role: string;
	projects: string[];
	tags: string[];
	preferences: {
		theme: string;
		language: string;
	};
	taskProgress: number;
	teams: string[];
	status: string;
	lastSeen?: number | Timestamp | FieldValue;
}
// Project
export type Project = {
	id: string;
	name: string;
	description: string;
	ownerId: string;
	teamId?: string;
	members: string[];
	createdAt: Date;
	status: string;
};

// Team
export type Team = {
	id: string;
	name: string;
	ownerId: string;
	members: string[];
	projects: string[];
};

// Message (for chat)
export type Message = {
	id: string;
	senderId: string;
	content: string;
	timestamp: Date;
};
export interface Task {
	id?: string;
	title: string;
	assignedTo: string[]; // User IDs
	status: 'todo' | 'in-progress' | 'done';
	dueDate: Date;
}
// src/types.ts
export interface InboxMessage {
	id?: string; // Firestore auto-ID
	senderId: string;
	subject: string;
	body: string;
	isRead: boolean;
	createdAt: Date;
}
export interface ChatMessage {
	id?: string;
	senderId: string;
	content: string;
	timestamp: Date;
}
