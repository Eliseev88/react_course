import { useState } from "react";
import { Button, TextField } from '@mui/material';

export const LoginForm = ({ onSubmit }) => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ login, pass });

    setLogin("");
    setPass("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField 
        type="email" 
        value={login} 
        onChange={handleChangeLogin} 
        id="outlined-basic-mail" 
        label="E-mail" 
        variant="outlined"
        sx={ {marginRight: '20px'} }
    />
      <TextField 
        type="password" 
        value={pass} 
        onChange={handleChangePass} 
        id="outlined-basic-pass" 
        label="Password" 
        variant="outlined" 
    />
      <br />
      <br />
      <Button type='submit' variant="contained">Send</Button>
      <br />
      <br />
    </form>
  );
};
