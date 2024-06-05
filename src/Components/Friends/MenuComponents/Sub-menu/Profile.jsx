import React, { useState } from "react";
import "./profile.css";
import { useUserStore } from "../../../../Items/userStore.js";
import dp from "../../../../Items/Man-dp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../../../Items/Firebase.js";
import upload from "../../../../Items/upload.js";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const { currentUser, fetchUserInfo } = useUserStore();
  const [editName, setEditName] = useState(true);
  const [userName, setUserName] = useState(currentUser?.userName);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = async (e) => {
    if (e.target.files[0]) {
      const newAvatar = {
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      };
      setAvatar(newAvatar);
      await uploadNewDp(newAvatar.file);
    }
  };

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const editMyName = () => {
    setEditName(!editName);
  };

  const saveNewUserName = async () => {
    if (currentUser?.id && userName) {
      try {
        const userDocRef = doc(db, "users", currentUser.id);
        await updateDoc(userDocRef, { userName });
        await fetchUserInfo(currentUser.id);
        setEditName(true);
      } catch (err) {
        console.error("Error updating username: ", err);
      }
    }
  };

  const uploadNewDp = async (file) => {
    if (file && currentUser?.id) {
      try {
        const imgUrl = await upload(file);
        const userDocRef = doc(db, "users", currentUser.id);
        await updateDoc(userDocRef, { avatar: imgUrl });
        await fetchUserInfo(currentUser.id);
        setAvatar({ file: null, url: "" });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="profile">
      <h2>My Profile</h2>
      <div className="myDp">
        <label htmlFor="file">
          <img src={avatar.url || currentUser?.avatar || dp} alt="" />
          <div className="editPic">
            <FontAwesomeIcon icon={faPencil} />
          </div>
        </label>
        <input type="file" id="file" onChange={handleAvatar} />
      </div>
      <div className="edit">
        {editName ? (
          <h4 className="pName">{currentUser?.userName}</h4>
        ) : (
          <div className="inp-btn">
            <input type="text" value={userName} onChange={handleChange} placeholder="Name"/>
            <button type="submit" onClick={saveNewUserName}>
              save
            </button>
          </div>
        )}
        <button onClick={editMyName}>
          <FontAwesomeIcon icon={faUserEdit} />
        </button>
      </div>
    </div>
  );
}
