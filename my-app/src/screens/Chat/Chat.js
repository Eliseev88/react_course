import { useState, useEffect } from 'react';
import { AUTHORS } from '../../utils/constants';
import { MessageList } from '../../Components/MessageList/MessageList';
import { Form } from '../../Components/UI/Form/Form';
import { Navigate, useParams } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

const initMessages = {
  1: [],
  2: [],
  3: [],
};

export function Chat() {
    const { id } = useParams();
    const [messageList, setMessage] = useState(initMessages);
    const chats = useOutletContext();

    const addMessage = newMsg => setMessage({...messageList, [id]: [...messageList[id], newMsg]});

    const sendMessage = text => addMessage({
      text,
      author: AUTHORS.human,
      id: Date.now(),
    })
    
    useEffect(() => {
      const lastMessage = messageList[id]?.[messageList[id]?.length - 1];
      if (lastMessage?.author  === AUTHORS.human) {
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

    useEffect(() => {
      setMessage({...messageList, [chats.length]: []})
    }, [chats]);

    if (!messageList[id]) return <Navigate to='/chat' replace />
    console.log(messageList)
    return (
      <>
        <MessageList messages={messageList[id]}/>
        <Form onSubmit={sendMessage} />
      </>
    )
  }
