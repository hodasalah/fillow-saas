import {
    collection,
    getDocs,
    writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Clear all documents from a collection
 */
const clearCollection = async (collectionName: string): Promise<number> => {
  console.log(`🗑️  Clearing collection: ${collectionName}`);
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  
  if (snapshot.empty) {
    console.log(`   ℹ️  Collection ${collectionName} is already empty`);
    return 0;
  }

  let deletedCount = 0;
  const batchSize = 500;
  
  // Delete in batches
  for (let i = 0; i < snapshot.docs.length; i += batchSize) {
    const batch = writeBatch(db);
    const batchDocs = snapshot.docs.slice(i, i + batchSize);
    
    batchDocs.forEach((document) => {
      batch.delete(document.ref);
    });
    
    await batch.commit();
    deletedCount += batchDocs.length;
    console.log(`   ✓ Deleted ${deletedCount}/${snapshot.docs.length} documents`);
  }
  
  console.log(`   ✅ Cleared ${deletedCount} documents from ${collectionName}`);
  return deletedCount;
};

/**
 * Clear messages subcollection from all conversations
 */
const clearConversationMessages = async (): Promise<number> => {
  console.log(`🗑️  Clearing messages subcollections`);
  const conversationsRef = collection(db, 'conversations');
  const conversationsSnapshot = await getDocs(conversationsRef);
  
  let totalDeleted = 0;
  
  for (const conversationDoc of conversationsSnapshot.docs) {
    const messagesRef = collection(db, 'conversations', conversationDoc.id, 'messages');
    const messagesSnapshot = await getDocs(messagesRef);
    
    if (!messagesSnapshot.empty) {
      const batch = writeBatch(db);
      messagesSnapshot.docs.forEach((messageDoc) => {
        batch.delete(messageDoc.ref);
      });
      await batch.commit();
      totalDeleted += messagesSnapshot.docs.length;
      console.log(`   ✓ Deleted ${messagesSnapshot.docs.length} messages from conversation ${conversationDoc.id}`);
    }
  }
  
  console.log(`   ✅ Cleared ${totalDeleted} total messages`);
  return totalDeleted;
};

/**
 * Clear all data from Firebase
 */
export const clearAllData = async (): Promise<void> => {
  try {
    console.log('🚀 Starting database clear...\n');
    const startTime = Date.now();
    
    // Clear subcollections first
    await clearConversationMessages();
    
    // Clear main collections
    const collections = ['conversations', 'alerts', 'users', 'userProfiles', 'projects'];
    
    for (const collectionName of collections) {
      try {
        await clearCollection(collectionName);
      } catch (error) {
        console.warn(`⚠️  Could not clear ${collectionName}:`, error);
      }
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✅ Database cleared successfully in ${duration}s`);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    throw error;
  }
};

// Make available globally for development
if (typeof window !== 'undefined') {
  (window as any).clearAllData = clearAllData;
}
