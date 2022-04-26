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

const ChatList = () => {

    const chats = useSelector(selectChats, shallowEqual);
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

        dispatch(addChat(newChat));
        dispatch(addMessage(newMessage));
    }

    const handleDelete = chatId => {
       dispatch(deleteChat(chatId));
       dispatch(deleteMessage(chatId));
    }

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
