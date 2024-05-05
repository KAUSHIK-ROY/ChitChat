import './App.css';
import MyProfile from './Components/Friends/myProfile.jsx';
import Messages from './Components/MyChat/messages.jsx';
// import AllChats from './Components/Friends/allChats.jsx';

function App() {
  return (
    <>
      <div className='container'>
        <div className='friends'>
          <MyProfile/>
        </div>

        <div className='myChat'>
          <Messages/>
        </div>
      </div>
    </>
  );
}

export default App;
