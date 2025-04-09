import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

// Initialize Firebase with the configuration from the server
let app = null;
let db = null;

// Function to initialize Firebase with the configuration from the server
export const initializeFirebase = (firebaseConfig) => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return { app, db };
};

// Export Firebase services
export { db, collection, getDocs, doc, getDoc };
