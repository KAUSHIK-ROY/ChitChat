import React, { useState } from "react";
import "./myProfile.css";
import AllChats from "./AllChats.jsx";
import { auth } from "../../Items/Firebase.js";
import dp from '../../Items/Man-dp.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBars,
  faChevronDown,
  faCircleInfo,
  faComments,
  faGear,
  faPenToSquare,
  faPhotoVideo,
  faSdCard,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faBell, faStar } from "@fortawesome/free-regular-svg-icons";
import NewChat from "./NewChat.jsx";
import { useUserStore } from "../../Items/userStore.js";
import { useChatStore } from "../../Items/chatStore.js";

export default function MyProfile() {
  const {user} = useChatStore();
  const [menu, setMenu] = useState(false);
  let toggleMenu = () => {
    setMenu(!menu);
  };

  const [addChat, setAddChat] = useState(false);
  let toggleAddChat = () => {
    setAddChat(!addChat);
  };
  // const {  resetChat } =
  // useChatStore();

  const handleLogout = () => {
    auth.signOut();
    // resetChat();
  };

  // const [chats, setChats] = useState([]);
  // const [input, setInput] = useState("");
  // const filteredChats = chats.filter((c) =>
  //   c.user.username.toLowerCase().includes(input.toLowerCase())
  // );
  return (
    <div className="friends">
      <div className="menulogo">
        <div className={`slideMenu ${menu ? "activeSlideMenu" : ""}`}>
          <div className="btn">
            <button className="all-btn" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
          <div className="allList">
            <ul>
              <li>
                <div className="idiv">
                  <img src={user?.avatar || dp} alt="" />
                </div>
                <div className="iname">My Profile </div>
              </li>
              <li>
                <div className="idiv">
                  <FontAwesomeIcon icon={faBell} />
                </div>
                <div className="iname">Notifications </div>
              </li>
              <li>
                <div className="idiv">
                  <FontAwesomeIcon icon={faPhotoVideo} />
                </div>
                <div className="iname">Images & videos</div>
              </li>
              <li>
                <div className="idiv">
                  <FontAwesomeIcon icon={faSdCard} />
                </div>
                <div className="iname">Storage </div>
              </li>
              <li>
                <div className="idiv">
                  <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="iname">Settings </div>
              </li>
              <li>
                <div className="idiv">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </div>
                <div className="iname">About us </div>
              </li>
            </ul>
          </div>
          <div className="logAcc">
            <button className="switch-btn">Switch Account</button>
            <div className="log">
              <button className="log-btn" onClick={handleLogout}>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
        <button className="all-btn" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1>ChitChat</h1>
        <span className="isp">
          <FontAwesomeIcon icon={faComments} />
        </span>
      </div>

      <div className="mychats">
        <div className="im">
          <div className="msgarr">
            <h2>Messages</h2>
            <FontAwesomeIcon icon={faChevronDown} className="downarrow" />
          </div>
          <div className="micn">
            <FontAwesomeIcon icon={faPenToSquare} onClick={toggleAddChat} className="all-btn1"/>
            {addChat? (<NewChat/>) : ''}
            <FontAwesomeIcon icon={faStar} className="all-btn1"/>
          </div>
        </div>
        <div className="usearch">
          <button className="sbtn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {/* <input type="text" placeholder="Search" onChange={(e) => setInput(e.target.value)}/> */}
          <input type="text" placeholder="Search"/>
        </div>
        <div className="allchats">
          {/* <AllChats filteredChats={filteredChats}/> */}
          <AllChats/>
        </div>
      </div>
    </div>
  );
}
