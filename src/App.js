import './App.css';
import MyProfile from './Components/Friends/MyProfile.jsx';
import Messages from './Components/MyChat/Messages.jsx';


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
