import './App.css';
import MyProfile from './Components/Friends/myProfile.jsx';
import Messages from './Components/MyChat/messages.jsx';
import AllChats from './Components/Friends/allChats.jsx';
import ChatNav from './Components/MyChat/chatNav.jsx';
// import TypingDiv from './Components/MyChat/typingDiv.jsx';

function App() {
  return (
    <>
      <div className='container'>
        <div className='friends'>
          <MyProfile/>
          <AllChats/>
        </div>

        <div className='myChat'>
          <ChatNav/>
          <Messages/>
        </div>
      </div>
    </>
  );
}

export default App;
