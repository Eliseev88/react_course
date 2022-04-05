import { Outlet } from 'react-router-dom';
import Chat from '../Chat/Chat';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CHATS } from '../../utils/constants';
import { useState } from 'react';

const ChatList = () => {

    const [chats, setChat] = useState(CHATS);
    const [value, setValue] = useState('');

    const addChat = chatName => setChat([...chats, {id: chats[chats.length - 1].id + 1, name: chatName}]);
    
    const handleChange = event => setValue(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
        addChat(value);
        setValue('');
    }

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Item>
                        {chats.map(el => <Chat key={el.id} id={el.id} name={el.name} />)}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Type chat name.."
                                variant="standard"
                                value={value} 
                                onChange={handleChange}
                            />
                            <Button type='submit' variant='contained'>Create</Button>
                        </form>
                    </Item>
                </Grid>
                <Grid item xs={10}>
                    <Item>
                        <Outlet context={chats} />
                    </Item>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ChatList;
