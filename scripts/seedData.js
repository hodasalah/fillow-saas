
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, writeBatch } from 'firebase/firestore';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Hardcoded config matching src/firebase.ts
const firebaseConfig = {
	apiKey: 'AIzaSyBqb7qzprO3JoeFmaZpBy_CmRfXv_4Df5A',
	authDomain: 'fillow-73cc0.firebaseapp.com',
	projectId: 'fillow-73cc0',
	storageBucket: 'fillow-73cc0.firebasestorage.app',
	messagingSenderId: '863043103885',
	appId: '1:863043103885:web:af46408e94b858a81186c4',
	measurementId: 'G-XW7DW6JG41',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

async function readJsonFile(filePath) {
	try {
		const data = await fs.readFile(filePath, 'utf8');
		return JSON.parse(data);
	} catch (error) {
		console.error(`Error reading file ${filePath}:`, error);
		throw error;
	}
}

async function seedProjects() {
	console.log('--- Seeding Projects ---');
	const projectsPath = path.join(PROJECT_ROOT, 'public', 'datas', 'projects.json');
	const data = await readJsonFile(projectsPath);
	const projects = data.projects; // Array of projects

	const batch = writeBatch(db);
	const projectsCollection = collection(db, 'projects');

	for (const project of projects) {
		const docRef = doc(projectsCollection); // Auto-generated ID
		// The app uses string dates in the JSON, so we keep them for now.
		batch.set(docRef, project);
	}

	await batch.commit();
	console.log(`Successfully seeded ${projects.length} projects.`);
}

async function seedEmails() {
	console.log('--- Seeding Emails ---');
	const emailsPath = path.join(PROJECT_ROOT, 'public', 'datas', 'emails.json');
	const data = await readJsonFile(emailsPath);
	const emails = data.emailsData;

	const batch = writeBatch(db);
	const emailsCollection = collection(db, 'emails');

	for (const email of emails) {
		const docRef = doc(emailsCollection);
		const emailData = {
			...email,
			timestamp: new Date().toISOString(),
			isRead: false,
		};
		batch.set(docRef, emailData);
	}

	await batch.commit();
	console.log(`Successfully seeded ${emails.length} emails.`);
}

async function seedMessages() {
	console.log('--- Seeding Messages ---');
	const messagesPath = path.join(PROJECT_ROOT, 'public', 'datas', 'messages.json');
	const data = await readJsonFile(messagesPath);
	const messages = data.messages;

	const batch = writeBatch(db);
	const messagesCollection = collection(db, 'messages');

	for (const message of messages) {
		const docRef = doc(messagesCollection);
        const messageData = {
            ...message,
            content: message.lastMessage,
            timestamp: new Date(message.lastMessageTime || Date.now()).toISOString(),
            isRead: false
        };
		batch.set(docRef, messageData);
	}

	await batch.commit();
	console.log(`Successfully seeded ${messages.length} messages.`);
}

async function seedStatistics() {
    console.log('--- Seeding Statistics ---');
    // Mock data from src/utils/fetchData.ts
    const statistics = {
		total: 12,
		ongoing: 5,
		unfinished: 3,
		chartData: [
			{ name: 'Completed', value: 4 },
			{ name: 'In Progress', value: 5 },
			{ name: 'Not Started', value: 3 },
		],
		userId: 'local',
	};

    const docRef = doc(db, 'statistics', 'dashboard_stats');
    const batch = writeBatch(db);
    batch.set(docRef, statistics);
    await batch.commit();
    console.log('Successfully seeded statistics.');
}

async function main() {
    try {
        console.log('Starting DB Seeding...');
        
        let signedIn = false;

        try {
            await signInAnonymously(auth);
            console.log('Signed in anonymously');
            signedIn = true;
        } catch (e) {
            console.log('Anonymous sign-in failed:', e.code, e.message);
        }

        if (!signedIn) {
             const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import('firebase/auth');
             const email = 'temp_seeder@example.com';
             const password = 'tempPassword123!';
             
             try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('Signed in with existing seeder user');
             } catch (e) {
                 console.log('Sign-in failed, trying to create user...', e.code, e.message);
                 try {
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log('Created and signed in with new seeder user');
                 } catch (createError) {
                     console.error('FAILED TO AUTHENTICATE:', createError.code, createError.message);
                     console.warn('Proceeding with seeding WITHOUT authentication (hoping for open security rules)...');
                     // Do not exit, try to seed anyway
                 }
             }
        }

		await seedProjects();
		await seedEmails();
		await seedMessages();
        await seedStatistics();
		console.log('Database seeding completed successfully!');
		process.exit(0);
	} catch (error) {
		console.error('Error during seeding:', error);
		process.exit(1);
	}
}

main();
