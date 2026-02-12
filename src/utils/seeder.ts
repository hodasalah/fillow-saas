import { signInAnonymously } from 'firebase/auth';
import { collection, doc, getDocs, serverTimestamp, writeBatch } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const seedDatabase = async () => {
	try {
        console.log('Starting seeding...');
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
             await signInAnonymously(auth);
        }
        
        const userId = auth.currentUser?.uid || 'local';
        console.log(`Seeding for user: ${userId}`);

		const batch = writeBatch(db);

		const projectsRes = await fetch('/datas/projects.json');
		const projectsData = await projectsRes.json();
		const projectsCol = collection(db, 'projects');
		projectsData.projects.forEach((p: any) => {
			const ref = doc(projectsCol);
			batch.set(ref, p);
		});

		const emailsRes = await fetch('/datas/emails.json');
		const emailsData = await emailsRes.json();
		const emailsCol = collection(db, 'emails');
		emailsData.emailsData.forEach((e: any) => {
			const ref = doc(emailsCol);
		batch.set(ref, {
				...e,
				timestamp: new Date().toISOString(),
				isRead: false,
			});
		});

		const messagesRes = await fetch('/datas/messages.json');
		const messagesData = await messagesRes.json();
		const messagesCol = collection(db, 'messages');
		messagesData.messages.forEach((m: any) => {
			const ref = doc(messagesCol);
			batch.set(ref, {
				...m,
				content: m.lastMessage,
				timestamp: new Date().toISOString(),
				isRead: false,
			});
		});

		const statsRef = doc(db, 'statistics', 'dashboard_stats');
		batch.set(statsRef, {
			total: 12,
			ongoing: 5,
			unfinished: 3,
			chartData: [
				{ name: 'Completed', value: 4 },
				{ name: 'In Progress', value: 5 },
				{ name: 'Not Started', value: 3 },
			],
			userId: userId,
		});

        const usersCol = collection(db, 'users');
        const usersData = [
            { uid: 'user_1', name: 'Dr. Sultads', email: 'sultads@example.com', profilePicture: '/assets/1.jpg', status: 'online' },
            { uid: 'user_2', name: 'Kevin Garfield', email: 'kevin@example.com', profilePicture: '', status: 'offline' }
        ];
        usersData.forEach(u => {
            const ref = doc(usersCol, u.uid);
            batch.set(ref, u);
        });

        const storiesCol = collection(db, 'stories');
        const storiesData = [
            'https://source.unsplash.com/random/800x600?nature1',
            'https://source.unsplash.com/random/800x600?nature2',
            'https://source.unsplash.com/random/800x600?nature3',
            'https://source.unsplash.com/random/800x600?nature4',
            'https://source.unsplash.com/random/800x600?nature5',
            'https://source.unsplash.com/random/800x600?nature6',
        ];
        storiesData.forEach(url => {
            const ref = doc(storiesCol);
            batch.set(ref, { imageUrl: url });
        });

        const notifCol = collection(db, 'notifications');
        const notificationsData = [
            {
                icon: '/assets/1.jpg',
                title: 'Dr sultads Send you Photo',
                time: '29 July 2020 - 02:26 PM',
            },
            {
                icon: 'KG',
                title: 'Resport created successfully',
                time: '29 July 2020 - 02:26 PM',
                background: '#fbeff9',
                color: '#D653C1',
            },
            {
                icon: '/assets/1.jpg',
                title: 'Reminder : Treatment Time!',
                time: '29 July 2020 - 02:26 PM',
                background: '#d7fde2',
                color: '#09BD3C',
            },
             {
                icon: '/assets/1.jpg',
                title: 'Dr sultads Send you Photo',
                time: '29 July 2020 - 02:26 PM',
            },
            {
                icon: 'KG',
                title: 'Resport created successfully',
                time: '29 July 2020 - 02:26 PM',
                background: '#ffedf0',
                color: '#FC2E53',
            },
        ];
        notificationsData.forEach(n => {
            const ref = doc(notifCol);
            batch.set(ref, n);
        });

        const conversationsCol = collection(db, 'conversations');
        // Chat 1
        const chat1Ref = doc(conversationsCol, 'chat_1');
        batch.set(chat1Ref, {
            participants: [userId, 'user_1'],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastMessage: {
                text: 'Hey, how is the project going?',
                senderId: 'user_1',
                createdAt: new Date(),
                read: false,
            }
        });
        const msg1Ref = doc(collection(db, 'conversations', 'chat_1', 'messages'));
        batch.set(msg1Ref, {
             text: 'Hey, how is the project going?',
             senderId: 'user_1',
             createdAt: serverTimestamp(),
             read: false
        });

        const chat2Ref = doc(conversationsCol, 'chat_2');
        batch.set(chat2Ref, {
            participants: [userId, 'user_2'],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastMessage: {
                text: 'Can we meet tomorrow?',
                senderId: userId,
                createdAt: new Date(),
                read: true,
            }
        });
        const msg2Ref = doc(collection(db, 'conversations', 'chat_2', 'messages'));
        batch.set(msg2Ref, {
             text: 'Can we meet tomorrow?',
             senderId: userId,
             createdAt: serverTimestamp(),
             read: true
        });



        const alertsCol = collection(db, 'alerts');
        const alertsData = [
            { category: 'System', code: 'SYS', message: 'Welcome to your new dashboard!', read: true, createdAt: serverTimestamp(), userId: userId },
            { category: 'Security', code: 'SEC', message: 'Password updated successfully.', read: false, createdAt: serverTimestamp(), userId: userId },
            { category: 'Updates', code: 'UPD', message: 'New features available in version 2.0.', read: false, createdAt: serverTimestamp(), userId: userId }
        ];
        alertsData.forEach(a => {
            const ref = doc(alertsCol);
            batch.set(ref, a);
        });

        const teamsCol = collection(db, 'teams');
        const teamsData = [
            { name: 'Frontend Team', members: [userId, 'user_1'], projectCount: 5 },
            { name: 'Marketing', members: ['user_2'], projectCount: 2 }
        ];
        teamsData.forEach(t => {
            const ref = doc(teamsCol);
            batch.set(ref, t);
        });

         const profilesCol = collection(db, 'userProfiles');
         usersData.forEach(u => {
             const ref = doc(profilesCol, u.uid);
             batch.set(ref, {
                 displayName: u.name,
                 email: u.email,
                 photoURL: u.profilePicture,
                 role: 'Member',
                 bio: 'Team member',
                 phone: '123-456-7890'
             });
         });

		await batch.commit();
		console.log('Seeding complete!');
		alert('Database seeded successfully! Please refresh the page.');
	} catch (error) {
		console.error('Error seeding database:', error);
		alert('Error seeding database. Check console.');
	}
};


export const clearCollection = async (collectionPath: string) => {
    const colRef = collection(db, collectionPath);
    const snapshot = await getDocs(colRef);
    
    if (snapshot.empty) return;

    const batch = writeBatch(db);
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Cleared collection: ${collectionPath}`);
};

export const resetDatabase = async () => {
    if (process.env.NODE_ENV === 'production') {
        console.error("Attempted to clear database in production! Aborting.");
        return;
    }

    try {
        console.log('Resetting database...');
        
        const collectionsToClear = [
            'projects', 
            'emails', 
            'messages', 
            'statistics', 
            'users', 
            'stories', 
            'notifications', 
            'conversations',
            'alerts',
            'teams',
            'userProfiles',
            'alerts',
            'teams',
            'userProfiles'
        ];

        for (const path of collectionsToClear) {
            await clearCollection(path);
        }

        console.log('Database successfully cleared.');
    } catch (error) {
        console.error('Error clearing database:', error);
    }
};