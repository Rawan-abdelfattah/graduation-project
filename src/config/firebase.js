// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDQ65VBvwms3EycriD9qzY_dVHO79EPZqQ",
//   authDomain: "doctor-bot-3b898.firebaseapp.com",
//   databaseURL: "https://doctor-bot-3b898-default-rtdb.firebaseio.com",
//   projectId: "doctor-bot-3b898",
//   storageBucket: "doctor-bot-3b898.firebasestorage.app",
//   messagingSenderId: "377795312397",
//   appId: "1:377795312397:web:a5401bad8871e065ad4e44",
//   measurementId: "G-8Y2TG7X6C8"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCu1NVC-lHekOFOmfrqf5NUPG6ogFKvH1w",
  authDomain: "graduationproject-1ec82.firebaseapp.com",
  projectId: "graduationproject-1ec82",
  storageBucket: "graduationproject-1ec82.firebasestorage.app",
  messagingSenderId: "811257900570",
  appId: "1:811257900570:web:c48a9b1b3c650f40822ba3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };
const analytics = getAnalytics(app);
