import React, { useState } from 'react';
import './myProfile.css';
import AllChats from './AllChats.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars, faBomb, faChevronDown, faCircleInfo, faGear, faPenToSquare, faPhotoVideo, faSdCard, faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import { faBell, faStar } from '@fortawesome/free-regular-svg-icons';

export default function MyProfile() {

  const[menu,setMenu] = useState(false);
  let toggleMenu = ()=>{
    setMenu(!menu)
  }
  return (
    <div className="friends">

      <div className="menulogo">
      
        <div className={`slideMenu ${menu? 'activeSlideMenu' : ''}` }>
          <div className="btn">
            <button className='bar-btn' onClick={toggleMenu}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
          </div>
          <div className="allList">
            <ul>
              <li><div className='idiv'> <FontAwesomeIcon icon={faBomb}/></div><div className='iname'>My Profile           </div></li>
              <li><div className='idiv'> <FontAwesomeIcon icon={faBell}/></div><div className='iname'>Notifications        </div></li>
              <li><div className='idiv'> <FontAwesomeIcon icon={faPhotoVideo}/></div><div className='iname'>Images & videos</div></li>
              <li><div className='idiv'> <FontAwesomeIcon icon={faSdCard}/></div><div className='iname'>Storage            </div></li>
              <li><div className='idiv'> <FontAwesomeIcon icon={faGear}/></div><div className='iname'>Settings             </div></li>
              <li><div className='idiv'> <FontAwesomeIcon icon={faCircleInfo}/></div><div className='iname'>About us       </div></li>
            </ul>
          </div>

        </div>
        <button className='bar-btn' onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars}/>
        </button>
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
        <div className="allchats">
          <AllChats/>
          <AllChats/>
          <AllChats/>
          <AllChats/>
          <AllChats/>
          <AllChats/>
          <AllChats/>
          <AllChats/>
          <AllChats/>
        </div>
      </div>
    </div>
  )
}
