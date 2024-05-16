import React from "react";
import "./aboutChat.css";
import dp from "../../Items/Man-dp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function AboutChat({ toggleAbout }) {
  return (
    <>
      <div className="aboutContainer">
        <div className="btn">
          <button className="all-btn" onClick={toggleAbout}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <img src={dp} alt="DP" />
        <h2>Hii</h2>
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
    </>
  );
}
