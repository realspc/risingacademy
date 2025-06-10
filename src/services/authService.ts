import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

export const authService = {
  // Sign in admin
  async signIn(email: string, password: string) {
    try {
      // For demo purposes, allow direct login with demo credentials
      if (email === 'admin@risingacademy.com' && password === 'admin123') {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          return userCredential.user;
        } catch (authError: any) {
          // If user doesn't exist, create it
          if (authError.code === 'auth/user-not-found') {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Create admin user document
            await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              role: 'admin',
              firstName: 'Admin',
              lastName: 'User',
              createdAt: new Date()
            });
            
            return user;
          }
          throw authError;
        }
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser(): Promise<FirebaseUser | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  },

  // Check if user is admin
  async isAdmin(uid: string): Promise<boolean> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      return userDoc.exists() && userDoc.data().role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }
};