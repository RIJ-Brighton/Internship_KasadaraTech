import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3fIT1vdwkBflNmo-IGT0N3IxCRZifCI8",
  authDomain: "social-media-internship-app.firebaseapp.com",
  projectId: "social-media-internship-app",
  storageBucket: "social-media-internship-app.appspot.com",
  messagingSenderId: "577087935249",
  appId: "1:577087935249:web:5a6e687d5f6f71977672b0",
  measurementId: "G-QX6E5BBEDW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);