import { useState, useEffect } from 'react';
import { AUTHORS } from '../../utils/constants';
import { MessageList } from '../../Components/MessageList/MessageList';
import { Form } from '../../Components/UI/Form/Form';
import { Navigate, useParams } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import _ from 'lodash';

const initMessages = {
  1: [],
  2: [],
  3: [],
};

export function Chat() {
    const { id } = useParams();
    const [messageList, setMessage] = useState(initMessages);
    const [chats, prevChats, deletedChatId] = useOutletContext();

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
      if (deletedChatId) {
        const temp = _.assign({}, messageList);
        delete temp[deletedChatId];
        setMessage({...temp})
      } else if (prevChats) {
        const lastChatId = Math.max(...Object.keys(messageList)) + 1;
        setMessage({...messageList, [lastChatId]: []});
      }
    }, [chats]);

    if (!messageList[id]) return <Navigate to='/chat' replace />

    return (
      <>
        <MessageList messages={messageList[id]}/>
        <Form onSubmit={sendMessage} />
      </>
    )
  }
