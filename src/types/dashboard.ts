import { Project } from '../types';

export interface Message {
	id: string;
	sender: {
		name: string;
		avatar: string;
	};
	content: string;
	timestamp: Date;
	isRead: boolean;
}

export interface Email {
	id: string;
	name: string;
	title: string;
	body: string;
	profileImage?: string;
	files: Array<{
		type: 'image' | 'file';
		name: string;
	}>;
	pinned?: boolean;
	sender: {
		name: string;
		avatar: string;
	};
	subject: string;
	content: string;
	timestamp: Date;
	category: 'primary' | 'social' | 'promotions' | 'updates';
	isRead: boolean;
}

export interface Statistics {
	total: number;
	ongoing: number;
	unfinished: number;
	chartData: Array<{
		name: string;
		value: number;
	}>;
	userId: string;
}

export interface DashboardData {
	messages: Message[];
	emails: Email[];
	projects: Project[];
	statistics: Statistics;
}
