import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider , signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnGkHfzoD1U2eWTw9JCf1XkxjPVry7hHs",
  authDomain: "login-signup-firebase-2c409.firebaseapp.com",
  projectId: "login-signup-firebase-2c409",
  storageBucket: "login-signup-firebase-2c409.appspot.com",
  messagingSenderId: "880934341412",
  appId: "1:880934341412:web:e9c564e26bfaf62f1cc1b1",
  measurementId: "G-SE1HT782H6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((res) => {
    console.log('loggedin');
    localStorage.setItem('profile' , res.user.photoURL);
  }).catch((error) => {
    console.log('google signin error',error);
  });
};