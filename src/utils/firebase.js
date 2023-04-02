import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD626vIzduhsYytQ2k4Sm2gHaVB4cElW2s",
  authDomain: "my-project-5afa8.firebaseapp.com",
  databaseURL: "https://my-project-5afa8-default-rtdb.firebaseio.com",
  projectId: "my-project-5afa8",
  storageBucket: "my-project-5afa8.appspot.com",
  messagingSenderId: "161197468725",
  appId: "1:161197468725:web:537a10638ab4f892b4957c",
  measurementId: "G-LH4F5RW1K3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
