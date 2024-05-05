import React from 'react'
import './message.css'
import TypingDiv from './typingDiv.jsx'
import ChatNav from './chatNav.jsx'

export default function messages() {
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
