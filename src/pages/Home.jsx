import { React, useCallback, useEffect, useState } from 'react';
import { Avatar, TextField, Grid, List, ListItemButton, Container, Typography, ListItemText, Divider, Box, } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import GojekAPI from '../API/GojekAPI';
import { debounce } from "debounce";
import { NavLink } from 'react-router-dom';
import Cartpreview from '../components/Cartpreview';
import { useSnackbar } from 'notistack';


export default function Home() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [addressOptions, setAddressOptions] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchAddressOptions = async (key) => {
        var data = await GojekAPI.searchAddress(key);
        setAddressOptions(data?.results);
    }
    useEffect(() => {
        debounceDropDown(keyword);

    }, [keyword]);

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



    const handleChangeAddress = (event) => {
        setKeyword(event.target.value);
    };

    const debounceDropDown = useCallback(debounce((nextValue) => fetchAddressOptions(nextValue), 500), [])


    const handleClear = () => {
        setKeyword("");
    }

    return (
        <div className='bg-light' style={{ height: "1500px" }}>
            <Cartpreview />
            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <LoadingButton
                        size="small"
                        onClick={fetchToken}
                        loading={loading}
                        loadingIndicator="Đợi.."
                        variant="contained"
                    >
                        GETTOKEN
                    </LoadingButton>
                    <Avatar sx={{ m: 1, bgcolor: 'success.dark' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Nhập Địa Chỉ
                    </Typography>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="address"
                                label="Nhập thông tin Đ/C"
                                name="address"
                                value={keyword}
                                // autoComplete="address"
                                onChange={handleChangeAddress}
                            />

                            <List sx={{ width: '100%', bgcolor: 'background.paper' }} className="mr-0 mt-2 rounded">



                                {
                                    addressOptions?.map((item, key) => {
                                        return (
                                            <div key={key}>
                                                <NavLink
                                                    style={{ textDecoration: 'none', color: "purple" }}
                                                    to={{
                                                        pathname: "/restaurant",

                                                    }}
                                                    state={item}
                                                // onClick={() => localStorage.setItem("customerLoc", JSON.stringify(item))}

                                                >
                                                    <ListItemButton
                                                    >
                                                        <ListItemText
                                                            primary={item?.address}
                                                            secondary={
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                > {item?.name} </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </NavLink>
                                                <Divider variant="inset" className='m-0' component="li" />
                                            </div>
                                        )
                                    })
                                }


                            </List>
                        </Grid>

                    </Grid>





                </Box>

            </Container>

        </div >
    );
}