import React, { useState, useEffect } from 'react';
import './App.scss';
import { Message } from "./Components/Message/Message";
import { Form } from './Components/UI/Form/Form';

function App() {
  const [messageList, setMessage] = useState([]);

  const addMessage = textMsg => setMessage([...messageList, {text: textMsg, author: 'John Smith'}]);

  useEffect(() => {
    if(messageList.length && messageList[messageList.length - 1]['author'] === 'system') return;
    const date = new Date();
    let timer = setTimeout(() => setMessage([...messageList, {
      text: 
        `
          ${date.getHours()}:
          ${date.getMinutes()}:
          ${date.getSeconds()}
        `, 
      author: 'system',
    }]), 1500);
    return () => clearTimeout(timer);
  });

  

  return (
    <div className='app'>
      {messageList.map(msg => <Message text={msg.text} author={msg.author} />)}
      <Form onSubmit={addMessage} />
    </div>
  )
}

export default App;
