import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQNFpP1Ow5_nGwMRoWOB07INIlBMkttNU",
  authDomain: "halodesa-f8b0b.firebaseapp.com",
  projectId: "halodesa-f8b0b",
  storageBucket: "halodesa-f8b0b.appspot.com", 
  messagingSenderId: "1082042702726",
  appId: "1:1082042702726:web:af13495bf285922ed06a07",
  measurementId: "G-2XTFF835YT"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
