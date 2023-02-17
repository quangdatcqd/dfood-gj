import { React, useState } from 'react';
import { Container, Box, Avatar } from '@mui/material';


import { NavLink } from 'react-router-dom';
import BoxLoginGojek from '../components/BoxLoginGojek';

const Login = () => {



    return (
        <Container component="main" maxWidth="xs">

            <BoxLoginGojek />
            <Box
                sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}

            >
                <Box style={{ marginTop: "20px", fontSize: "22px" }}>
                    <NavLink to={"/home"}>Đến với FOOD</NavLink>
                </Box>
            </Box>
        </Container>
    );
}
export default Login;
