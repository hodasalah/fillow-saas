import { faker } from '@faker-js/faker';
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Alert } from '../services/firebase/alerts';
import type { UserProfile } from '../services/firebase/profile';
import type { UserData } from '../services/firebase/users';

// Configuration
const CONFIG = {
  USERS_COUNT: 12,
  CONVERSATIONS_PER_USER: 2,
  MESSAGES_PER_CONVERSATION: 8,
  ALERTS_PER_USER: 3,
  MIN_SKILLS: 5,
  MAX_SKILLS: 10,
  MIN_ACHIEVEMENTS: 3,
  MAX_ACHIEVEMENTS: 5,
  MIN_ACTIVITIES: 6,
  MAX_ACTIVITIES: 10,
  MIN_PROJECTS: 3,
  MAX_PROJECTS: 6
};

// Utility to generate random number in range
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Utility to pick random item from array
const randomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

// Generate Users
const generateUser = (index: number): UserData & { id: string } => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  
  return {
    id: `user_${index}`,
    uid: `user_${index}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    displayName: fullName,
    photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=${faker.color.rgb({ format: 'hex'}).slice(1)}&color=fff&size=200`,
    status: randomItem(['online', 'offline'] as const),
    lastSeen: faker.date.recent({ days: 7 }),
    createdAt: faker.date.past({ years: 1 }),
    isMock: true
  };
};

// Generate User Profile
const generateUserProfile = (user: UserData & { id: string }): Omit<UserProfile, 'createdAt' | 'updatedAt'> => {
  const skillNames = ['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Vue.js', 'Angular', 'Kotlin', 'Swift', 'Go', 'Rust', 'Figma', 'Sketch', 'Git', 'CI/CD', 'Leadership', 'Communication', 'Problem Solving', 'Teamwork'];
  const skillCount = randomInt(CONFIG.MIN_SKILLS, CONFIG.MAX_SKILLS);
  const selectedSkills = faker.helpers.arrayElements(skillNames, skillCount);
  
  const achievementTitles = [
    { title: 'Early Adopter', icon: '🚀', desc: 'One of the first users on the platform' },
    { title: 'Project Master', icon: '🏆', desc: 'Completed 20+ projects successfully' },
    { title: 'Team Player', icon: '🤝', desc: 'Collaborated on 10+ team projects' },
    { title: 'Code Maestro', icon: '⭐', desc: 'Maintained 95%+ code quality score' },
    { title: 'Mentor', icon: '🎓', desc: 'Helped 50+ developers grow' },
    { title: 'Innovation Leader', icon: '💡', desc: 'Introduced 5+ new technologies' }
  ];
  
  const activityTypes: Array<'comment' | 'like' | 'star' | 'complete' | 'follow'> = ['comment', 'like', 'star', 'complete', 'follow'];
  const activityMessages = {
    comment: ['Commented on team discussion', 'Added feedback on UI improvements', 'Replied to code review'],
    like: ['Liked a design mockup', 'Liked project update', 'Appreciated team effort'],
    star: ['Starred project', 'Bookmarked resource', 'Saved for later'],
    complete: ['Completed project task', 'Finished code review', 'Deployed to production'],
    follow: ['Started following', 'Connected with', 'Joined team']
  };

  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || '',
    bio: faker.person.bio(),
    title: faker.person.jobTitle(),
    location: `${faker.location.city()}, ${faker.location.country()}`,
    website: faker.internet.url(),
    phone: faker.phone.number(),
    birthDate: faker.date.birthdate({ min: 20, max: 50, mode: 'age' }).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    socialLinks: {
      github: `github.com/${faker.internet.userName().toLowerCase()}`,
      linkedin: `linkedin.com/in/${faker.internet.userName().toLowerCase()}`,
      twitter: `twitter.com/${faker.internet.userName().toLowerCase()}`
    },
    stats: {
      posts: randomInt(10, 100),
      followers: randomInt(100, 5000),
      following: randomInt(50, 1000),
      projects: randomInt(5, 50)
    },
    skills: selectedSkills.map(name => ({
      name,
      level: randomInt(1, 5),
      category: randomItem(['frontend', 'backend', 'tools', 'soft'] as const)
    })),
    achievements: faker.helpers.arrayElements(
      achievementTitles,
      randomInt(CONFIG.MIN_ACHIEVEMENTS, CONFIG.MAX_ACHIEVEMENTS)
    ).map((ach, idx) => ({
      id: `ach_${idx}`,
      title: ach.title,
      description: ach.desc,
      icon: ach.icon,
      color: randomItem(['#886cc0', '#ffa7d7', '#4a90e2', '#50c878']),
      earnedAt: faker.date.past({ years: 1 })
    })),
    activities: Array.from({ length: randomInt(CONFIG.MIN_ACTIVITIES, CONFIG.MAX_ACTIVITIES) }, (_, idx) => {
      const type = randomItem(activityTypes);
      return {
        id: `act_${idx}`,
        type,
        description: randomItem(activityMessages[type]),
        timestamp: faker.date.recent({ days: 30 }),
        icon: { comment: '💬', like: '❤️', star: '⭐', complete: '✅', follow: '👥' }[type]
      };
    }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    projects: Array.from({ length: randomInt(CONFIG.MIN_PROJECTS, CONFIG.MAX_PROJECTS) }, (_, idx) => ({
      id: `proj_${idx}`,
      name: faker.company.catchPhrase(),
      description: faker.lorem.sentences(2),
      image: `https://images.unsplash.com/photo-${randomItem(['1557821552', '1551288049', '1563986768', '1467232004', '1677442136', '1484480974'])}?w=600&h=400&fit=crop`,
      status: randomItem(['completed', 'in-progress', 'planned'] as const),
      tags: faker.helpers.arrayElements(['React', 'Node.js', 'TypeScript', 'Firebase', 'Tailwind', 'PostgreSQL'], randomInt(2, 4)),
      ...(Math.random() > 0.5 ? { completionDate: faker.date.past ({ years: 1 }) } : {})
    }))
  };
};

// Generate Conversation with Messages
const generateConversation = async (user1Id: string, user2Id: string): Promise<string> => {
  const conversationRef = await addDoc(collection(db, 'conversations'), {
    participants: [user1Id, user2Id],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  const messageTexts = [
    'Hey! How are you?',
    'I\'m doing great, thanks for asking!',
    'Did you see the latest project updates?',
    'Yes, looking really good!',
    'Can we schedule a meeting tomorrow?',
    'Sure, what time works for you?',
    'How about 2 PM?',
    'Perfect, see you then!',
    'Great work on the presentation!',
    'Thanks! Appreciate the feedback.',
    'Let me know if you need any help.',
    'Will do, thanks!'
  ];

  const batch = writeBatch(db);
  let lastMessageData: any = null;
  let lastMessageId = '';
  
  const messageCount = randomInt(5, CONFIG.MESSAGES_PER_CONVERSATION);
  
  for (let i = 0; i < messageCount; i++) {
    const isUser1 = i % 2 === 0;
    const messageRef = doc(collection(db, 'conversations', conversationRef.id, 'messages'));
    
    const messageData = {
      text: randomItem(messageTexts),
      senderId: isUser1 ? user1Id : user2Id,
      createdAt: new Date(Date.now() - (messageCount - i) * 1000 * 60 * 10), // 10 min intervals
      read: i < messageCount - 2 // Last 2 messages unread
    };
    
    batch.set(messageRef, messageData);
    lastMessageData = messageData;
    lastMessageId = messageRef.id;
  }
  
  // Update conversation with last message
  if (lastMessageData) {
    batch.update(doc(db, 'conversations', conversationRef.id), {
      lastMessage: {
        id: lastMessageId,
        ...lastMessageData,
        createdAt: new Date()
      },
      updatedAt: serverTimestamp()
    });
  }
  
  await batch.commit();
  return conversationRef.id;
};

// Generate Alerts
const generateAlert = (userId: string): Omit<Alert, 'id'> => {
  const categories = ['Social', 'System', 'Server Status'];
  const messages = [
    'commented on your task',
    'invited you to a project',
    'mentioned you in a discussion',
    'assigned you a new task',
    'liked your post',
    'started following you',
    'sent you a message',
    'shared a document with you'
  ];
  
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    category: randomItem(categories),
    code: `${firstName[0]}${lastName[0]}`,
    message: `${firstName} ${lastName} ${randomItem(messages)}`,
    createdAt: faker.date.recent({ days: 7 }),
    read: Math.random() > 0.3, // 70% read
    userId
  };
};

/**
 * Seed all database collections with realistic data
 */
export const seedAllData = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...\n');
    const startTime = Date.now();
    
    // Step 1: Create Users
    console.log('👥 Creating users...');
    const users: Array<UserData & { id: string }> = [];
    const userBatch = writeBatch(db);
    
    for (let i = 1; i <= CONFIG.USERS_COUNT; i++) {
      const user = generateUser(i);
      users.push(user);
      const userRef = doc(db, 'users', user.id);
      userBatch.set(userRef, user);
    }
    
    await userBatch.commit();
    console.log(`✅ Created ${users.length} users\n`);
    
    // Step 2: Create User Profiles
    console.log('📋 Creating user profiles...');
    const profileBatch = writeBatch(db);
    
    for (const user of users) {
      const profile = generateUserProfile(user);
      const profileRef = doc(db, 'userProfiles', user.id);
      profileBatch.set(profileRef, {
        ...profile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    await profileBatch.commit();
    console.log(`✅ Created ${users.length} user profiles\n`);
    
    // Step 3: Create Conversations
    console.log('💬 Creating conversations...');
    let conversationCount = 0;
    
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < CONFIG.CONVERSATIONS_PER_USER && i + j + 1 < users.length; j++) {
        await generateConversation(users[i].id, users[i + j + 1].id);
        conversationCount++;
      }
    }
    
    console.log(`✅ Created ${conversationCount} conversations with messages\n`);
    
    // Step 4: Create Alerts
    console.log('🔔 Creating alerts...');
    const alertBatch = writeBatch(db);
    let alertCount = 0;
    
    for (const user of users) {
      const alertsToCreate = randomInt(2, CONFIG.ALERTS_PER_USER);
      for (let i = 0; i < alertsToCreate; i++) {
        const alert = generateAlert(user.id);
        const alertRef = doc(collection(db, 'alerts'));
        alertBatch.set(alertRef, {
          ...alert,
          createdAt: serverTimestamp()
        });
        alertCount++;
      }
    }
    
    await alertBatch.commit();
    console.log(`✅ Created ${alertCount} alerts\n`);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n🎉 Database seeded successfully in ${duration}s!`);
    console.log(`\n📊 Summary:`);
    console.log(`   - ${users.length} users`);
    console.log(`   - ${users.length} profiles`);
    console.log(`   - ${conversationCount} conversations`);
    console.log(`   - ${alertCount} alerts`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Make available globally for development
if (typeof window !== 'undefined') {
  (window as any).seedAllData = seedAllData;
}
