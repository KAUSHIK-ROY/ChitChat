import React, { useEffect, useRef, useState } from "react";
import "./message.css";
// import TypingDiv from "./TypingDiv.jsx";
import ChatNav from "./ChatNav.jsx";
import { useUserStore } from "../../Items/userStore.js";
import { useChatStore } from "../../Items/chatStore.js";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Items/Firebase.js";
import { format, formatISO, isToday, isYesterday } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import EmojiPicker from "emoji-picker-react";

export default function Messages({ aboutChat, toggleAbout }) {
  const [text, setText] = useState("");
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();
  const endRef = useRef(null);
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  // const formatter = buildFormatter()
  const formatter = (value, unit, suffix, epochSeconds, nextFormatter) => {
    if (unit === "second") {
      return "just now";
    }
    return nextFormatter(value, unit, suffix, epochSeconds, nextFormatter);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  // const { chat } = useChatStore();

  const updateData = (event) => {
    setText(event.target.value);
  };
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    // setOpen(false);
  };

  const handleSendMessage = async () => {
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
        const userChatsRef = doc(db, "userChats", id);
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
    } finally {
      setImg({
        file: null,
        url: "",
      });
      setText("");
    }
  };

  let emojiRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!emojiRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  }, [text]);

  const formatTime = (date) => {
    return format(date, "hh:mm a");
  };

  const formatDateHeader = (date) => {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, 'eeee, MMMM do, yyyy');
    }
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const date = formatISO(message.createdAt.toDate(), { representation: 'date' });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };
  return (
    <div>
      <div className="msg">
        <ChatNav toggleAbout={toggleAbout} showAbout={aboutChat} />
        <div className="personalchat ">
          {chat?.messages && Object.entries(groupMessagesByDate(chat.messages)).map(([date, messages]) => (
            <div key={date}>
          <div className="date-header">{formatDateHeader(new Date(date))}</div>
          {chat?.messages?.map((message) => (
            // <div className="message">
            <div
              className={
                message.senderId === currentUser?.id
                  ? "message own"
                  : "message frnd"
              }
              key={message?.createAt}
            >
              <div className="text">
                {message.img && <img src={message.img} alt="" />}
                <p>{message.text}</p>
                <span>{formatTime(message.createdAt.toDate())}</span>
              </div>
            </div>
          ))}
          </div>
          ))}
          {img.url && (
          
            <div className="message own">
              <div className="text">
                <img src={img.url} alt="" />
                {/* <span>{formatTime(message.createdAt.toDate())}</span> */}
              </div>
            </div>)
          }

          <div ref={endRef}></div>
        </div>

        <div className="tdetails">
          <div className="tinp" ref={emojiRef}>
            <FontAwesomeIcon
              icon={faFaceSmile}
              className="ticon"
              onClick={() => setOpen((prev) => !prev)}
            />
            <div className="picker">
              <EmojiPicker
                open={open}
                theme="dark"
                onEmojiClick={handleEmoji}
              />
            </div>
            <p>|</p>
            <textarea
              placeholder="Type a message..."
              className="inpMsg"
              ref={textareaRef}
              rows="1"
              value={text}
              onChange={updateData}
              onClick={() => setOpen(false)}
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
      </div>
    </div>
  );
}
