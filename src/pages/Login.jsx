import { React, useState } from 'react';
import { Container, Box, Avatar } from '@mui/material';


import { NavLink } from 'react-router-dom';
import BoxLoginGojek from '../components/BoxLoginGojek';

const Login = () => {



    return (
        <Container component="main" maxWidth="xs">

            <BoxLoginGojek />

        </Container>
    );
}
export default Login;
