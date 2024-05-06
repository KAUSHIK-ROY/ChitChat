import React from 'react';
import './chatNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPhone, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';

export default function ChatNav() {
  return (
    <>
      <div className='user'>
        <div className="udetails">
          <div className="uicon">
            <FontAwesomeIcon icon={faUser} className='myicon'/>
          </div>
          <div className="uname">
            <h4>Kaushik</h4>
          </div>
        </div>
        <div className="socialIcons">
          <FontAwesomeIcon icon={faVideo}/>
          <FontAwesomeIcon icon={faPhone}/>
          <FontAwesomeIcon icon={faEllipsisVertical}/>
        </div>  
      </div>
    </>
  )
}
