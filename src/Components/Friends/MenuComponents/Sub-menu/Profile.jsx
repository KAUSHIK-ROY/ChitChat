import React, { useState } from 'react';
import './profile.css';
import { useChatStore } from '../../../../Items/chatStore';
import { useUserStore } from "../../../../Items/userStore.js";
import dp from '../../../../Items/Man-dp.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserEdit } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const { user } = useChatStore();
  const {currentUser} = useUserStore();
  const [editName,setEditName] = useState(true);
  const editMyName = ()=>{
    setEditName(!editName)
  }

  return (
    <div className='profile'>
        <div className="myDp">
          <img src={user?.avatar || dp} alt="" />
        </div>
        <div className="edit">
          {editName ? (<h2>{currentUser?.userName}</h2>) 
          : 
          (<div className='inp-btn'><input type="text" value={currentUser?.userName}/>
          <button type='submit'>save</button>
          </div>)}
          <button onClick={editMyName}>
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
        </div>
    </div>
  )
}
