import { useEffect } from 'react';
import { AUTHORS } from '../../utils/constants';
import { MessageList } from '../../Components/MessageList/MessageList';
import { Form } from '../../Components/UI/Form/Form';
import { Navigate, useParams } from 'react-router-dom';

export function Chat({messages, addMessage}) {
    const { id } = useParams();

    const sendMessage = text => addMessage({
      text,
      author: AUTHORS.human,
      id: Date.now(),
    }, id);
    
    useEffect(() => {
      const lastMessage = messages[id]?.[messages[id]?.length - 1];
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
        }, id), 1500);
  
        return () => clearTimeout(timer);
      }
    }, [messages]);

    if (!messages[id]) return <Navigate to='/chat' replace />

    return (
      <>
        <MessageList messages={messages[id]}/>
        <Form onSubmit={sendMessage} />
      </>
    )
  }
