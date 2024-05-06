import React from 'react'
import './message.css'
import TypingDiv from './TypingDiv.jsx'
import ChatNav from './ChatNav.jsx'

export default function Messages() {
  return (
    <div>
      <div className="msg">
        <ChatNav/>
        <div class="spinner"></div>
        <TypingDiv/>

      </div>
    </div>
  )
}
