import React from "react";
import "./aboutChat.css";
import dp from "../../Items/Man-dp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useChatStore } from "../../Items/chatStore";

export default function AboutChat({ toggleAbout }) {
  const {user} = useChatStore();

  return (
    
      <div className="aboutContainer">
        <div className="btn">
          <button className="cross-btn" onClick={toggleAbout}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="btn3">
          <button className="back-btn" onClick={toggleAbout}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
        <img src={user?.avatar || dp} alt="DP" />
        <h2>{user?.userName}</h2>
        <div className="media">
            <h2>Media</h2>
            <div className="allMedia">
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
                <div className="blank">Pic</div>
            </div>
        </div>
        <button className="block-btn">Block User</button>
      </div>
  );
}
