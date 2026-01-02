export interface TabConfig {
	id: string;
	label: string;
}
// User

export interface User {
	uid: string;
	email: string;
	name: string;
	profilePicture: string;
	createdAt?: string | number; // Change to Date or number
	last_login?: string | number; // Change to Date or number
	role: 'admin' | 'employee' | 'client' | 'user';
	title?: string;
	bio?: string;
	phone?: string;
	projects: string[];
	tags: string[];
	preferences: {
		theme: string;
		language: string;
	};
	taskProgress: number;
	teams: string[];
	status: string;
	lastSeen?: string | number; // Change to Date or number
}
export interface Tag {
	name: string;
	color: string;
	background: string;
}

// Project
export interface Project {
	id: string;
	name: string;
	description: string;
	ownerId: string;
	teamId?: string;
	members: string[];
	status: string;
	client: {
		name: string;
		image: string;
		id: string;
	};
	personInCharge: {
		name: string;
		image: string;
		id: string;
	};
	startDate: Date;
	endDate?: Date | null;
	deadline: Date;
	tags: Tag[];
}

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
