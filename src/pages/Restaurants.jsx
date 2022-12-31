import { TextField, Box, Container } from '@mui/material';
import { debounce } from 'debounce';
import { React, useCallback, useEffect, useState, useContext } from 'react';

import { useParams, useLocation } from 'react-router-dom';
import SwapeRestaurant from '../components/SwapeRestaurant';
import GojekAPI from '../API/GojekAPI';
import './style.css'
import BackBtn from '../components/BackBtn';
import Cartpreview from '../components/Cartpreview';
import { CartContext } from '../Contexts/CartContext';

function Restaurants(props) {

    const { setLocData, resetCart } = useContext(CartContext);
    // const { dataAddress } = props;
    let location = useLocation();
    const params = useParams();

    const [dataRestaurant, setDataRestaurant] = useState("");

    const [customerLoc, setCustomerLoc] = useState("");


    let dataLoc = [];

    const fetchAddress = async () => {
        var data = await GojekAPI.setAddress(location?.state?.placeid);

        var cusLoc = data?.data.latitude + "," + data?.data.longitude;

        localStorage.setItem("customerLoc", JSON.stringify(

            {
                address: location?.state?.address,
                name: location?.state?.name,
                placeid: location?.state?.placeid,
                latitude: data?.data?.latitude,
                longitude: data?.data?.longitude,

            }
        ))
        setCustomerLoc(cusLoc);
    }

    const fetchRestaurant = async (keyword, customerLoc) => {

        var data = await GojekAPI.searchRestaurant(keyword, customerLoc);
        setDataRestaurant(data);
        resetCart();

    }

    useEffect(() => {
        fetchAddress();
        console.log(location)
    }, []);

    const debounceDropDown = useCallback(debounce((nextValue, customerLoc) => fetchRestaurant(nextValue, customerLoc), 500), [])

    const handleChangeKeyword = (e) => {
        // if (e.target.value != "")
        debounceDropDown(e.target.value, customerLoc);
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

                    <h3>{(dataRestaurant?.data?.cards) && dataRestaurant?.data?.cards[3]?.content?.title}</h3>
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
