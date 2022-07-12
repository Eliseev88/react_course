import { Alert, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logIn, signUp } from '../../services/firebase';
import { LoginForm } from '../LoginForm/LoginForm';

function Home({ isSignup }) {
    const [error, setError] = useState(null);

    const handeSubmit = async ({ login, pass }) => {
        try {
            if (isSignup) {
                await signUp(login, pass);
            } else {
                await logIn(login, pass);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        setError(null);
    }, [isSignup]);

    return (
        <Container maxWidth='lg'>
            <LoginForm onSubmit={handeSubmit} />
            {error && <Alert severity="error">{error}</Alert>}
            <Link to={isSignup ? '/' : '/signup'}>
                {isSignup ? 'to login' : 'to signup'}
            </Link>
        </Container>  
    )
}

export default Home;
