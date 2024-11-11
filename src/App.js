import { useEffect, useState } from "react";
import "./App.css";
import MyProfile from "./Components/Friends/MyProfile.jsx";
import Login from "./Components/LogIn/Login.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Items/Firebase.js";
import { useUserStore } from "./Items/userStore.js";
import Loading from "./Items/Loading.jsx";
import AboutChat from "./Components/AboutChat/AboutChat.jsx";
import { useChatStore } from "./Items/chatStore.js";
import Robot from "./Items/robot.gif";
import Messages from "./Components/MyChat/Messages.jsx";

function App() {
  const [aboutChat, setAboutChat] = useState(false);
  const toggleAbout = () => {
    setAboutChat(!aboutChat);
    // console.log("Working");
  };
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
      // console.log("Current user:", user);
    });
    return () => {
      unsub();
    };
  }, [fetchUserInfo]);

  if (isLoading)
    return (
      <div className="Reload">
        <Loading />
      </div>
    );

  return (
    <div className="container">
      {currentUser ? (
        <>
          <div className="friends">
            <MyProfile />
          </div>
          {chatId ? (
            <>
              <div className={`myChat ${aboutChat ? "active" : ""}`}>
                <Messages toggleAbout={toggleAbout} showAbout={aboutChat} />
              </div>
              {/* {aboutChat && ( */}
              <div className={`aboutChat ${aboutChat ? "active" : ""}`}>
                <AboutChat toggleAbout={toggleAbout} />
                {/* )} */}
              </div>
            </>
          ) : (
            <div className="welcome-page">
              <img src={Robot} alt="robot" />
              <div className="welcome-text">
                <h1>
                  Welcome to <span>ChitChat</span>{" "}
                </h1>
                <p>
                  Send and receive messages without keeping your phone online.
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
