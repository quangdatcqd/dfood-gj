import { React, useState, useEffect, useCallback } from 'react';


import { Avatar, TextField, Grid, List, ListItemButton, Typography, ListItemText, Divider, Box } from '@mui/material';
import { debounce } from "debounce";
import { NavLink } from 'react-router-dom';
import GojekAPI from '../API/GojekAPI';
const ChoseAddress = (props) => {
    const { setOpen, setCurrentLoc } = props;

    const [addressOptions, setAddressOptions] = useState([]);
    const [keyword, setKeyword] = useState("");

    const handleChangeAddress = (event) => {
        setKeyword(event.target.value);
    };
    useEffect(() => {
        debounceDropDown(keyword);

    }, [keyword]);
    const fetchAddressOptions = async (key) => {

        var data = await GojekAPI.searchAddress(key);
        setAddressOptions(data?.results);
    }


    const debounceDropDown = useCallback(debounce((nextValue) => fetchAddressOptions(nextValue), 500), [])
    const handleClear = () => {
        setKeyword("");
    }



    const handleSelectAddress = async (item) => {
        var data = await GojekAPI.setAddress(item?.placeid);


        var locationData =
        {
            address: item?.address,
            name: item?.name,
            placeid: item?.placeid,
            latitude: data?.data?.latitude,
            longitude: data?.data?.longitude,

        }
        localStorage.setItem("customerLoc", JSON.stringify(locationData))
        setCurrentLoc(locationData);
        setOpen(false);
    }
    return (
        <Box style={{ padding: "10px", display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }} >

            {/* <Typography component="h1" variant="h5">
                Nhập Địa Chỉ
            </Typography> */}
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
                                        {/* <NavLink
                                            style={{ textDecoration: 'none', color: "purple" }}
                                            to={{
                                                pathname: "/restaurant",

                                            }}
                                            state={item}
                                        // onClick={() => localStorage.setItem("customerLoc", JSON.stringify(item))}

                                        > */}
                                        <ListItemButton
                                            onClick={() => handleSelectAddress(item)}
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
                                        {/* </NavLink> */}
                                        <Divider variant="inset" className='m-0' component="li" />
                                    </div>
                                )
                            })
                        }


                    </List>
                </Grid>

            </Grid>
        </Box >
    );
};



export default ChoseAddress;
