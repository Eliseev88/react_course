import './Message.scss';

export function Message({name: userName = 'Sara', message}) {
    return (
        <p className='message__paragraph'>{message}, {userName}</p>
    );
}