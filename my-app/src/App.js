import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { Chat } from './screens/Chat/Chat';
//import { CHATS } from './utils/constants';
import Home from './Components/Home/Home';
import { Profile } from './Components/Profile/Profile';
import { Container } from '@mui/material';
import ChatList from './Components/ChatList/ChatList';
//import { useState } from 'react';
import { addChat, deleteChat } from './store/chats/actions';
import { addChatMessage, addMessage, deleteMessage } from './store/messages/actions';
import { selectChats } from './store/chats/selectors';
import { selectMessages } from './store/messages/selectors';


// const initMessages = CHATS.reduce((acc, chat) => {
//   acc[chat.id] = [];
//   return acc;
// }, {});

function App() {

  // const [chats, setChats] = useState(CHATS);
  //const [messages, setMessages] = useState(initMessages);

  const chats = useSelector(selectChats, shallowEqual);
  const messages = useSelector(selectMessages, shallowEqual);
  const dispatch = useDispatch();

  const addNewChat = newChat => {
    dispatch(addChat(newChat));
    const newMessage = {
      chatId: newChat.id,
      message: [], 
    };
    dispatch(addMessage(newMessage));
    // setChats(prevChats => [...prevChats, newChat]);
    //setMessages(prevMessages => ({...prevMessages, [newChat.id]: []}));
  }

  const removeChat = id => {
    dispatch(deleteChat(id));
    dispatch(deleteMessage(id));
    // setChats(prevChats => prevChats.filter(chat => chat.id !== id));
    // setMessages(prevMessages => {
    //   const newMessages = {...prevMessages};
    //   delete newMessages[id];
    //   return newMessages;
    // });
  }

  const addNewMessage = (newMsg, id) => {
    const newMessage = {
      chatId: id,
      message: newMsg,
    };
    dispatch(addChatMessage(newMessage));
    //setMessages({ ...messages, [id]: [...messages[id], newMsg] });
  }

  return (
      <BrowserRouter>
        <Container maxWidth="lg" className='app' sx={{ backgroundColor: 'purple', marginBottom: '30px' }}>
          <ul className='app__link-list'>
            <li><NavLink to='/' style={({ isActive }) => ({ color: isActive ? 'gray' : 'white' })}>Home</NavLink></li>
            <li><NavLink to='/profile' style={({ isActive }) => ({ color: isActive ? 'gray' : 'white' })}>Profile</NavLink></li>
            <li><NavLink to='/chat' style={({ isActive }) => ({ color: isActive ? 'gray' : 'white' })}>Chats</NavLink></li>
          </ul>
        </Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<ChatList chats={chats} addChat={addNewChat} deleteChat={removeChat} />}>
            <Route path=':id' element={<Chat messages={messages} addMessage={addNewMessage} />} />
          </Route>
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<h1>404 ERROR</h1>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
