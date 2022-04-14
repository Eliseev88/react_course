import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { chatsReducer } from "./chats/reducer";
import { profileReducer } from "./profile/reducer";
import { messageReducer } from './messages/reducer';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messageReducer,
});

const persistConfig = {
    key: 'gbMessenger',
    storage,
    whitelist: ['chats', 'messages',],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)),
);
 
export const persistor = persistStore(store);
