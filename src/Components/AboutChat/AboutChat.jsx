import React, { useEffect, useState } from "react";
import "./aboutChat.css";
import dp from "../../Items/Man-dp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useChatStore } from "../../Items/chatStore";

import { db } from "../../Items/Firebase";
import { useUserStore } from "../../Items/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";


export default function AboutChat({ toggleAbout }) {
  const {chatId, user} = useChatStore();



  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChats(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  // if (chats.messages.img === null){
  //   return null;
  // }
  // console.log("user", chats.messages[62].img)

  return (
    
      <div className="aboutContainer">
        <div className="btn">
          <button className="cross-btn" onClick={toggleAbout}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="btn3">
          <button className="back-btn" onClick={toggleAbout}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
        <img src={user?.avatar || dp} alt="DP" />
        <h2>{user?.userName}</h2>
        <div className="media">
            <h2>Media</h2>
            <div className="allMedia">
              {chats.messages ? (
                chats.messages.filter(res => res.img).map((res, index) => (
                  <div className="blank" key={index}>
                    <img src={res.img} alt="" />
                  </div>
                ))
              ) : (
                <p>No media available</p>
              )}
            </div>
        </div>
        <button className="block-btn">Block User</button>
      </div>
  );
}
