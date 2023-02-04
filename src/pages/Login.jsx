import { React, useState } from 'react';
import { Container, Box, Avatar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GojekAPI from '../API/GojekAPI';
import { useSnackbar } from 'notistack';
import { NavLink } from 'react-router-dom';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();



    const fetchToken = async () => {
        setLoading(true);
        var data = await GojekAPI.getToken();
        if (data?.access_token) {
            localStorage.setItem("G-Token", data?.access_token);
            setLoading(false)
            enqueueSnackbar("Đã lấy được token", { variant: 'success' })
        } else {
            enqueueSnackbar(data, { variant: 'error' })
        }
        setLoading(false)
    }

    return (
        <Container component="main" maxWidth="xs">

            <Box
                sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'success.dark' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <LoadingButton
                    size="small"
                    onClick={fetchToken}
                    loading={loading}
                    loadingIndicator="Đợi.."
                    variant="contained"
                >
                    YÊU CẦU ĐĂNG NHẬP
                </LoadingButton>


                <Box style={{ marginTop: "20px", fontSize: "22px" }}>
                    <NavLink to={"/home"}>Đến với FOOD</NavLink>
                </Box>



            </Box>

        </Container>
    );
}

export default Login;
