import React from 'react'
import './typingDiv.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPaperPlane, faPaperclip} from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';

export default function typingDiv() {
  return (
    <div className='tdetails'>

      <div className="tinp">
        <FontAwesomeIcon icon={faFaceSmile} className='ticon'/>
        <input type="text" placeholder='Type a message...' className='inpMsg'/>
        {/* <FontAwesomeIcon icon={faCamera}/> */}
        <FontAwesomeIcon icon={faPaperclip} className='ticon'/>
        {/* <FontAwesomeIcon icon={faMicrophone}/> */}
      </div>  

      <div className="send">
        <button type='submit'><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>

    </div>
  )
}
