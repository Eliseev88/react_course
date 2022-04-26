import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Chat } from './screens/Chat/Chat';
import Home from './Components/Home/Home';
import { Profile } from './Components/Profile/Profile';
import { Container } from '@mui/material';
import ChatList from './Components/ChatList/ChatList';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import { useState } from 'react';
import { PublicRoute } from './Components/PublicRoute/PublicRoute';

function App() {

  const [authed, setAuthed] = useState(false);

  const handleLogin = () => {
    setAuthed(true);
  } 

  const handleLogout = () => {
    setAuthed(false);
  } 

  return (
      <BrowserRouter>
        <Container maxWidth="lg" className='app' sx={{ backgroundColor: 'purple', marginBottom: '30px' }}>
          <ul className='app__link-list'>
            <li><NavLink to='/' style={({ isActive }) => ({ color: isActive ? 'gray' : 'white' })}>Home</NavLink></li>
            <li><NavLink to='/profile' style={({ isActive }) => ({ color: isActive ? 'gray' : 'white' })}>Profile</NavLink></li>
            <li><NavLink to='/chat' style={({ isActive }) => ({ color: isActive ? 'gray' : 'white' })}>Chats</NavLink></li>
          </ul>
        </Container>
        <Routes>
          <Route path='/' element={ <PublicRoute authed={authed} /> }>
            <Route path='' element={<Home onAuthed={ handleLogin } />} />
          </Route>
          <Route path='/chat' element={<ChatList />}>
            <Route path=':id' element={<Chat />} />
          </Route>
          <Route path='/profile' element={<PrivateRoute authed={authed} />} >
            <Route path='' element={<Profile onLogout={handleLogout} />} />
          </Route>
          <Route path='*' element={<h1>404 ERROR</h1>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
