import "./chatNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEllipsisVertical,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import AboutChat from "../AboutChat/AboutChat.jsx";
import dp from "../../Items/Man-dp.png";
import { useChatStore } from "../../Items/chatStore.js";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Items/Firebase.js";

export default function ChatNav({ aboutChat, toggleAbout}) {
  const { user, chatId,resetChat } = useChatStore();
  const[openMsg,setOpenMsg]= useState(chatId);
  const toggleMsgDiv= ()=>{
    setOpenMsg(null)
    resetChat();
  }

  const handleStatus = async (status) => {
    try {
      await setDoc(doc(db, "users", user.id), {
        online: status,
      }, { merge: true });
      // console.log(user.online)
    } catch (err) {
      console.log(err);
    } 
  };

  useEffect(() => {
    const handleOnline = () => {
      handleStatus(true);
      // console.log('online')
    };
    const handleOffline = () => {
      handleStatus(false);
      // console.log('offline')
    };

    const checkReceiverStatus = () => {
      if (navigator.onLine) {
        handleOnline();
      } else {
        handleOffline();
      }
    };
    checkReceiverStatus();
    const intervalId = setInterval(checkReceiverStatus, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  return (
    <>
      <div className="user">
        <div className="udetails">
        <div className="btn4">
          <button className="back-btn" onClick={toggleMsgDiv}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
          <div className="uicon">
            <img
              src={user?.avatar || dp}
              className="myicon"
              onClick={toggleAbout}
            />

            {aboutChat && <AboutChat />}
          </div>
          <div className="uname">
            <h4>{user?.userName}</h4>
            <p>{user?.online ? (<span>Online</span>) : 'Offline'}</p>
          </div>
        </div>
        <div className="socialIcons">
          <div className="nav-btn">
            <FontAwesomeIcon icon={faVideo} />
          </div>
          <div className="nav-btn">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <div className="nav-btn">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
        </div>
      </div>
    </>
  );
}
