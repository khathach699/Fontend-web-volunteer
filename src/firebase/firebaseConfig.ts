import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAyCDANb59tG6iFdMR88PyJ-LPS-cL1pVA",
  authDomain: "heart-3dd0f.firebaseapp.com",
  projectId: "heart-3dd0f",
  storageBucket: "heart-3dd0f.firebasestorage.app",
  messagingSenderId: "995813247012",
  appId: "1:995813247012:web:99b0dfc0dc9bb5983270b1",
  measurementId: "G-6ZBMHE75Q8",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
