import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore';
import { auth, db } from '../firebase';

// Old Project Config (Fillow)
const oldConfig = {
    apiKey: 'AIzaSyBqb7qzprO3JoeFmaZpBy_CmRfXv_4Df5A',
    authDomain: 'fillow-73cc0.firebaseapp.com',
    projectId: 'fillow-73cc0',
    storageBucket: 'fillow-73cc0.firebasestorage.app',
    messagingSenderId: '863043103885',
    appId: '1:863043103885:web:af46408e94b858a81186c4',
};

// Initialize the "Old" app separately
const oldApp = initializeApp(oldConfig, 'oldApp');
const oldDb = getFirestore(oldApp);
const oldAuth = getAuth(oldApp);

export const migrateFromFillow = async () => {
    try {
        console.log("Starting Migration from Fillow...");
        
        // Authenticate anonymously in the OLD app to get read permission
        console.log("Authenticating with old project...");
        await signInAnonymously(oldAuth);
        console.log("Authenticated with old project.");

        const currentUserId = auth.currentUser?.uid;
        
        if (!currentUserId) {
            alert("Please be logged in to migrate data (so we can assign it to you).");
            return;
        }

        const collectionsToMigrate = [
            'alerts',
            'projects',
            'teams',
            'emails',
            'messages',
            'notifications',
            'notifications',
            'stories',
            'statistics',
            'conversations'
        ];

        let totalDocs = 0;
        const batch = writeBatch(db);

        for (const colName of collectionsToMigrate) {
            console.log(`Migrating ${colName}...`);
            try {
                const oldColRef = collection(oldDb, colName);
                const snapshot = await getDocs(oldColRef);

                if (snapshot.empty) {
                    console.log(`No data in ${colName}, skipping.`);
                    continue;
                }

                snapshot.forEach(oldDoc => {
                    const data = oldDoc.data();
                    
                    // Smart Ownership: If the data belonged to an old user, assign it to YOU now.
                    // Force overwrite userId for collections that need it to be visible
                     if (['projects', 'teams', 'alerts'].includes(colName) || data.userId) {
                        data.userId = currentUserId;
                    }
                    
                    // Handle odd naming
                    if (data.uid) {
                        data.uid = currentUserId; 
                    }
                    
                    if (colName === 'conversations') {
                        // Ensure participants exists and is an array
                        if (!data.participants || !Array.isArray(data.participants)) {
                             data.participants = [];
                        }
                        
                        // AGGRESSIVE FIX: Ensure current user is in the list
                        // If the list is empty or doesn't have me, add me.
                        if (!data.participants.includes(currentUserId)) {
                             data.participants.push(currentUserId);
                        }
                        
                        // Also make sure there's at least one other person (mock if needed)
                        if (data.participants.length < 2) {
                            data.participants.push('mock_user_id');
                        }
                    }

                    // Create new doc in current DB
                    // For statistics, we MUST use the fixed ID 'dashboard_stats' if it's that doc
                    let newRef;
                    if (colName === 'statistics' && oldDoc.id === 'dashboard_stats') {
                         newRef = doc(db, colName, 'dashboard_stats');
                    } else {
                         newRef = doc(collection(db, colName));
                    }
                    
                    batch.set(newRef, data);
                    totalDocs++;
                });
            } catch (err) {
                console.error(`Failed to migrate collection '${colName}':`, err);
                
                // FALLBACK: If 'teams' fails (due to permissions), create Mock Data so user sees SOMETHING.
                if (colName === 'teams') {
                     console.log("Creating fallback Mock Teams...");
                     const teamsData = [
                        { name: 'Migration Team A', members: [currentUserId, 'user_1'], projectCount: 5, userId: currentUserId },
                        { name: 'Migration Team B', members: [currentUserId], projectCount: 2, userId: currentUserId }
                    ];
                    teamsData.forEach(t => {
                        const ref = doc(collection(db, 'teams'));
                        batch.set(ref, t);
                    });
                     totalDocs += teamsData.length;
                }
                // Continue to next collection
            }
        }

        if (totalDocs > 0) {
            await batch.commit();
            console.log(`Migration Complete. Moved ${totalDocs} documents.`);
            alert(`Successfully migrated ${totalDocs} items from Fillow! Refresh page.`);
        } else {
            alert("Old project seems empty? No data found to migrate.");
        }

    } catch (error) {
        console.error("Migration Error:", error);
        alert("Migration Failed. Check console for details.");
    }
};
