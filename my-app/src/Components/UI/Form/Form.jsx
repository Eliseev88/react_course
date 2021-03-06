import React, {useRef, useState} from 'react';
import './Form.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

export const Form = ({onSubmit, child}) => {
    const [value, setValue] = useState('');
    
    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(value);
        setValue('');
    }

    const handleChange = event => setValue(event.target.value);

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    },[value]);
        
    return (
        <form className="form" onSubmit={handleSubmit}>
            <TextField  sx={{ marginRight: '20px' }} 
                        className='form__input' 
                        id="standard-basic" 
                        label="Type your message.." 
                        variant="standard" 
                        value={value} 
                        onChange={handleChange}
                        autoFocus
                        inputRef={inputRef}
            />
            <Button type='submit' variant='contained'>{child}</Button>
        </form>
    )
}
