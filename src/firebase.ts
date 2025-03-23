// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqb7qzprO3JoeFmaZpBy_CmRfXv_4Df5A",
  authDomain: "fillow-73cc0.firebaseapp.com",
  projectId: "fillow-73cc0",
  storageBucket: "fillow-73cc0.firebasestorage.app",
  messagingSenderId: "863043103885",
  appId: "1:863043103885:web:af46408e94b858a81186c4",
  measurementId: "G-XW7DW6JG41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
