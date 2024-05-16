import React, { useEffect, useState } from 'react';
import './allChats.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../Items/userStore';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../Items/Firebase';
import dp from '../../Items/Man-dp.png'


export default function AllChats() {
  
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  

  return (
    <div>
      {chats.map((chat) =>(
      <div className="allUsers">
        <img src={ dp} alt='DP' />
        <div className="shortdetail">
          <h4>{chat.user.userName}</h4>
          <p>{chat.lastMessage}Demo chat</p>
        </div>
      </div>
    ))}
    </div>
  )
}
