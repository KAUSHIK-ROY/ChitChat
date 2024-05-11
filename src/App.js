import { useEffect } from 'react';
import './App.css';
import MyProfile from './Components/Friends/MyProfile.jsx';
import Login from './Components/LogIn/Login.jsx';
import Messages from './Components/MyChat/Messages.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Items/Firebase.js';
import {useUserStore} from "./Items/userStore.js"
import Loading from './Items/Loading.jsx'


function App() {

  const {currentUser,isLoading,fetchUserInfo} = useUserStore();

  useEffect(() =>{
    const unsub = onAuthStateChanged(auth, (user) =>{
      fetchUserInfo(user?.uid);
    });
    return ()=>{
      unsub();
    }
  }, [fetchUserInfo]);

  if(isLoading) return <div className='Reload'><Loading/>Loading...</div>
  return (

      <div className='container'>
        {
          currentUser ? 
          (
            <>
          <div className='friends'>
            <MyProfile/>
          </div>
          <div className='myChat'>
            <Messages/>
          </div>
          </>
          )
          :
          (<Login/>)
        }
        
      </div>
  );
}

export default App;
