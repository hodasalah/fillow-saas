// Cache for generated avatar URLs
const avatarCache = new Map<string, string>();
const loadingPromises = new Map<string, Promise<string>>();

/**
 * Pre-load an image and cache its URL
 * @param url The URL to preload
 * @returns A promise that resolves with the URL once loaded
 */
const preloadImage = (url: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(url);
		img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
		img.src = url;
	});
};

/**
 * Generate initials for a display name
 * @param displayName The display name to generate initials from
 * @returns The generated initials
 */
const generateInitials = (displayName?: string): string => {
	if (!displayName) return '?';
	return displayName
		.split(' ')
		.map((name) => name[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
};

/**
 * Get the URL for a user's profile picture, with a fallback to a default avatar
 * @param photoURL The user's photo URL
 * @param displayName The user's display name (used for generating initials)
 * @returns The URL to use for the profile picture
 */
export const getProfilePictureUrl = async (
	photoURL?: string,
	displayName?: string,
): Promise<string> => {
	// Generate a cache key
	const cacheKey = photoURL || displayName || 'anonymous';

	// Check if we have a cached URL
	if (avatarCache.has(cacheKey)) {
		return avatarCache.get(cacheKey)!;
	}

	// Check if we're already loading this URL
	if (loadingPromises.has(cacheKey)) {
		return loadingPromises.get(cacheKey)!;
	}

	// If we have a photo URL, try to load it
	if (photoURL && photoURL.trim() !== '') {
		const loadPromise = preloadImage(photoURL)
			.then((url) => {
				avatarCache.set(cacheKey, url);
				loadingPromises.delete(cacheKey);
				return url;
			})
			.catch(() => {
				// If loading fails, fall back to generated avatar
				const fallbackUrl = generateAvatarUrl(displayName);
				avatarCache.set(cacheKey, fallbackUrl);
				loadingPromises.delete(cacheKey);
				return fallbackUrl;
			});

		loadingPromises.set(cacheKey, loadPromise);
		return loadPromise;
	}

	// Generate and cache avatar URL
	const avatarUrl = generateAvatarUrl(displayName);
	avatarCache.set(cacheKey, avatarUrl);
	return avatarUrl;
};

/**
 * Generate a deterministic avatar URL for a display name
 * @param displayName The display name to generate an avatar for
 * @returns The generated avatar URL
 */
const generateAvatarUrl = (displayName?: string): string => {
	const initials = generateInitials(displayName);
	return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=6366f1`;
};

/**
 * Get a synchronous URL for immediate display while the actual URL is loading
 * @param photoURL The user's photo URL
 * @param displayName The user's display name
 * @returns An immediately available URL
 */
export const getImmediateProfilePictureUrl = (
	photoURL?: string,
	displayName?: string,
): string => {
	const cacheKey = photoURL || displayName || 'anonymous';
	return avatarCache.get(cacheKey) || generateAvatarUrl(displayName);
};

/**
 * Get an error handler for image loading failures
 * @param displayName The user's display name
 * @returns An error handler function
 */
export const getImageLoadErrorHandler = (displayName?: string) => {
	let retryCount = 0;
	const MAX_RETRIES = 1;

	return async (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const img = event.target as HTMLImageElement;

		// If we've already retried, or if we're showing a fallback avatar, don't retry
		if (retryCount >= MAX_RETRIES || img.src.includes('dicebear.com')) {
			return;
		}

		retryCount++;
		const fallbackUrl = await getProfilePictureUrl(undefined, displayName);
		img.src = fallbackUrl;
	};
};
