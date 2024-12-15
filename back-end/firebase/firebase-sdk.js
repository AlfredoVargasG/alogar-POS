// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtBfkmPiOPo5bHtQToil4HK4LF3swic6s",
  authDomain: "alogar-storage.firebaseapp.com",
  projectId: "alogar-storage",
  storageBucket: "alogar-storage.firebasestorage.app",
  messagingSenderId: "655192061381",
  appId: "1:655192061381:web:a735452de2365d237e47ac",
  measurementId: "G-R0MS2DELLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);