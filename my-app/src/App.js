import React, { useState, useEffect } from 'react';
import './App.scss';
import { MessageList } from './Components/MessageList/MessageList';
import ChatList from './Components/ChatList/ChatList';
import { Form } from './Components/UI/Form/Form';
import { AUTHORS, CHATS } from './utils/constants';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';

function App() {
  const [messageList, setMessage] = useState([]);

  const addMessage = newMsg => setMessage([...messageList, newMsg]);

  const sendMessage = text => addMessage({
    text,
    author: AUTHORS.human,
    id: Date.now(),
  })

  useEffect(() => {
    if (messageList[messageList.length - 1]?.author  === AUTHORS.human) {
      const date = new Date();
      let timer = setTimeout(() => addMessage({
        text: 
        `
          ${date.getHours()}:
          ${date.getMinutes()}:
          ${date.getSeconds()}
        `,
        author: AUTHORS.robot,
        id: Date.now(),
      }), 1500);

      return () => clearTimeout(timer);
    }
  }, [messageList]);

  return (
    <div className='app'>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Item>
            <ChatList chats={CHATS} />
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
            <MessageList messages={messageList}/>
            <Form onSubmit={sendMessage} />
          </Item>
        </Grid>
      </Grid>
    </div>
  )
}

export default App;
