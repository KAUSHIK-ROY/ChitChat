import React from 'react'
import './typingDiv.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPaperPlane, faPaperclip, faSmile } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';

export default function typingDiv() {
  return (
    <div className='tdetails'>
      <FontAwesomeIcon icon={faFaceSmile}/>
      <input type="text" placeholder='Type a message...' />
      {/* <FontAwesomeIcon icon={faCamera}/> */}
      <FontAwesomeIcon icon={faPaperclip}/>
      <FontAwesomeIcon icon={faMicrophone}/>
      <FontAwesomeIcon icon={faPaperPlane}/>

    </div>
  )
}
