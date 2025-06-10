import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

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
  updatedAt: Date;
}

const SETTINGS_DOC_ID = 'site-settings';

// Default settings that will be used as fallback
const getDefaultSettings = (): SiteSettings => ({
  contact: {
    facebook: 'https://www.facebook.com/risingacademydz/',
    instagram: 'https://www.instagram.com/rising_academy_/?hl=en',
    phone: '☎️:0670710505 /0667909055',
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