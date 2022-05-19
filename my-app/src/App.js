import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Chat } from './screens/Chat/Chat';
import Home from './Components/Home/Home';
import { Profile } from './Components/Profile/Profile';
import { Container } from '@mui/material';
import ChatList from './Components/ChatList/ChatList';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import { useEffect, useState } from 'react';
import { PublicRoute } from './Components/PublicRoute/PublicRoute';
import { Articles } from './screens/Articles/Articles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';

function App() {

  const [authed, setAuthed] = useState(false);

  const handleLogin = () => {
    setAuthed(true);
  } 

  const handleLogout = () => {
    setAuthed(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleLogin();
      } else {
        handleLogout();
      }
    });
    
    return unsubscribe;
  }, []);

  return (
      <BrowserRouter>
        <Container maxWidth="lg" className='app' sx={{ backgroundColor: 'purple', marginBottom: '30px' }}>
          <ul className='app__link-list'>
            <li><NavLink to='/' style={({ isActive }) => ({ color: isActive ? 'gray' : 'white' })}>Home</NavLink></li>
            <li><NavLink to='/profile' style={({ isActive }) => ({ color: isActive ? 'gray' : 'white' })}>Profile</NavLink></li>
            <li><NavLink to='/chat' style={({ isActive }) => ({ color: isActive ? 'gray' : 'white' })}>Chats</NavLink></li>
            <li><NavLink to='/articles' style={({ isActive }) => ({ color: isActive ? 'gray' : 'white' })}>Articles</NavLink></li>
          </ul>
        </Container>
        <Routes>
          <Route path='/' element={ <PublicRoute authed={authed} /> }>
            <Route path='' element={<Home onAuthed={ handleLogin } />} />
            <Route path='signup' element={<Home onAuthed={ handleLogin } isSignup />} />
          </Route>
          <Route path='/chat' element={<ChatList />}>
            <Route path=':id' element={<Chat />} />
          </Route>
          <Route path='/profile' element={<PrivateRoute authed={authed} />} >
            <Route path='' element={<Profile onLogout={handleLogout} />} />
          </Route>
          <Route path='/articles' element={<Articles />} />
          <Route path='*' element={<h1>404 ERROR</h1>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
