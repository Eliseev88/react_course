import Avatar from '@mui/material/Avatar';

function Chat ({name}) {
    const firstLetter = name[0];
    const secondLetter = name.split(' ')[1][0];
    return (
        <Avatar sx={{ color: 'blue' }}>{firstLetter+secondLetter}</Avatar>
    )
}

export default Chat;