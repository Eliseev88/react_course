import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getAuth,
  } from "firebase/auth";
  import { getDatabase, ref } from "firebase/database";
  
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI39pGXECCRvOKL_awndm4Bzoj9WqVSQM",
  authDomain: "geeks-c59bf.firebaseapp.com",
  projectId: "geeks-c59bf",
  storageBucket: "geeks-c59bf.appspot.com",
  messagingSenderId: "425192632501",
  appId: "1:425192632501:web:f5fbc2de6d9d9981440efc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export const signUp = async (email, pass) => {
  await createUserWithEmailAndPassword(auth, email, pass);
};
export const logIn = async (email, pass) => {
  await signInWithEmailAndPassword(auth, email, pass);
};
export const logOut = async () => {
  await signOut(auth);
};

export const userRef = ref(db, "user");
export const userNameRef = ref(db, "user/name");
export const userShowNameRef = ref(db, "user/showName");
export const chatsRef = ref(db, "chats");
export const msgsRef = ref(db, "messages");
export const getChatRefById = (id) => ref(db, `chats/${id}`);
export const getMsgsRefById = (chatId) => ref(db, `messages/${chatId}`);
export const getMsgsListRefById = (chatId) =>
  ref(db, `messages/${chatId}/messageList`);
