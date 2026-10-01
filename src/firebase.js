import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase sozlamalaringiz (o'zingizdagi kalitlarni shu yerga yozing)
const firebaseConfig = {
  apiKey: "AIzaSyBpVXgKOUOptR7kW_zFOgUey9hEDsZpzF4",
  authDomain: "skillswap-8efd4.firebaseapp.com",
  projectId: "skillswap-8efd4",
  storageBucket: "skillswap-8efd4.firebasestorage.app",
  messagingSenderId: "183827840904",
  appId: "1:183827840904:web:330fb233ecd3112245c43d"
};

// Firebase'ni ishga tushiramiz
const app = initializeApp(firebaseConfig);

// Auth va Firestore'ni eksport qilamiz
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // Mana bu yerda 'db' eksport qilinyapti!