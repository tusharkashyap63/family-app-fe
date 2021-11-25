import './App.css';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import ChanelListContainer from './components/ChanelListContainer';
import ChanelContainer from './components/ChanelContainer';
import './App.css';
import Auth from './components/Auth';

const cookies = new Cookies();

const apiKey = 'dw9thsfxkaws';

const client = StreamChat.getInstance(apiKey);

const authToken = cookies.get('token');

if (authToken) {
  client.connectUser(
    {
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
    },
    authToken
  );
}

function App() {
  if (!authToken) return <Auth />;

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
