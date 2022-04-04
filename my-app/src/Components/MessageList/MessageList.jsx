import { Message } from '../Message/Message';
import './MessageList.scss';

export const MessageList = ({ messages }) => {
    return (
        <div className={"messageList" + (messages.length ? " messageList__border" : "")}>
            {messages.map(msg => <Message key={msg.id} text={msg.text} author={msg.author} />)}
        </div>
    )
}
