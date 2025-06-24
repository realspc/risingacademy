import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subcategories?: string[];
}

export interface SiteSettings {
  id?: string;
  contact: {
    facebook: string;
    instagram: string;
    phone: string;
    location: string;
  };
  stats: {
    students: number;
    languages: number;
    programmingLanguages: number;
    successRate: number;
  };
  officeClub: {
    day: string;
    time: string;
    description: string;
  };
  services: {
    categories: ServiceCategory[];
  };
  updatedAt: Date;
}

const SETTINGS_DOC_ID = 'site-settings';

// Default settings that will be used as fallback
const getDefaultSettings = (): SiteSettings => ({
  contact: {
    facebook: 'https://www.facebook.com/risingacademydz/',
    instagram: 'https://www.instagram.com/rising_academy_/?hl=en',
    phone: '0670710505 / 0667909055',
    location: 'ولاية باتنة طريق بسكرة، رود العرايس بناية بن بلاط'
  },
  stats: {
    students: 500,
    languages: 12,
    programmingLanguages: 25,
    successRate: 95
  },
  officeClub: {
    day: 'MONDAY',
    time: '6:00 PM - 9:00 PM',
    description: 'Join us every Monday for collaborative learning, networking, and skill sharing.'
  },
  services: {
    categories: [
      {
        id: 'languages',
        name: 'Language Learning',
        description: 'Master multiple languages with native speakers',
        icon: 'Globe',
        color: 'from-blue-500 to-blue-600',
        subcategories: ['English', 'French', 'Spanish', 'German', 'Arabic']
      },
      {
        id: 'development',
        name: 'Development',
        description: 'Learn programming and web development',
        icon: 'Code2',
        color: 'from-purple-500 to-purple-600',
        subcategories: ['Web Development', 'Cyber Security', 'AI', 'Programming Fundamentals']
      },
      {
        id: 'design',
        name: 'Graphic Design',
        description: 'Creative design and visual arts',
        icon: 'Palette',
        color: 'from-pink-500 to-pink-600',
        subcategories: ['Adobe Photoshop', 'Illustrator', 'UI/UX Design', 'Branding']
      },
      {
        id: 'business',
        name: 'Business & Finance',
        description: 'Trading, accounting, and business skills',
        icon: 'TrendingUp',
        color: 'from-green-500 to-green-600',
        subcategories: ['Trading', 'PC Compta', 'PC Paie', 'المحاسبة']
      },
      {
        id: 'marketing',
        name: 'Digital Marketing',
        description: 'Online marketing and social media',
        icon: 'Megaphone',
        color: 'from-orange-500 to-orange-600',
        subcategories: ['Social Media Marketing', 'SEO', 'Content Marketing', 'Email Marketing']
      },
      {
        id: 'media',
        name: 'Video Editing',
        description: 'Video production and editing',
        icon: 'Video',
        color: 'from-red-500 to-red-600',
        subcategories: ['Adobe Premiere', 'After Effects', 'Motion Graphics', 'Color Grading']
      },
      {
        id: 'it',
        name: 'Informatique',
        description: 'Computer science and IT fundamentals',
        icon: 'Monitor',
        color: 'from-cyan-500 to-cyan-600',
        subcategories: ['Computer Basics', 'Office Suite', 'Hardware', 'Networking']
      }
    ]
  },
  updatedAt: new Date()
});

export const settingsService = {
  // Get site settings with fallback to defaults
  async getSettings(): Promise<SiteSettings> {
    try {
      const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          updatedAt: data.updatedAt.toDate()
        } as SiteSettings;
      } else {
        // Document doesn't exist, return defaults
        return getDefaultSettings();
      }
    } catch (error) {
      console.warn('Unable to fetch settings from Firebase, using defaults:', error);
      // Return default settings when Firebase access fails
      return getDefaultSettings();
    }
  },

  // Update site settings (requires authentication)
  async updateSettings(settings: Partial<SiteSettings>) {
    try {
      const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
      await setDoc(docRef, {
        ...settings,
        updatedAt: Timestamp.now()
      }, { merge: true });
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
};