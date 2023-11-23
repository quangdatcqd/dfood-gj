import { React, useState } from 'react';
import { Container } from '@mui/material';
import BoxLoginGojek from '../components/BoxLoginGojek';
import Login from './Home/Header/components/Login'

const BoxLogin = () => {
    const [open, setOpen] = useState(true);


    return (
        <Container component="main" maxWidth="xs">

            <BoxLoginGojek />

            <Login open={open} setOpen={setOpen} />

        </Container>
    );
}
export default BoxLogin;
