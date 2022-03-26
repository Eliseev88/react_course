import './Message.scss';

export function Message({text, author}) {
    return (
        <div className='message'>
            <span>{author}:</span>
            <p className='message__paragraph'>{text}</p>
        </div>
    );
}