import React from 'react';
import './allChats.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function AllChats() {
  return (
    <div>
      <div className="allUsers">
        <div className="udp">
          <FontAwesomeIcon icon={faUser} className='dpicon'/>
          
        </div>

        <div className="shortdetail">
          <h4>User 1</h4>
          <p>This is a msg for you.</p>
        </div>
      </div>
    </div>
  )
}
