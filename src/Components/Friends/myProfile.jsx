import React, { useEffect, useRef, useState } from "react";
import "./myProfile.css";
import AllChats from "./AllChats.jsx";
import { auth, db } from "../../Items/Firebase.js";
import dp from "../../Items/Man-dp.png";
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
import { useChatStore } from "../../Items/chatStore.js";
import SubMenu from "./MenuComponents/SubMenu.jsx";
import { useUserStore } from "../../Items/userStore.js";
import { doc, setDoc } from "firebase/firestore";

export default function MyProfile() {
  const { resetChat } = useChatStore();
  const [menu, setMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(null);
  const { currentUser } = useUserStore();
  const [input, setInput] = useState("");
  // const [myProfile,setMyProfile] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const toggleSubMenu = (index) => {
    if (subMenu === index) {
      setSubMenu(null);
    } else {
      setSubMenu(index);
    }
  };

  const [addChat, setAddChat] = useState(false);
  const toggleAddChat = () => {
    setAddChat(!addChat);
  };

  const handleLogout = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(
          doc(db, "users", user.uid),
          {
            online: false,
          },
          { merge: true }
        );
        await auth.signOut();
      }
    } catch (err) {
      // toast.error(err.message);
    }
    resetChat();
  };

  const subMenuRef = useRef();
  const addChatRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!subMenuRef.current.contains(e.target)) {
        setSubMenu(null);
      }
      if (!addChatRef.current.contains(e.target)) {
        setAddChat(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <div className="friends">
      <div className="menulogo">
        <div className={`slideMenu ${menu ? "activeSlideMenu" : ""}`}>
          <div className="btn">
            <button className="all-btn" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
          <div className="allList" ref={subMenuRef}>
            {subMenu !== null && <SubMenu subMenu={subMenu} />}
            <ul>
              <li onClick={() => toggleSubMenu(0)}>
                <div className="idiv">
                  <img src={currentUser?.avatar || dp} alt="" />
                </div>
                <div className="iname">My Profile </div>
              </li>
              <li onClick={() => toggleSubMenu(1)}>
                <div className="idiv">
                  <FontAwesomeIcon icon={faBell} />
                </div>
                <div className="iname">Notifications </div>
              </li>
              <li onClick={() => toggleSubMenu(2)}>
                <div className="idiv">
                  <FontAwesomeIcon icon={faPhotoVideo} />
                </div>
                <div className="iname">Images & videos</div>
              </li>
              <li onClick={() => toggleSubMenu(3)}>
                <div className="idiv">
                  <FontAwesomeIcon icon={faSdCard} />
                </div>
                <div className="iname">Storage </div>
              </li>
              <li onClick={() => toggleSubMenu(4)}>
                <div className="idiv">
                  <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="iname">Settings </div>
              </li>
              <li onClick={() => toggleSubMenu(5)}>
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
      </div>

      <div className="mychats">
        <div className="im">
          <div className="msgarr">
            <h2>Messages</h2>
            <FontAwesomeIcon icon={faChevronDown} className="downarrow" />
          </div>
          <div className="micn" ref={addChatRef}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={toggleAddChat}
              className="all-btn1"
            />
            {addChat && <NewChat />}
            <FontAwesomeIcon icon={faStar} className="all-btn1" />
          </div>
        </div>
        <div className="usearch">
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input type="text" placeholder="Search" onChange={(e) => setInput(e.target.value)}/>
        </div>
        <div className="allchats">
          <AllChats input={input}/>
          <AllChats input={input}/>
          <AllChats input={input}/>
          <AllChats input={input}/>
          <AllChats input={input}/>
        </div>
      </div>
    </div>
  );
}
