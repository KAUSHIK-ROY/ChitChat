import React from "react";
import "./subMenu.css";
import Profile from "./Sub-menu/Profile.jsx";
import Notifications from "./Sub-menu/Notifications.jsx";
import Images_videos from "./Sub-menu/Images_videos.jsx";
import Storage from "./Sub-menu/Storage.jsx";
import Settings from "./Sub-menu/Settings.jsx";
import About_us from "./Sub-menu/About_us.jsx";

export default function SubMenu({ subMenu }) {
  return (
    <div className='subMenu'>
      {subMenu === 0 && <Profile />}
      {subMenu === 1 && <Notifications />}
      {subMenu === 2 && <Images_videos />}
      {subMenu === 3 && <Storage />}
      {subMenu === 4 && <Settings />}
      {subMenu === 5 && <About_us />}
    </div>
  );
}