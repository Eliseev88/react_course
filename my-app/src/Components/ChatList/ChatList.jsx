import { Outlet } from 'react-router-dom';
import Chat from '../Chat/Chat';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import { Form } from '../UI/Form/Form';

const ChatList = ({chats, addChat, deleteChat}) => {

    const handleSubmit = newChatName => {
        const newChat = {
            id: Date.now(),
            name: newChatName,
        }
        addChat(newChat);
    }

    const handleDelete = chatId => {
        deleteChat(chatId);
    }
    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Item>
                        {chats.map(el => <Chat key={el.id} id={el.id} name={el.name} handleDelete={handleDelete} />)}
                        <Form onSubmit={handleSubmit} />
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
