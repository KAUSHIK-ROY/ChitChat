import React, { useEffect, useState } from 'react';
import './allChats.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../Items/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../Items/Firebase';
import dp from '../../Items/Man-dp.png'
import { useChatStore } from '../../Items/chatStore';


export default function AllChats() {
  
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  
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
  

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userChats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
      // console.log(chat.chatId, chat.user)
    } catch (err) {
      console.log(err);
    }
  };
  // const filteredChats = chats.filter((c) =>
  //   c.user.userName.toLowerCase().includes(inputs.toLowerCase())
  // );
  

  return (
    <div>
      {chats.map((chat) =>(                      /*filteredChat*/
      <div className="allUsers" key={chat.chatId} onClick={()=>handleSelect(chat)} 
      // style={{backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",}}
        >
        <img src={ chat.user.blocked.includes(currentUser.id)
                ? dp
                : chat.user.avatar || dp} alt='DP' />
        <div className="shortdetail">
          <h4>{chat.user.userName}</h4>
          <p>{chat.lastMessage}</p>
        </div>
      </div>
    ))}
    </div>
  )
}
