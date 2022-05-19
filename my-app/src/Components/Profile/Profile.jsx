import { Button, Checkbox, Container } from '@mui/material';
import { useSelector, useDispatch, connect } from 'react-redux';
import { initProfileTrack, setName, setNameFB, setShowName, stopProfileTrack, toggleCheckbox } from '../../store/profile/actions';
import { Form } from '../UI/Form/Form';
import { selectName, selectShowName } from '../../store/profile/selectors';
import { logOut, userNameRef, userRef, userShowNameRef } from '../../services/firebase';
import { useEffect, useState } from 'react';
import { set } from 'firebase/database';

// function Profile() {
//     const dispatch = useDispatch()
//     const name  = useSelector(selectName);
//     const showName = useSelector(selectshowName);

//     const setShowName = () => {
//         dispatch(toggleCheckbox);
//     }

//     const handleSubmit = text => {
//         dispatch(setName(text));
//     }

//     return (
//         <Container maxWidth='lg'>
//             <h1>This is Profile page</h1>
//             {showName && <span>{name}</span>}
//             <Checkbox onChange={setShowName} />
//             <Form onSubmit={handleSubmit} />
//         </Container>
//     )
// }

// export default Profile;

function ProfileToConnect({ name, showName, changeName, changeCheckBox }) {
    const dispatch = useDispatch();

    const setShowName = () => {
        changeCheckBox();
        set(userShowNameRef, !showName);
    }

    const handleSubmit = text => {
        changeName(text);
        set(userNameRef, text);
    }

    useEffect(() => {
        dispatch(initProfileTrack());

        return () => {
            dispatch(stopProfileTrack());
        };
    }, []);

    return (
        <Container maxWidth='lg'>
            <h1>This is Profile page</h1>
            <Button onClick={logOut}>Logout</Button>
            {showName && <span>{name}</span>}
            <Checkbox onChange={setShowName} />
            <Form onSubmit={handleSubmit} child='Change' />
        </Container>
    )
}

// Для получения данных
const mapStateToProps = state => ({
 name: state.profile.name,
 showName: state.profile.showName,
});

// Для изменения
const mapDispatchToProps = {
    changeName: setName, 
    changeCheckBox: () => toggleCheckbox,
}

export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileToConnect);
