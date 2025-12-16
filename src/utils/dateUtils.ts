// Helper to convert Firestore Timestamp to Date
const toDate = (date: any): Date => {
	// If it's already a Date, return it
	if (date instanceof Date) {
		return date;
	}
	// If it's a Firestore Timestamp, convert it
	if (date && typeof date.toDate === 'function') {
		return date.toDate();
	}
	// If it's a number (timestamp in ms), convert it
	if (typeof date === 'number') {
		return new Date(date);
	}
	// Fallback to current date
	return new Date();
};

// Format a date to a relative time string (e.g., "2 hours ago", "just now", etc.)
export const formatRelativeTime = (date: Date | any): string => {
	const dateObj = toDate(date);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return 'just now';
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes}m ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours}h ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) {
		return `${diffInDays}d ago`;
	}

	// For older messages, return the actual date
	return dateObj.toLocaleDateString();
};

// Format a timestamp for chat list and messages
export const formatTimestamp = (date: Date | any): string => {
	const dateObj = toDate(date);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

	// Less than a minute ago
	if (diffInSeconds < 60) {
		return 'now';
	}

	// Less than an hour ago
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes}m`;
	}

	// Less than 24 hours ago
	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours}h`;
	}

	// If it's this year, show date without year
	if (now.getFullYear() === dateObj.getFullYear()) {
		return dateObj.toLocaleDateString(undefined, {
			month: 'short',
			day: 'numeric',
		});
	}

	// If it's a different year, include the year
	return dateObj.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};

// Format a date for chat messages
export const formatMessageTime = (date: Date | any): string => {
	const dateObj = toDate(date);
	const now = new Date();
	const isToday = now.toDateString() === dateObj.toDateString();

	if (isToday) {
		return dateObj.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	const isThisYear = now.getFullYear() === dateObj.getFullYear();
	if (isThisYear) {
		return dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
	}

	return dateObj.toLocaleDateString([], {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};

// Format a date to show full date and time
export const formatDateTime = (date: Date | any): string => {
	const dateObj = toDate(date);
	return dateObj.toLocaleString([], {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

// Check if a date is today
export const isToday = (date: Date | any): boolean => {
	const dateObj = toDate(date);
	const today = new Date();
	return dateObj.toDateString() === today.toDateString();
};

// Check if a date is within the last 7 days
export const isWithinLastWeek = (date: Date | any): boolean => {
	const dateObj = toDate(date);
	const now = new Date();
	const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	return dateObj > weekAgo;
};
