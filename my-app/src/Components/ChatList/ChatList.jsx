import { Outlet } from 'react-router-dom';
import Chat from '../Chat/Chat';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CHATS } from '../../utils/constants';
import { useState } from 'react';
import usePrevious from '../../Hooks/usePrevious';

const ChatList = () => {

    const [chats, setChat] = useState(CHATS);
    const [value, setValue] = useState('');
    const [deletedChatId, setDeletedChatId] = useState(null);

    const addChat = chatName => {
        if (chats.length) setChat([...chats, {id: chats[chats.length - 1].id + 1, name: chatName}]);
        else setChat([{id: 1, name: chatName}]);
    }
    
    const handleChange = event => setValue(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
        setDeletedChatId(null);
        addChat(value);
        setValue('');
    }

    const deleteChat = chatId => {
        const temp = chats.filter(el => el.id !== chatId);
        setChat([...temp]);
        setDeletedChatId(chatId);
    }

    const prevChats = usePrevious(chats);

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Item>
                        {chats.map(el => <Chat key={el.id} id={el.id} name={el.name} deleteChat={deleteChat} />)}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Type chat name.."
                                variant="standard"
                                value={value} 
                                onChange={handleChange}
                                sx={{ marginBottom: '10px' }}
                            />
                            <Button type='submit' variant='contained'>Create</Button>
                        </form>
                    </Item>
                </Grid>
                <Grid item xs={10}>
                    <Item>
                        <Outlet context={[chats, prevChats, deletedChatId]} />
                    </Item>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ChatList;
