import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import './Chat.scss';

function Chat ({id, name, handleDelete}) {
    
    const firstLetter = name[0];
    const secondLetter = name.split(' ')[1][0];

    return (
        <div className='chat__wrapper'>
            <NavLink to={`/chat/${id}`} className='chat__link'>
                <Avatar className='chat'>{firstLetter+secondLetter}</Avatar>
            </NavLink>
            <Button variant="contained" onClick={() => handleDelete(id)}>Delete</Button>
        </div>
    )
}

export default Chat;