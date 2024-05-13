import React, { useEffect, useState } from 'react';
import './allChats.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../Items/userStore';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../Items/Firebase';


export default function AllChats() {
  
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
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
        <div className="udp">
          <FontAwesomeIcon icon={faUser} className='dpicon'/>
          
        </div>

        <div className="shortdetail">
          <h4>User 1</h4>
          <p>{chat.lastMessage}</p>
        </div>
      </div>
    ))}
    </div>
  )
}
