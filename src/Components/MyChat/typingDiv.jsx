import React, { useEffect, useRef, useState } from "react";
import "./typingDiv.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Items/Firebase";
import { useChatStore } from "../../Items/chatStore";
import Messages from "./Messages";
import { useUserStore } from "../../Items/userStore";

export default function TypingDiv() {
  let [open, setOpen] = useState(false);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });


  const [text, setText] = useState("");
  const { chatId , user} = useChatStore();
  const { currentUser} = useUserStore();
  
  const updateData = (event) => {
    setText(event.target.value);
  };

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    // setOpen(false);
  };

  const handleSendMessage = async() => {
    
    let imgUrl = null;

    try {
      // if (img.file) {
      //   imgUrl = await upload(img.file);
      // }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally{
    setImg({
      file: null,
      url: "",
    });
    setText("");
    }
  };

  let emojiRef = useRef();
  useEffect(() =>{
    let handler = (e)=>{
      if( !emojiRef.current.contains(e.target)){
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler)

    return()=>{
      document.removeEventListener("mousedown", handler)
    }
  },[])



  return (
    <>
      <div className="tdetails">
        <div className="tinp"  ref={emojiRef}>
          <FontAwesomeIcon
            icon={faFaceSmile}
            className="ticon"
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} theme="dark"  onEmojiClick={handleEmoji} />
          </div>
          <textarea
            placeholder="Type a message..."
            className="inpMsg"
            rows="1"
            value={text}
            onChange={updateData}
            onClick={ ()=>   setOpen(false)}
          ></textarea>
          <div className="micclip">
            <FontAwesomeIcon icon={faMicrophone} />
            <FontAwesomeIcon icon={faPaperclip} />
          </div>
          {/* <FontAwesomeIcon icon={faCamera}/> */}
        </div>

        <div className="send">
          <button type="submit" onClick={handleSendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </>
  );
}
