import './App.css';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import ChanelListContainer from './components/ChanelListContainer';
import ChanelContainer from './components/ChanelContainer';
import './App.css';
const apiKey = 'dw9thsfxkaws';

const client = StreamChat.getInstance(apiKey);
function App() {
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        <ChanelListContainer />
        <ChanelContainer />
      </Chat>
    </div>
  );
}

export default App;
