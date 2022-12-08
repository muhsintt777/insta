import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "insta-7ffa0.firebaseapp.com",
  projectId: "insta-7ffa0",
  storageBucket: "insta-7ffa0.appspot.com",
  messagingSenderId: "385191573777",
  appId: "1:385191573777:web:63329e123cb57c55cfb4b0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const postsColRef = collection(db, "posts");
