import { Button, Container } from '@mui/material';

function Home({ onAuthed }) {
    return (
        <Container maxWidth='lg'>
            <h1>This is Home page</h1>
            <Button onClick={onAuthed}>Auth</Button>
        </Container>  
    )
}

export default Home;
