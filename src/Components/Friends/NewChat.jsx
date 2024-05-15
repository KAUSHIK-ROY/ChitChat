import React, { useState } from "react";
import "./newChat.css";
import { db } from "../../Items/Firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useUserStore } from "../../Items/userStore";
import dp from "../../Items/Man-dp.png";
import Loading from "../../Items/Loading";

export default function NewChat() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isAlreadyInChat, setIsAlreadyInChat] = useState(false);
  const [addButton, setAddButton] = useState(true)

  const { currentUser } = useUserStore();
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const userName = formData.get("userName");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("userName", "==", userName));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        const searchedUser = querySnapShot.docs[0].data();
        if (searchedUser.userName === currentUser.userName) {
          setUser(null);
        } else {
          setUser(searchedUser);
          checkIfUserIsInChat(searchedUser.id);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const checkIfUserIsInChat = async (searchedUserId) => {
    try {
      const userChatsRef = doc(db, "userChats", currentUser.id);
      const userChatsDoc = await getDoc(userChatsRef);

      if (userChatsDoc.exists()) {
        const chats = userChatsDoc.data().chats || [];
        const userInChat = chats.some(
          (chat) => chat.receiverId === searchedUserId
        );
        setIsAlreadyInChat(userInChat);
      } else {
        setIsAlreadyInChat(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");
    // setUser(null);
    setAddButton(null)

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
        <input type="text" placeholder="Search user name" name="userName" />
        <button>Search</button>
      </form>
      <div className="nuser">
        {user ? (
          <>
            <div className="ndetail">
              <img src={user.avatar || dp} alt="DP" />
              <span>{user.userName}</span>
            </div>
            {/* {!isAlreadyInChat && <button onClick={handleAdd}>Add User</button>} */}
            {!isAlreadyInChat && addButton ? (<button onClick={handleAdd}>Add User</button>) : ''}

          </>
        ) : loading ? (
          <>
            <Loading />
          </>
        ) : (
          <h3>No user found</h3>
        )}
      </div>
    </div>
  );
}
