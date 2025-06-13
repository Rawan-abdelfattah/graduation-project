// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ65VBvwms3EycriD9qzY_dVHO79EPZqQ",
  authDomain: "doctor-bot-3b898.firebaseapp.com",
  databaseURL: "https://doctor-bot-3b898-default-rtdb.firebaseio.com",
  projectId: "doctor-bot-3b898",
  storageBucket: "doctor-bot-3b898.firebasestorage.app",
  messagingSenderId: "377795312397",
  appId: "1:377795312397:web:a5401bad8871e065ad4e44",
  measurementId: "G-8Y2TG7X6C8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db , app};
const analytics = getAnalytics(app);
