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
import { useState } from "react";

export default function ChatNav({ aboutChat, toggleAbout}) {
  const { user, chatId, resetChat } = useChatStore();
  const[openMsg,setOpenMsg]= useState(chatId);
  const toggleMsgDiv= ()=>{
    setOpenMsg(null)
    resetChat();
  }



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
            <p>{user?.online ? (<span>Online</span>) : formatLastOnline(user?.lastChanged)}</p>
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


const formatLastOnline = (timestamp) => {
  if (!timestamp) return "Offline";
  const date = new Date(timestamp);
  return `Last online: ${date.toLocaleString()}`;
};
