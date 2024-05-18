import React, { useEffect, useRef, useState } from "react";
import "./message.css";
import TypingDiv from "./TypingDiv.jsx";
import ChatNav from "./ChatNav.jsx";

export default function Messages({aboutChat, toggleAbout}) {
  const endRef = useRef(null);
  
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  
  return (
    <div>
      <div className="msg">
        <ChatNav toggleAbout={toggleAbout} showAbout={aboutChat}/>
        <div className='personalchat '>
{/* demo */}

          <div className="message">
            <div className="text">
              <p>Hii, I am Hitosi.</p>
              <span>1 min ago</span>
            </div>
          </div>
          <div className="message own">
            <div className="text">
              <p>Hello.</p>
              <p>lorem50</p>
              <p>Nice to meet you.</p>
              <p></p>
              <span>1 min ago</span>
            </div>
          </div>

{/* demo end */}
          <div ref={endRef}></div>
        </div>

        <TypingDiv />
      </div>
    </div>
  );
}
