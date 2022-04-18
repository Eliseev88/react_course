import { AUTHORS } from "../../utils/constants";

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

let timer = null;

export const addMessageWithReplay = (message, chatId) => (dispatch) => {
    dispatch(addChatMessage({message, chatId}));

    if (message?.author  === AUTHORS.human) {
      const date = new Date();

      const robotMessage = {
        text: 
        `
          ${date.getHours()}:
          ${date.getMinutes()}:
          ${date.getSeconds()}
        `,
        author: AUTHORS.robot,
        id: Date.now(),
      };

      const newRobotMsg = {
        message: robotMessage,
        chatId: chatId,
      };

      clearTimeout(timer);
      timer = setTimeout(() => dispatch(addChatMessage(newRobotMsg)), 1500);
    }
}
