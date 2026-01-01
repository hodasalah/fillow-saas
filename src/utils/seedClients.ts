import { faker } from '@faker-js/faker';
import { doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../types';

export const seedClients = async (count: number = 5) => {
    try {
        console.log(`🌱 Seeding ${count} clients...`);
        const batch = writeBatch(db);
        // const usersRef = collection(db, 'users'); // Removed unused

        for (let i = 0; i < count; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const fullName = `${firstName} ${lastName}`;
            const uid = `client_${faker.string.uuid()}`;
            
            const clientData: User = {
                uid: uid,
                email: faker.internet.email({ firstName, lastName }).toLowerCase(),
                name: fullName,
                profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=${faker.color.rgb({ format: 'hex'}).slice(1)}&color=fff&size=200`,
                role: 'client',
                projects: [],
                tags: [],
                preferences: { theme: 'light', language: 'en' },
                taskProgress: 0,
                teams: [],
                status: 'offline',
                createdAt: Date.now(),
                last_login: Date.now(),
            };

            const userRef = doc(db, 'users', uid);
            batch.set(userRef, clientData);
        }

        await batch.commit();
        console.log(`✅ Successfully seeded ${count} clients.`);
        return true;
    } catch (error) {
        console.error("❌ Error seeding clients:", error);
        return false;
    }
};
