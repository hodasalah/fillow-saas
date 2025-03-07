import { Timestamp } from 'firebase/firestore';

// User
export type User = {
	uid: string;
	name: string;
	email: string;
	profilePicture: string;
	role: 'admin' | 'member';
  createdAt?: Timestamp | number;
	teams: string[];
	projects: string[];
	status: 'online' | 'offline';
	lastSeen: Date;
};

// Project
export type Project = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  teamId?: string;
  members: string[];
  createdAt: Date;
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
  status: "todo" | "in-progress" | "done";
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