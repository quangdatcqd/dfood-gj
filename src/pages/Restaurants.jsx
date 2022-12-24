import { TextField, Box, Container } from '@mui/material';
import { debounce } from 'debounce';
import { React, useCallback, useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import SwapeRestaurant from '../components/SwapeRestaurant';
import GojekAPI from '../API/GojekAPI';
import './style.css'
import BackBtn from '../components/BackBtn';
import Cartpreview from '../components/Cartpreview';
function Restaurants(props) {
    const params = useParams();
    const [dataRestaurant, setDataRestaurant] = useState("");
    const [address, setAddress] = useState("");
    // const [keyword, setKeyword] = useState("");




    const fetchAddress = async () => {
        var data = await GojekAPI.setAddress(params?.id);
        // setDataRestaurant()  
        setAddress(data?.data.latitude + "," + data?.data.longitude);

    }

    const fetchRestaurant = async (keyword, address) => {

        var data = await GojekAPI.searchRestaurant(keyword, address);
        setDataRestaurant(data);

        console.log(data)

    }

    useEffect(() => {
        fetchAddress();

    }, []);

    const debounceDropDown = useCallback(debounce((nextValue, address) => fetchRestaurant(nextValue, address), 500), [])

    const handleChangeKeyword = (e) => {
        // if (e.target.value != "")
        debounceDropDown(e.target.value, address);
    }




    return (
        <div className='bg-light w-100'   >
            <BackBtn />
            <Cartpreview />
            <Container >
                < Box
                    sx={{
                        paddingTop: "10px",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        fullWidth
                        id="address"
                        label="Nhập nhà hàng"
                        name="address"
                        // value={keyword}
                        // autoComplete="address"
                        onChange={handleChangeKeyword}
                    />
                </Box >
                {/* <Button onClick={() => setKeyword("")} className="materialBtn">
                Clear
            </Button> */}

                <div className='query-result'>
                    <h3>{(dataRestaurant?.data?.cards) ? dataRestaurant?.data?.cards[0]?.content?.title : ""}</h3>
                    <h3>{dataRestaurant?.data?.cards ? dataRestaurant?.data?.cards[0]?.content?.texts?.original : ""}</h3>
                    <h6>{dataRestaurant?.data?.cards ? dataRestaurant?.data?.cards[0]?.content?.sub_title : ""}</h6>
                    {/* {console.log(dataRestaurant?.data?.cards[0]?.content?.title)} */}
                    < SwapeRestaurant dataRestaurant={dataRestaurant?.data?.cards ? dataRestaurant?.data?.cards[0] : []} />

                    <h3>{(dataRestaurant?.data?.cards) ? dataRestaurant?.data?.cards[3]?.content?.title : ""}</h3>
                    {/* {console.log(dataRestaurant?.data?.cards[0]?.content?.title)} */}
                    < SwapeRestaurant dataRestaurant={dataRestaurant?.data?.cards ? dataRestaurant?.data?.cards[3] : []} />


                    {/* <h3>{(dataRestaurant?.data?.cards) ? dataRestaurant?.data?.cards[7]?.content?.title : ""}</h3> */}
                    {/* {console.log(dataRestaurant?.data?.cards[0]?.content?.title)} */}
                    {/* < SwapeRestaurant dataRestaurant={dataRestaurant?.data?.cards ? dataRestaurant?.data?.cards[7] : []} /> */}
                    {
                        // dataRestaurant?.data?.cards?.map((item, key) => { 
                        //     return (

                        //         <div>
                        //             <h3>{item?.content?.title}</h3>
                        //             < SwapeRestaurant dataRestaurant={dataRestaurant} />
                        //         </div>
                        //     )
                        // })
                    }



                </div>
            </Container>
        </div >
    );
};






export default Restaurants;
