// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQCbhLNLO7mfdY0OJ8HgLJpqrGteWPT5w",
  authDomain: "risingacademy-afb14.firebaseapp.com",
  projectId: "risingacademy-afb14",
  storageBucket: "risingacademy-afb14.firebasestorage.app",
  messagingSenderId: "321687170532",
  appId: "1:321687170532:web:e5b9d05b40325120596bf1",
  measurementId: "G-L0JMWS952J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage, analytics };
export default app;