import Chat from '../Chat/Chat';

const ChatList = ({chats}) => chats.map(el => <Chat key={el.id} name={el.name} />);

export default ChatList;
