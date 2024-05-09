import './App.css';
import MyProfile from './Components/Friends/MyProfile.jsx';
import Login from './Components/LogIn/Login.jsx';
import Messages from './Components/MyChat/Messages.jsx';



function App() {

  const user =true;
  return (

      <div className='container'>
        {
          user ? 
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
