import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs,doc,getDoc } from "firebase/firestore";

// Your Firebase config object (replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyCpT3RA5T4DFkWN7-sfQe_dqEZxi4pv8TA",
    authDomain: "nfe-team.firebaseapp.com",
    databaseURL: "https://nfe-team-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nfe-team",
    storageBucket: "nfe-team.appspot.com",
    messagingSenderId: "674740558613",
    appId: "1:674740558613:web:b015b90ceff9227aba271c",
    measurementId: "G-GMNL7C2Y5G",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs,doc,getDoc };
