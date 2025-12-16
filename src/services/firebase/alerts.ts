import {
    collection,
    doc,
    onSnapshot,
    query,
    serverTimestamp,
    where,
    writeBatch
} from 'firebase/firestore';
import { db } from '../../firebase';

export interface Alert {
    id: string;
    category: string; // 'Server Status' | 'Social' | 'System'
    code: string;     // e.g. 'KK', 'RU' (avatar initials or icon code)
    message: string;
    createdAt: Date;  // displayed as 'time'
    read: boolean;
    userId: string;   // owner of the alert
}

// Subscribe to user's alerts
export const subscribeToAlerts = (
    userId: string,
    callback: (alerts: Alert[]) => void
) => {
    try {
        const alertsRef = collection(db, 'alerts');
        const q = query(
            alertsRef,
            where('userId', '==', userId)
            // orderBy('createdAt', 'desc') // Removed to avoid need for Composite Index
        );

        return onSnapshot(q, (snapshot) => {
            const alerts = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Convert Firestore Timestamp to Date immediately for UI
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(), 
                };
            }) as Alert[];
            
            // Auto-seed if empty
            if (alerts.length === 0) {
                 const key = `seed_alerts_${userId}`;
                 if (!sessionStorage.getItem(key)) {
                     sessionStorage.setItem(key, 'true');
                     seedDefaultAlerts(userId);
                 }
            }

            callback(alerts);
        }, (error) => {
            console.warn("Alerts subscription failed:", error);
            callback([]);
        });
    } catch (error) {
        console.error("Error subscribing to alerts:", error);
        callback([]);
        return () => {};
    }
};

// Seed default alerts for a user
export const seedDefaultAlerts = async (userId: string) => {
    console.log("Seeding default alerts...");
    try {
        const batch = writeBatch(db);
        const alertsRef = collection(db, 'alerts');

        const defaults = [
            {
                category: 'Social',
                code: 'DS',
                message: 'Dr. Sultads commented on your task',
                userId: userId,
                read: false,
                createdAt: new Date()
            },
            {
                category: 'System',
                code: 'KG',
                message: 'Kevin Garfield invited you to a project',
                userId: userId,
                read: false,
                createdAt: new Date(Date.now() - 3600000) // 1 hour ago
            },
            {
                category: 'System',
                code: 'SYS',
                message: 'Welcome to your new dashboard!',
                userId: userId,
                read: true,
                createdAt: new Date(Date.now() - 86400000) // 1 day ago
            }
        ];

        defaults.forEach(alert => {
            const ref = doc(alertsRef);
            batch.set(ref, {
                ...alert,
                createdAt: serverTimestamp()
            });
        });

        await batch.commit();
        console.log("Default alerts seeded.");
    } catch (error) {
        console.warn("Failed to seed alerts:", error);
    }
};
