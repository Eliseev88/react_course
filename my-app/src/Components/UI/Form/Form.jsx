import React, {useState} from 'react';
import './Form.scss';

export const Form = ({onSubmit}) => {
    const [value, setValue] = useState('');
    
    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(value);
        setValue('');
    }

    const handleChange = event => setValue(event.target.value);

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} placeholder="Type your message.."/>
            <input type="submit" />
        </form>
    )
}