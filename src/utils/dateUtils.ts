// Format a date to a relative time string (e.g., "2 hours ago", "just now", etc.)
export const formatRelativeTime = (date: Date): string => {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

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
	return date.toLocaleDateString();
};

// Format a timestamp for chat list and messages
export const formatTimestamp = (date: Date): string => {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

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
	if (now.getFullYear() === date.getFullYear()) {
		return date.toLocaleDateString(undefined, {
			month: 'short',
			day: 'numeric',
		});
	}

	// If it's a different year, include the year
	return date.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};

// Format a date for chat messages
export const formatMessageTime = (date: Date): string => {
	const now = new Date();
	const isToday = now.toDateString() === date.toDateString();

	if (isToday) {
		return date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	const isThisYear = now.getFullYear() === date.getFullYear();
	if (isThisYear) {
		return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
	}

	return date.toLocaleDateString([], {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};

// Format a date to show full date and time
export const formatDateTime = (date: Date): string => {
	return date.toLocaleString([], {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

// Check if a date is today
export const isToday = (date: Date): boolean => {
	const today = new Date();
	return date.toDateString() === today.toDateString();
};

// Check if a date is within the last 7 days
export const isWithinLastWeek = (date: Date): boolean => {
	const now = new Date();
	const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	return date > weekAgo;
};
