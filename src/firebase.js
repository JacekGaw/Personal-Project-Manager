// Import the functions you need from the SDKs you need
// const dotenv = require('dotenv');

import React from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  // appId: import.meta.env.VITE_FIREBASE_APPID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
  apiKey: "AIzaSyDsuwZp0PW8Y-Shhlo7xOCdQ1w2XCtxqkE",
  authDomain: "project-manager-10c79.firebaseapp.com",
  projectId: "project-manager-10c79",
  storageBucket: "project-manager-10c79.appspot.com",
  messagingSenderId: "438765228634",
  appId: "1:438765228634:web:5424ccb5230a7d48fbfe63",
  measurementId: "G-LNC1FS82W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
