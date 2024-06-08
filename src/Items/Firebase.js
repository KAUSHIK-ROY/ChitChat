import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {getFirestore, doc, updateDoc, serverTimestamp} from "firebase/firestore"
import {getStorage} from 'firebase/storage'
import { getDatabase, ref, set, onDisconnect } from "firebase/database";
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const rtdb = getDatabase(app);

const setUserStatus = async (uid, status) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    status,
    lastChanged: serverTimestamp(),
  });
};

const monitorUserConnection = (uid) => {
  const userStatusDatabaseRef = ref(rtdb, `/status/${uid}`);

  const isOfflineForFirestore = {
    state: "offline",
    lastChanged: serverTimestamp(),
  };

  const isOnlineForFirestore = {
    state: "online",
    lastChanged: serverTimestamp(),
  };

  set(userStatusDatabaseRef, isOnlineForFirestore);

  onDisconnect(userStatusDatabaseRef).set(isOfflineForFirestore);

  setUserStatus(uid, "online");

  window.addEventListener("beforeunload", () => {
    setUserStatus(uid, "offline");
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    monitorUserConnection(user.uid);
  }
});

export { auth, db, storage, rtdb };