import { faker } from '@faker-js/faker';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../types';
import { fetchUsers } from './fetchUsers';

export const seedProjects = async (count: number = 5) => {
    try {
        // Fetch existing users to use as clients and persons in charge
        const users = await fetchUsers() as unknown as User[];
        
        if (users.length === 0) {
            console.error("No users found to assign to projects. Please seed users first.");
            return;
        }

        const promises = [];

        for (let i = 0; i < count; i++) {
            const client = faker.helpers.arrayElement(users);
            const personInCharge = faker.helpers.arrayElement(users);
            const status = faker.helpers.arrayElement(['Pending', 'On Progress', 'Closed', 'Completed']);
            
            // Generate dates
            const startDate = faker.date.past();
            const deadline = faker.date.future();
            const endDate = status === 'Closed' ? faker.date.between({ from: startDate, to: deadline }) : null;

            const projectData = {
                name: faker.company.catchPhrase(),
                description: faker.lorem.paragraph(),
                client: {
                    name: client.name,
                    image: client.profilePicture, // Map profilePicture to image
                    id: client.uid,
                },
                personInCharge: {
                    name: personInCharge.name,
                    image: personInCharge.profilePicture, // Map profilePicture to image
                    id: personInCharge.uid,
                },
                deadline: Timestamp.fromDate(deadline),
                startDate: Timestamp.fromDate(startDate),
                endDate: endDate ? Timestamp.fromDate(endDate) : null,
                status: status,
                createdAt: serverTimestamp(),
                members: [], // value for members
                ownerId: 'seeded_data', // specific flag or ID
            };

            promises.push(addDoc(collection(db, 'projects'), projectData));
        }

        await Promise.all(promises);
        console.log(`Successfully seeded ${count} projects.`);
        return true;
    } catch (error) {
        console.error("Error seeding projects:", error);
        return false;
    }
};
