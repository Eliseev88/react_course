import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import './Chat.scss';

function Chat ({id, name}) {
    const firstLetter = name[0];
    const secondLetter = name.split(' ')[1][0];
    return (
        <NavLink to={`/chat/${id}`} className='chat__link'>
            <Avatar className='chat'>{firstLetter+secondLetter}</Avatar>
        </NavLink>
    )
}

export default Chat;