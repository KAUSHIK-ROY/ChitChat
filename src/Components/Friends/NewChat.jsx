import React, { useState } from "react";
import "./newChat.css";
import { db } from "../../Items/Firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useUserStore } from "../../Items/userStore";
import dp from '../../Items/Man-dp.png'

export default function NewChat() {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userName = formData.get("userName");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("userName", "==", userName));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newChat">
      <h2>New Chat</h2>
      <form autoComplete="off" onSubmit={handleSearch}>
        <input type="text" placeholder="Search email or name" name="userName" />
        <button>Search</button>
      </form>
      {user && (
        <div className="nuser">
          <div className="ndetail">
            <img src={user.avatar || dp} alt='DP' />
            <span>{user.userName}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
}
