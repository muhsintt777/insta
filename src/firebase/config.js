import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdk296Lue6O_q_etBHK60XIuQt8BoGcX4",
  authDomain: "insta-7ffa0.firebaseapp.com",
  projectId: "insta-7ffa0",
  storageBucket: "insta-7ffa0.appspot.com",
  messagingSenderId: "385191573777",
  appId: "1:385191573777:web:63329e123cb57c55cfb4b0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get a list of cities from your database
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//   }
