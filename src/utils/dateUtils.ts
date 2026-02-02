// Helper to convert Firestore Timestamp to Date
export const toDate = (date: Date | number | { toDate: () => Date } | null | undefined): Date => {
	// If it's already a Date, return it
	if (date instanceof Date) {
		return date;
	}
	// If it's a Firestore Timestamp, convert it
	if (date && typeof date === 'object' && 'toDate' in date && typeof (date as { toDate: () => Date }).toDate === 'function') {
		return (date as { toDate: () => Date }).toDate();
	}
	// If it's a number (timestamp in ms), convert it
	if (typeof date === 'number') {
		return new Date(date);
	}
	// Fallback to current date
	return new Date();
};

// Format a date to a relative time string (e.g., "2 hours ago", "just now", etc.)
export const formatRelativeTime = (date: Date | number | { toDate: () => Date } | null | undefined): string => {
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
export const formatTimestamp = (date: Date | number | { toDate: () => Date } | null | undefined): string => {
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
export const formatMessageTime = (date: Date | number | { toDate: () => Date } | null | undefined): string => {
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
export const formatDateTime = (date: Date | number | { toDate: () => Date } | null | undefined): string => {
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
export const isToday = (date: Date | number | { toDate: () => Date } | null | undefined): boolean => {
	const dateObj = toDate(date);
	const today = new Date();
	return dateObj.toDateString() === today.toDateString();
};

// Check if a date is within the last 7 days
export const isWithinLastWeek = (date: Date | number | { toDate: () => Date } | null | undefined): boolean => {
	const dateObj = toDate(date);
	const now = new Date();
	const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	return dateObj > weekAgo;
};

/**
 * Recursively converts Dates and Firestore Timestamps to numeric timestamps (ms).
 * This ensures data dispatched to Redux is serializable.
 */
export const makeSerializable = <T>(obj: T): T => {
	if (obj === null || obj === undefined) {
		return obj;
	}

	// Handle Date objects
	if (obj instanceof Date) {
		return obj.getTime() as any;
	}

	// Handle Firestore Timestamps
	if (typeof obj === 'object' && 'toDate' in obj && typeof (obj as any).toDate === 'function') {
		return (obj as any).toDate().getTime() as any;
	}

	// Handle Arrays
	if (Array.isArray(obj)) {
		return obj.map((item) => makeSerializable(item)) as any;
	}

	// Handle Objects
	if (typeof obj === 'object') {
		const newObj: any = {};
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				newObj[key] = makeSerializable((obj as any)[key]);
			}
		}
		return newObj as T;
	}

	return obj;
};
