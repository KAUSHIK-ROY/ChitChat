import React from 'react'
import "./newChat.css"

export default function NewChat() {
  return (
    <div className="newChat">
              <h2>New Chat</h2>
              <div>
                <input type="text" placeholder="Search email or name" />
                <button>Search</button>
              </div>
            </div>
  )
}

