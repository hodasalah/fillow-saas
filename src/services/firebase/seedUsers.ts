
import { doc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserData } from './users';

export const seedUsers = async (count: number = 5): Promise<void> => {
    try {
        console.log(`Seeding ${count} fake users...`);
        const response = await fetch(`https://randomuser.me/api/?results=${count}`);
        const data = await response.json();
        const batch = writeBatch(db);

        data.results.forEach((u: any) => {
             // Create a deterministic but unique ID if possible, or just use uuid from API
            const uid = u.login.uuid;
            
            const userData: UserData = {
                uid: uid,
                email: u.email,
                displayName: `${u.name.first} ${u.name.last}`,
                photoURL: u.picture.medium,
                status: Math.random() > 0.5 ? 'online' : 'offline',
                lastSeen: new Date(),
                createdAt: new Date(u.registered.date),
                isMock: true,
            };

            const userRef = doc(db, 'users', uid);
            batch.set(userRef, userData, { merge: true });
        });

        await batch.commit();
        console.log('Successfully seeded users!');
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
};
