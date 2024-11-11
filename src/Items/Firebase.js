import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCNaYz5jBsaB1CZmNqWZyXJjFGjGgjMKQU",
  authDomain: "chitchat-422817.firebaseapp.com",
  projectId: "chitchat-422817",
  storageBucket: "chitchat-422817.appspot.com",
  messagingSenderId: "14729923125",
  appId: "1:14729923125:web:be5126df1e1dace6553f7c",
  measurementId: "G-H11T1BEXF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();   
// export default app;