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
import {  useState } from "react";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Items/Firebase.js";
import { onDisconnect, ref, set, getDatabase  } from "firebase/database";

export default function ChatNav({ aboutChat, toggleAbout}) {
  const { user, chatId, resetChat } = useChatStore();
  const[openMsg,setOpenMsg]= useState(chatId);
  const toggleMsgDiv= ()=>{
    setOpenMsg(null)
    resetChat();
  }

const formatLastOnline = (timestamp) => {
  if (!timestamp) return "Offline";
  const date = new Date(timestamp);
  return `Last online: ${date.toLocaleString()}`;
};

const setUserStatus = async (uid, status) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    status,
    lastChanged: serverTimestamp(),
  });
};

// Monitor user's connection state
const monitorUserConnection = async (uid) => {
  const dbRef = getDatabase();
  const userStatusDatabaseRef = ref(dbRef, `/status/${uid}`);

  const isOfflineForFirestore = {
    state: "offline",
    lastChanged: serverTimestamp(),
  };

  const isOnlineForFirestore = {
    state: "online",
    lastChanged: serverTimestamp(),
  };

  set(userStatusDatabaseRef, isOnlineForFirestore);

  onDisconnect(userStatusDatabaseRef).set(isOfflineForFirestore);

  setUserStatus(uid, "online");

  window.addEventListener("beforeunload", () => {
    setUserStatus(uid, "offline");
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      monitorUserConnection(user.uid);
    } else {
      setUserStatus(uid, "offline");
    }
  });
};

auth.onAuthStateChanged((user) => {
  if (user) {
    monitorUserConnection(user.uid);
  }
});



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
