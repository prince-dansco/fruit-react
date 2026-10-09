import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase-auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
// };
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  apiKey: "AIzaSyDk5_B8GsxnnGp0QR6knFCjkzigHpcNLAA",
  authDomain: "fir-otp-2630e.firebaseapp.com",
  projectId: "fir-otp-2630e",
  storageBucket: "fir-otp-2630e.firebasestorage.app",
  messagingSenderId: "438459527005",
  appId: "1:438459527005:web:be6850f97148435dc3c2b4",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };
