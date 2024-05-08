import React, { useState } from 'react'
import './typingDiv.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPaperPlane, faPaperclip} from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import EmojiPicker from 'emoji-picker-react'; 

export default function TypingDiv(props) {
  let [open, setOpen] = useState(false);

  const [data, setData] = useState("");
  const updateData = (event) => {
    setData(event.target.value);
  }

  const handleSendMessage = () => {
    setData('');
  };

  return (
    <>
    <div className='tdetails'>
      <div className="tinp">
        <FontAwesomeIcon icon={faFaceSmile} className='ticon' onClick={() => setOpen((prev) => !prev)}/>
        <div className="picker">
          <EmojiPicker open={open}/>
        </div>
        <textarea placeholder='Type a message...' className='inpMsg' rows="1" value={data} onChange={updateData}></textarea>
        <div className="micclip">
          <FontAwesomeIcon icon={faMicrophone}/>
          <FontAwesomeIcon icon={faPaperclip} />
        </div>
        {/* <FontAwesomeIcon icon={faCamera}/> */}
      </div>  

      <div className="send">
        <button type='submit' onClick={handleSendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>

    </div>
    </>
  )
}
