// import React, { useState } from 'react';
import './chatNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPhone, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';
import AboutChat from '../AboutChat/AboutChat.jsx';

export default function ChatNav({aboutChat, toggleAbout}) {
  

  return (
    <>
      <div className='user'>
        <div className="udetails">
          <div className="uicon">
            <FontAwesomeIcon icon={faUser} className='myicon' onClick={toggleAbout}/>
        {aboutChat && (<AboutChat toggleAbout={toggleAbout} showAbout={aboutChat} />) }
          </div>
          <div className="uname">
            <h4>Kaushik</h4>
          </div>
        </div>
        <div className="socialIcons">
          <div className='nav-btn'>
          <FontAwesomeIcon icon={faVideo} />
          </div>
          <div className='nav-btn'>
          <FontAwesomeIcon icon={faPhone} />        
          </div>
          <div className='nav-btn'>
          <FontAwesomeIcon icon={faEllipsisVertical} /> 
          </div>
        </div>  
      </div>
    </>
  )
}
