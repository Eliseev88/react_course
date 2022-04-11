import { Checkbox, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckbox } from '../../store/profile/actions';

function Profile() {
    const dispatch = useDispatch()
    const state  = useSelector(state => state);
    const setShowName = () => {
        dispatch(toggleCheckbox);
    }

    return (
        <Container maxWidth='lg'>
            <h1>This is Profile page</h1>
            {state.showName && <span>{state.name}</span>}
            <Checkbox onChange={setShowName} />
        </Container>  
    )
}

export default Profile;
