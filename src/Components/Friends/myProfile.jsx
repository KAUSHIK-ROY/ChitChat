import React from 'react';
import './myProfile.css';
import AllChats from './allChats.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faPenToSquare, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

export default function myProfile() {
  return (
    <div className="friends">
      {/* <div className='profile'>
        <div className="dp">
          <FontAwesomeIcon icon={faUser} className='dpicon'/>
        </div>
        <h2>Kaushik Roy</h2>
      </div> */}

      <div className="menulogo">
        <FontAwesomeIcon icon={faBars}/>
        <h1>ChitChat</h1>
      </div>

      <div className="mychats">
        <div className="im">
          <div className='msgarr'>
            <h2>Messages</h2>
            <FontAwesomeIcon icon={faChevronDown} className='downarrow' />
          </div>
          <div className='micn'>
            <FontAwesomeIcon icon={faPenToSquare} />
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <div className="usearch">
          <button className='sbtn'><FontAwesomeIcon icon={faSearch} /></button>
          <input type="text" placeholder='Search'/>
        </div>

        <AllChats/>
      </div>
    </div>
  )
}
