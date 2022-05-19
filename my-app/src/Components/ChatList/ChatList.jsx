import { Outlet } from 'react-router-dom';
import Chat from '../Chat/Chat';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import { Form } from '../UI/Form/Form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectChats } from '../../store/chats/selectors';
import { addChat, deleteChat } from '../../store/chats/actions';
import { addMessage, deleteMessage } from '../../store/messages/actions';
import { chatsRef, getChatRefById, getMsgsRefById } from '../../services/firebase';
import { onValue, set, remove } from 'firebase/database';
import { useEffect, useState } from 'react';

const ChatList = () => {
    const [chats, setChats] = useState([]);
    // const chats = useSelector(selectChats, shallowEqual);
    const dispatch = useDispatch();

    const handleSubmit = newChatName => {
        const newChat = {
            id: Date.now(),
            name: newChatName,
        }
        const newMessage = {
            chatId: newChat.id,
            message: [], 
        };

        // dispatch(addChat(newChat));
        set(getChatRefById(newChat.id), newChat);
        set(getMsgsRefById(newChat.id), { exists: true, });
        // dispatch(addMessage(newMessage));
    }

    const handleDelete = chatId => {
        remove(getChatRefById(chatId));
        set(getMsgsRefById, null);
       // dispatch(deleteChat(chatId));
       // dispatch(deleteMessage(chatId));
    }

    useEffect(() => {
        const unsubscribe = onValue(chatsRef, (snapshot) => {
            setChats(Object.values(snapshot.val() || {}));
        });

        return unsubscribe;
    }, []);

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Item>
                        {chats.map(el => <Chat key={el.id} id={el.id} name={el.name} handleDelete={handleDelete} />)}
                        <Form onSubmit={handleSubmit} child='Create' />
                    </Item>
                </Grid>
                <Grid item xs={10}>
                    <Item>
                        <Outlet />
                    </Item>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ChatList;
