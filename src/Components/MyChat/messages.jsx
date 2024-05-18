import React, { useEffect, useRef, useState } from "react";
import "./message.css";
import TypingDiv from "./TypingDiv.jsx";
import ChatNav from "./ChatNav.jsx";
import { useUserStore } from "../../Items/userStore.js";
import { useChatStore } from "../../Items/chatStore.js";

export default function Messages({ aboutChat, toggleAbout }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const { chat } = useChatStore();

  return (
    <div>
      <div className="msg">
        <ChatNav toggleAbout={toggleAbout} showAbout={aboutChat} />
        <div className="personalchat ">
          {chat?.messages?.map((message) => (
            <div className="message">
              <div className="text">
                <p>{message.text}</p>
                {/* <span>{format(message.createdAt.toDate())}</span> */}
              </div>
            </div>
          ))}
          {/* {img.url && ( */}
          {
            <div className="message own">
              <div className="text">
                {/* <img src={img.url} alt="" /> */}
                {/* <span>{format(message.createdAt.toDate())}</span> */}
              </div>
            </div>
          }

          <div ref={endRef}></div>
        </div>

        <TypingDiv />
      </div>
    </div>
  );
}
