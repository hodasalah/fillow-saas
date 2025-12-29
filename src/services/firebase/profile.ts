import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc
} from 'firebase/firestore';
import { db } from '../../firebase';

export interface Activity {
  id: string;
  type: 'comment' | 'like' | 'star' | 'complete' | 'follow';
  description: string;
  timestamp: Date;
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  color: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  bio: string;
  title: string;
  location: string;
  website: string;
  phone?: string;
  birthDate?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  stats: {
    posts: number;
    followers: number;
    following: number;
    projects: number;
  };
  skills: Array<{
    name: string;
    level: number; // 1-5
    category: 'frontend' | 'backend' | 'tools' | 'soft';
  }>;
  achievements: Achievement[];
  activities: Activity[];
  projects: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    status: 'completed' | 'in-progress' | 'planned';
    tags: string[];
    completionDate?: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const PROFILES_COLLECTION = 'userProfiles';

/**
 * Get user profile from Firestore
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const profileDoc = await getDoc(doc(db, PROFILES_COLLECTION, userId));
    
    if (!profileDoc.exists()) {
      return null;
    }

    const data = profileDoc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      activities: data.activities?.map((a: any) => ({
        ...a,
        timestamp: a.timestamp?.toDate() || new Date()
      })) || [],
      achievements: data.achievements?.map((a: any) => ({
        ...a,
        earnedAt: a.earnedAt?.toDate() || new Date()
      })) || []
    } as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Create or update user profile
 */
export const updateUserProfile = async (
  userId: string, 
  data: Partial<UserProfile>
): Promise<void> => {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    await setDoc(profileRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Seed rich profile data for logged-in user
 */
export const seedUserProfile = async (
  userId: string,
  userName: string,
  userEmail: string,
  userPhoto?: string
): Promise<UserProfile> => {
  try {
    const profileData: Omit<UserProfile, 'createdAt' | 'updatedAt'> = {
      uid: userId,
      displayName: userName,
      email: userEmail,
      photoURL: userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=886cc0&color=fff&size=200`,
      bio: "Passionate developer crafting beautiful and functional web experiences. I love turning complex problems into simple, elegant solutions. Always learning, always building.",
      title: "Full Stack Developer & UI/UX Enthusiast",
      location: "Cairo, Egypt",
      website: "https://portfolio.example.com",
      phone: "+20 123 456 7890",
      birthDate: "24 Oct",
      socialLinks: {
        github: "github.com/" + userName.toLowerCase().replace(/\s+/g, ''),
        linkedin: "linkedin.com/in/" + userName.toLowerCase().replace(/\s+/g, '-'),
        twitter: "twitter.com/" + userName.toLowerCase().replace(/\s+/g, '')
      },
      stats: {
        posts: 45,
        followers: 2847,
        following: 892,
        projects: 23
      },
      skills: [
        { name: 'React', level: 5, category: 'frontend' },
        { name: 'TypeScript', level: 5, category: 'frontend' },
        { name: 'Tailwind CSS', level: 5, category: 'frontend' },
        { name: 'Next.js', level: 4, category: 'frontend' },
        { name: 'Firebase', level: 4, category: 'backend' },
        { name: 'Node.js', level: 4, category: 'backend' },
        { name: 'PostgreSQL', level: 3, category: 'backend' },
        { name: 'Git', level: 5, category: 'tools' },
        { name: 'Figma', level: 4, category: 'tools' },
        { name: 'Problem Solving', level: 5, category: 'soft' },
        { name: 'Team Collaboration', level: 5, category: 'soft' }
      ],
      achievements: [
        {
          id: '1',
          title: 'Early Adopter',
          description: 'One of the first users on the platform',
          icon: '🚀',
          color: '#886cc0',
          earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
        },
        {
          id: '2', 
          title: 'Project Master',
          description: 'Completed 20+ projects successfully',
          icon: '🏆',
          color: '#ffa7d7',
          earnedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
        },
        {
          id: '3',
          title: 'Team Player', 
          description: 'Collaborated on 10+ team projects',
          icon: '🤝',
          color: '#886cc0',
          earnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: '4',
          title: 'Code Maestro',
          description: 'Maintained 95%+ code quality score',
          icon: '⭐',
          color: '#ffa7d7',
          earnedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
          id: '5',
          title: 'Mentor',
          description: 'Helped 50+ developers grow',
          icon: '🎓',
          color: '#886cc0',
          earnedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        }
      ],
      activities: [
        {
          id: '1',
          type: 'complete',
          description: 'Completed "E-commerce Platform" project',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          icon: '✅'
        },
        {
          id: '2',
          type: 'star',
          description: 'Starred "Website Redesign" project',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          icon: '⭐'
        },
        {
          id: '3',
          type: 'comment',
          description: 'Commented on team discussion',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          icon: '💬'
        },
        {
          id: '4',
          type: 'like',
          description: 'Liked a design mockup',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          icon: '❤️'
        },
        {
          id: '5',
          type: 'follow',
          description: 'Started following Sarah Johnson',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          icon: '👥'
        },
        {
          id: '6',
          type: 'complete',
          description: 'Completed code review for mobile app',
          timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
          icon: '✅'
        },
        {
          id: '7',
          type: 'comment',
          description: 'Added feedback on UI improvements',
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
          icon: '💬'
        },
        {
          id: '8',
          type: 'star',
          description: 'Starred "Dashboard Analytics" project',
          timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
          icon: '⭐'
        }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'E-commerce Platform',
          description: 'A complete redesign of the e-commerce interface with modern aesthetics, advanced filtering, and seamless checkout experience',
          image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop',
          status: 'completed',
          tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
          completionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'proj-2',
          name: 'SaaS Dashboard Analytics',
          description: 'Real-time analytics dashboard with beautiful data visualizations, custom reports, and team collaboration features',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
          status: 'in-progress',
          tags: ['TypeScript', 'Chart.js', 'Firebase', 'Tailwind'],
        },
        {
          id: 'proj-3',
          name: 'Mobile Banking App',
          description: 'Secure and intuitive mobile banking application with biometric authentication, instant transfers, and budget tracking',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
          status: 'completed',
          tags: ['React Native', 'Redux', 'REST API'],
          completionDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'proj-4',
          name: 'Portfolio Website Redesign',
          description: 'Modern portfolio website with smooth animations, dark mode, and interactive project showcase',
          image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcaaf?w=600&h=400&fit=crop',
          status: 'completed',
          tags: ['Next.js', 'Framer Motion', 'Three.js'],
          completionDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'proj-5',
          name: 'AI Content Generator',
          description: 'AI-powered tool for generating blog posts, social media content, and marketing copy using GPT models',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
          status: 'in-progress',
          tags: ['Python', 'OpenAI', 'FastAPI', 'React'],
        },
        {
          id: 'proj-6',
          name: 'Task Management System',
          description: 'Kanban-style task management with drag-and-drop, time tracking, and team collaboration',
          image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
          status: 'completed',
          tags: ['Vue.js', 'PostgreSQL', 'WebSockets'],
          completionDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'proj-7',
          name: 'Fitness Tracking App',
          description: 'Comprehensive fitness app with workout plans, nutrition tracking, progress photos, and social features',
          image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop',
          status: 'planned',
          tags: ['Flutter', 'Firebase', 'ML Kit'],
        },
        {
          id: 'proj-8',
          name: 'Real Estate Platform',
          description: 'Property listing platform with virtual tours, mortgage calculator, and neighborhood insights',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
          status: 'completed',
          tags: ['Next.js', 'Mapbox', 'Prisma', 'PostgreSQL'],
          completionDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
        }
      ]
    };

    const profileRef = doc(db, PROFILES_COLLECTION, userId);
    await setDoc(profileRef, {
      ...profileData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      ...profileData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Error seeding user profile:', error);
    throw error;
  }
};

/**
 * Get or create user profile (auto-seed if doesn't exist)
 */
export const getOrCreateProfile = async (
  userId: string,
  userName: string,
  userEmail: string,
  userPhoto?: string
): Promise<UserProfile> => {
  let profile = await getUserProfile(userId);
  
  if (!profile) {
    console.log('Profile not found, creating seed data...');
    profile = await seedUserProfile(userId, userName, userEmail, userPhoto);
  }
  
  return profile;
};
