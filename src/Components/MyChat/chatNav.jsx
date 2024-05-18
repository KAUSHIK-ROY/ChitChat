import './chatNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import AboutChat from '../AboutChat/AboutChat.jsx';
import dp from '../../Items/Man-dp.png'
import { useChatStore } from '../../Items/chatStore.js';

export default function ChatNav({aboutChat, toggleAbout}) {
  const {user} = useChatStore();

  return (
    <>
      <div className='user'>
        <div className="udetails">
          <div className="uicon">
            <img src={user?.avatar || dp} className='myicon' onClick={toggleAbout}/>

        {aboutChat && (<AboutChat/>) }
          </div>
          <div className="uname">
            <h4>{user?.userName}</h4>
            <p>Online</p>
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
