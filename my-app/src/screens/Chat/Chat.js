import { useEffect, useMemo } from 'react';
import { AUTHORS } from '../../utils/constants';
import { MessageList } from '../../Components/MessageList/MessageList';
import { Form } from '../../Components/UI/Form/Form';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessagesByChatId } from '../../store/messages/selectors';
import { addChatMessage, addMessageWithReplay } from '../../store/messages/actions';

export function Chat() {
    const { id } = useParams();
    const getMessages = useMemo(() => selectMessagesByChatId(id), [id]);
    const messages = useSelector(getMessages);
    const dispatch = useDispatch();

    const sendMessage = text => {
      const message = {
        author: AUTHORS.human,
        text,
        id: Date.now(),
      };

      dispatch(addMessageWithReplay(message, id));
    }
    
    if (!messages) return <Navigate to='/chat' replace />

    return (
      <>
        <MessageList messages={messages}/>
        <Form onSubmit={sendMessage} />
      </>
    )
  }
