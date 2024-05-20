import React, { useState } from "react";
import "./profile.css";
import { useChatStore } from "../../../../Items/chatStore";
import { useUserStore } from "../../../../Items/userStore.js";
import dp from "../../../../Items/Man-dp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPencil, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../../../Items/Firebase.js";
import upload from "../../../../Items/upload.js";
import { doc, setDoc } from "firebase/firestore";

export default function Profile() {
  const { user } = useChatStore();
  const { currentUser } = useUserStore();
  const [editName, setEditName] = useState(true);

  const [userName, setUserName] = useState(currentUser?.userName);
  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const editMyName = () => {
    setEditName(!editName);
  };

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const uploadNewDp = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const formData = new FormData(e.target);

    // const { username, email, password } = Object.fromEntries(formData);

    // VALIDATE UNIQUE USERNAME
    // const usersRef = collection(db, "users");
    // const q = query(usersRef, where("username", "==", username));
    // const querySnapshot = await getDocs(q);
    // if (!querySnapshot.empty) {
    //   return toast.warn("Select another username");
    // }

    try {
      // const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users"), {
        avatar: imgUrl,
      });
    } catch (err) {
      console.log(err);
      // toast.error(err.message);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="profile">
      <form action="" onSubmit={uploadNewDp}>
        <div className="myDp">
          <label htmlFor="file">
            <img src={avatar.url || dp} alt="" />
            <div className="editPic"><FontAwesomeIcon icon={faPencil} /></div>
          </label>
          <input
            type="file"
            id="file"
            onChange={handleAvatar}
          />
        </div>
        <div className="edit">
          {editName ? (
            <h2>{currentUser?.userName}</h2>
          ) : (
            <div className="inp-btn">
              <input type="text" value={userName} onChange={handleChange} />
              <button type="submit" onClick={() => setEditName(true)}>
                save
              </button>
            </div>
          )}
          <button onClick={editMyName}>
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
        </div>
      </form>
    </div>
  );
}
