import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Application } from '../types';

const COLLECTION_NAME = 'applications';

export const applicationService = {
  // Create new application
  async createApplication(applicationData: Omit<Application, 'id' | 'createdAt' | 'updatedAt' | 'status'>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...applicationData,
        status: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },

  // Get all applications
  async getAllApplications(): Promise<Application[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate()
      })) as Application[];
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Get applications by type
  async getApplicationsByType(type: string): Promise<Application[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME), 
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate()
      })) as Application[];
    } catch (error) {
      console.error('Error fetching applications by type:', error);
      throw error;
    }
  },

  // Update application status
  async updateApplicationStatus(id: string, status: 'pending' | 'approved' | 'rejected') {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },

  // Delete application
  async deleteApplication(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  },

  // Initialize admin user
  async initializeAdmin() {
    try {
      const adminData = {
        email: 'admin@risingacademy.com',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        createdAt: Timestamp.now()
      };
      
      await setDoc(doc(db, 'users', 'admin-user'), adminData);
      console.log('Admin user initialized');
    } catch (error) {
      console.error('Error initializing admin:', error);
    }
  }
};