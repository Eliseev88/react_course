import './Message.scss';
import PropTypes from 'prop-types';

export function Message({text, author}) {
    return (
        <div className='message'>
            <span>{author}:</span>
            <p className='message__paragraph'>{text}</p>
        </div>
    );
}

Message.propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string,
}
