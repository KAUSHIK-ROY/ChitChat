import React, { useState } from 'react'
import './typingDiv.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip} from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import EmojiPicker from 'emoji-picker-react'; 

export default function TypingDiv() {
  let [open, setOpen] = useState(false);


  return (
    <>
    <EmojiPicker open={open}/>
    <div className='tdetails'>
      <div className="tinp">
        <FontAwesomeIcon icon={faFaceSmile} className='ticon' onClick={() => setOpen((prev) => !prev)}/>
        <textarea placeholder='Type a message...' className='inpMsg' rows="4"></textarea>
        {/* <FontAwesomeIcon icon={faCamera}/> */}
        <FontAwesomeIcon icon={faPaperclip} />
        {/* <FontAwesomeIcon icon={faMicrophone}/> */}
      </div>  

      <div className="send">
        <button type='submit'><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>

    </div>
    </>
  )
}
