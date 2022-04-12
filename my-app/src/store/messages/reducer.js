import { ADD_MESSAGE, ADD_CHAT_MESSAGE, DELETE_MESSAGE } from "./actions";

const initialState = {};

export const messageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_MESSAGE: {
      return {...state, [payload.chatId]: payload.message};
    }
    case ADD_CHAT_MESSAGE: {
        return {...state, [payload.chatId]: [...state[payload.chatId], payload.message]};
    }
    case DELETE_MESSAGE: {
        delete state[payload];
        return state;
    }
    default:
      return state;
  }
};
