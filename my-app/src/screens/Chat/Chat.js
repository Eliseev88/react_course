import { useEffect, useMemo, useState } from 'react';
import { AUTHORS } from '../../utils/constants';
import { MessageList } from '../../Components/MessageList/MessageList';
import { Form } from '../../Components/UI/Form/Form';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessagesByChatId } from '../../store/messages/selectors';
import { addChatMessage, addMessageWithReplay } from '../../store/messages/actions';
import { onValue, push } from 'firebase/database';
import { auth, getMsgsListRefById, getMsgsRefById } from '../../services/firebase';

export function Chat() {
    const { id } = useParams();
    const getMessages = useMemo(() => selectMessagesByChatId(id), [id]);
    // const messages = useSelector(getMessages);
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();

    const sendMessage = text => {
      push(getMsgsListRefById(id), {
        author: auth.currentUser.email,
        text,
        id: Date.now(),
      });

      // const message = {
      //   author: AUTHORS.human,
      //   text,
      //   id: Date.now(),
      // };

      // dispatch(addMessageWithReplay(message, id));
    }
    
    useEffect(() => {
      const unsubscribe = onValue(getMsgsRefById(id), snapshot => {
        const val = snapshot.val();
        if (!snapshot.val()?.exists) {
          setMessages(null);
        } else {
          setMessages(Object.values(val.messageList || {}));
        }
      });

      return unsubscribe;
    }, [id]);

    if (!messages) return <Navigate to='/chat' replace />

    return (
      <>
        <MessageList messages={messages}/>
        <Form onSubmit={sendMessage} child='Send' />
      </>
    )
  }
