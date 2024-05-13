import React, { useState } from "react";
import "./myProfile.css";
import AllChats from "./AllChats.jsx";
import { auth } from "../../Items/Firebase.js";
// import { signOut } from "firebase/auth";

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

export default function MyProfile() {
  const [menu, setMenu] = useState(false);
  let toggleMenu = () => {
    setMenu(!menu);
  };

  const [addChat,setAddChat] = useState(false);
  let toggleAddChat = ()=>{
    setAddChat(!addChat);
  }
  // const {  resetChat } =
  // useChatStore();

  const handleLogout = () => {
    auth.signOut();
    // resetChat();
  };

  return (
    <div className="friends">
      <div className="menulogo">
        <div className={`slideMenu ${menu ? "activeSlideMenu" : ""}`}>
          <div className="btn">
            <button className="bar-btn" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
          <div className="allList">
            <ul>
              <li>
                <div className="idiv">
                  {" "}
                  {/* <FontAwesomeIcon icon={faBomb} /> */}
                  <img src=" " alt="" />
                </div>
                <div className="iname">My Profile </div>
              </li>
              <li>
                <div className="idiv">
                  {" "}
                  <FontAwesomeIcon icon={faBell} />
                </div>
                <div className="iname">Notifications </div>
              </li>
              <li>
                <div className="idiv">
                  {" "}
                  <FontAwesomeIcon icon={faPhotoVideo} />
                </div>
                <div className="iname">Images & videos</div>
              </li>
              <li>
                <div className="idiv">
                  {" "}
                  <FontAwesomeIcon icon={faSdCard} />
                </div>
                <div className="iname">Storage </div>
              </li>
              <li>
                <div className="idiv">
                  {" "}
                  <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="iname">Settings </div>
              </li>
              <li>
                <div className="idiv">
                  {" "}
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
        <button className="bar-btn" onClick={toggleMenu}>
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
            <FontAwesomeIcon icon={faPenToSquare} onClick={toggleAddChat}/>
            <div className="newChat">
              <h2>New Chat</h2>
              <input type="text" placeholder="Search email or name"/>
              <button>Search</button>
            </div>
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <div className="usearch">
          <button className="sbtn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input type="text" placeholder="Search" />
        </div>
        <div className="allchats">
          <AllChats />
        </div>
      </div>
    </div>
  );
}
