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

export default function ChatNav({ aboutChat, toggleAbout}) {
  const { user, chatId,resetChat, updateUserStatus } = useChatStore();
  const[openMsg,setOpenMsg]= useState(chatId);
  const toggleMsgDiv= ()=>{
    setOpenMsg(null)
    resetChat();
  }

  useEffect(() => {
    const handleOnline = () => {
      console.log("User Online");
      updateUserStatus(true);
    };
    const handleOffline = () => {
      console.log("User Offline");
      updateUserStatus(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [updateUserStatus]);
  

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
