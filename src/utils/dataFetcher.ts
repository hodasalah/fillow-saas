type Subscriber<T> = (data: T) => void;

class DataFetcher {
    private cache: Map<string, any> = new Map();
    private subscribers: Map<string, Set<Subscriber<any>>> = new Map();

    async fetch<T>(
        key: string,
        fetcher: () => Promise<T>,
        skipCache = false
    ): Promise<T> {
        if (!skipCache && this.cache.has(key)) {
            return this.cache.get(key) as T;
        }

        try {
            const data = await fetcher();
            this.cache.set(key, data);
            this.notify(key, data);
            return data;
        } catch (error) {
            throw error;
        }
    }

    subscribe<T>(key: string, callback: Subscriber<T>): () => void {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, new Set());
        }

        const subscribers = this.subscribers.get(key)!;
        subscribers.add(callback);

        // If we have data, immediately call the callback
        if (this.cache.has(key)) {
            callback(this.cache.get(key));
        }

        return () => {
            subscribers.delete(callback);
            if (subscribers.size === 0) {
                this.subscribers.delete(key);
            }
        };
    }

    private notify<T>(key: string, data: T) {
        if (this.subscribers.has(key)) {
            this.subscribers.get(key)!.forEach((callback) => callback(data));
        }
    }
    
    // Helper to manually update cache (e.g. after a mutation)
    update<T>(key: string, data: T) {
        this.cache.set(key, data);
        this.notify(key, data);
    }
    
    // Helper to invalidate cache
    invalidate(key: string) {
        this.cache.delete(key);
    }
}

export const dataFetcher = new DataFetcher();
