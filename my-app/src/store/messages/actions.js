export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGES::DELETE_MESSAGE';
export const ADD_CHAT_MESSAGE = 'MESSAGES::ADD_CHAT_MESSAGE';

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message,
});

export const addChatMessage = (chatMessage) => ({
    type: ADD_CHAT_MESSAGE,
    payload: chatMessage,
});

export const deleteMessage = (chatId) => ({
    type: DELETE_MESSAGE,
    payload: chatId,
});
