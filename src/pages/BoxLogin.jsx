import { React } from 'react';
import { Container } from '@mui/material';
import BoxLoginGojek from '../components/BoxLoginGojek';
import Login from './Home/Header/components/Login'

const BoxLogin = () => {



    return (
        <Container component="main" maxWidth="xs">

            {/* <BoxLoginGojek />
             */}
            <Login />

        </Container>
    );
}
export default BoxLogin;
