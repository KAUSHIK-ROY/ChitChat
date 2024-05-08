import React, { useEffect, useRef, useState } from 'react';
import './message.css';
import TypingDiv from './TypingDiv.jsx';
import ChatNav from './ChatNav.jsx';

export default function Messages(props) {

  const endRef = useRef(null)

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior : "smooth"})
  } , [])

  return (
    <div>
      <div className="msg">
        <ChatNav/>
        {/* <div class="spinner"></div> */}
        <div className="personalchat">
          

{/* demo */}
          <div className="message">
            <div className="text">
              <p>Lorem ipsumgendi error? Id assumenda dicta quasi quas?</p>
              <span>1 min ago</span>
            </div>
          </div>
          <div className="message own">
            <div className="text">
              <p>Lorem, ipsum dolor si modi laborum quisquam consectetur culpa repellat provident soluta voluptates ad, veniam, dolore mollitia quibusdam fugiat?</p>
              <span>1 min ago</span>
            </div>
          </div>

          <div className="message">
            <div className="text">
              <p>Lorem ipsum dolor sit doloremque itaque eligendi error? Id assumenda dicta quasi quas?</p>
              <span>1 min ago</span>
            </div>
          </div>
          <div className="message own">
            <div className="text">
              <p>Lorem,adipisicing elit. Vel excepturi deleniti totat?</p>
              <span>1 min ago</span>
            </div>
          </div>

          <div className="message">
            <div className="text">
              <p>Lorem ipsum onsectetur adipisicing elit. Maxime iloremque itaque eligendquasi quas?</p>
              <span>1 min ago</span>
            </div>
          </div>
          <div className="message own">
            <div className="text">
              <p>Lorem, ipsum dolor sit amet consectetur  deleniti totam non eligendi sit modi laborum quisquam consectetur culpa repellat provident soluta voluptates ad, veniam, dolore mollitia quibusdam fugiat?</p>
              <span>1 min ago</span>
            </div>
          </div>

          <div className="message">
            <div className="text">
              <p>Lorem ipsum elit. Maxime in impedit, doloremque iror? Id assumenda dicta uas?</p>
              <span>1 min ago</span>
            </div>
          </div>
          <div className="message own">
            <div className="text">
              <p>Lorem, consectetur adipisicing elit. Vel excepturi deleniti totam non eligendi sit modi laborum quisquam consectetur litia quibusdam fugiat?</p>
              <span>1 min ago</span>
            </div>
          </div>

          <div className="message">
            <div className="text">
              <p>Lorem ipsum dolor sit elit. Maxime in impedit, doloremque itaque eligendi error? Id assumenda dicta quasi quas?</p>
              <span>1 min ago</span>
            </div>
          </div>
          <div className="message own">
            <div className="text">
              <p>Lorem, laborum quisquam consectetur culpa repellat provident soluta voluptates ad, veniam, dolore mollitia quibusdam fugiat?</p>
              <span>1 min ago</span>
            </div>
          </div>

          <div className="message">
            <div className="text">
              <p>Hii, I am Hitosi.</p>
              <span>1 min ago</span>
            </div>
          </div>
          <div className="message own">
            <div className="text">
              <p>Hello.</p>
              <p>Nice to meet you.</p>
              <p>{props.data}</p>
              <span>1 min ago</span>
            </div>
          </div>
          

          
{/* demo end */}
          <div ref={endRef}></div>
        </div>
        
        <TypingDiv/>

      </div>
    </div>
  )
}
