import { AvatarGroup, Box, CardContent, CardMedia, Paper, Stack, Typography, } from '@mui/material';
import { React, useState, useEffect, memo } from 'react';

import { GojekAPI } from '../API/GojekAPI';
import { styled } from '@mui/material/styles';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import VerifiedIcon from '@mui/icons-material/Verified';
import { fomatCurrency } from '../common';
import BoxBtnSelect from '../components/BoxBtnSelect';
import { useSelector } from 'react-redux';
const SelectDishes = () => {
    const [dataRestaurant, setDataRestaurant] = useState("");
    const idRes = useSelector(state => state.dialog.resDialog.id)

    useEffect(() => {
        const fetchData = async () => {

            var data = await GojekAPI.getRestaurantV5(idRes);
            const indexCategoriesV2 = data?.data?.cards?.findIndex((element) => element?.card_type === 60008);

            setDataRestaurant(data?.data);

            // setMerchantData(data?.data?.cards[indexCategoriesV2]?.content?.restaurant);


            // localStorage.setItem("merchantLoc", JSON.stringify(data?.data?.cards[indexCategoriesV2]?.content?.restaurant))
            // localStorage.setItem("merchantData", JSON.stringify(data?.data?.cards))

        }

        fetchData();

    }, []);
    console.log(dataRestaurant);
    return (

        <div className="containerRes">
            <div className='boxResInfo'>
                <div className='divBtnCloseDlg'><KeyboardBackspaceIcon className='btnCloseDlg' /></div>
                <div className='divResInfo'>
                    <div className='lResImage'>
                        <img src={dataRestaurant?.page?.share?.restaurant?.image} alt="" />
                    </div>
                    <div className='lResInfo'>
                        <div className="lBoxResInfo">
                            <p className='lResParnerIcon'> <VerifiedIcon className='lResParnerSvg' /> </p>
                            <p className='lResName'>{dataRestaurant?.page?.share?.restaurant?.name}</p>
                            <p className='lResDes'>{dataRestaurant?.page?.share?.restaurant?.cuisines}</p>
                        </div>
                    </div>
                    <div className='lResInfo1'>
                        <div className='lResInfoDiv'>
                            <span>Đánh giá</span>
                            <span>
                                {
                                    dataRestaurant?.page?.restaurant_detail?.rating ?
                                        <>
                                            <img style={{ width: "18px", marginTop: "-4px", marginRight: "3px" }} src={dataRestaurant?.page?.restaurant_detail?.rating?.image_url} alt="" />
                                            {dataRestaurant?.page?.restaurant_detail?.rating?.text} . {dataRestaurant?.page?.restaurant_detail?.rating?.info}
                                        </> : "Chưa có đánh giá"
                                }
                            </span>
                        </div>
                        <div className='lResInfoDiv'>
                            <span>Khoảng cách</span>
                            <span>{dataRestaurant?.page?.restaurant_detail?.delivery_status?.distance}km</span>
                        </div>
                        <div className='lResInfoDiv'>
                            <span>Mức giá</span>
                            <span>$$$</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='boxResDishes'>
                {
                    dataRestaurant?.cards?.map((cards, index) => {
                        if (cards?.card_type === 60014) {
                            return (

                                <div className='promos-title' key={index} >
                                    {
                                        cards?.content?.offer_list?.discounts?.map((item, index) => {

                                            return (
                                                <div key={index} >
                                                    <p className='promos-title-max'>{item?.title}</p>
                                                    {/* <p className='promos-title-max'>Giảm giá 50k</p> */}


                                                    {
                                                        item?.line_items?.map((item1, index1) => {

                                                            return (
                                                                <p className={'promos-title-min '} key={index1}>{item1?.text}   </p>
                                                            )
                                                        })
                                                    }
                                                    <hr className='my-1' />
                                                </div>

                                            )
                                        })
                                    }


                                </div>

                            )
                        }
                        if (cards?.card_type === 60008) {
                            return (
                                <div key={index}>
                                    <div
                                        style={{
                                            padding: "10px",
                                            fontSize: "14pt",
                                            textTransform: "uppercase",
                                            fontWeight: "bold",
                                            backgroundColor: "#d7daff",
                                            color: "grey"
                                        }}
                                    >
                                        {cards?.navigation?.title}
                                    </div>

                                    {
                                        cards?.content?.items?.map((item, key) => {
                                            return (
                                                <ItemSelect key={key} data={item} />
                                            )
                                        })
                                    }
                                </div>
                            )
                        }

                    })
                }
            </div>
        </div>



    );

}



const ItemSelect = memo((props) => {
    const { data } = props;



    return (
        <div style={{ borderTop: "2px dotted #dddddd", margin: "8px 0px", display: "flex", padding: "10px", backgroundColor: "white", borderRadius: "20px" }}   >

            <CardMedia
                component="img"
                sx={{ width: 100, borderRadius: "20px" }}
                image={data?.image ? data?.image : "/khay.JPG"}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', width: "100%", flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', padding: "6px 1px 0px 8px" }}>
                    <p style={{ fontSize: "16px", marginTop: "  0", marginBottom: "2px", fontWeight: "bold" }}>
                        {data?.name.length <= 50 ? data?.name : (data?.name.substr(0, 50) + "...")}
                    </p>
                    <Typography component="div" style={{ overflow: "hidden", padding: "5px 0px" }} variant="body2">
                        {data?.description <= 60 ? data?.description : (data?.description !== undefined) ? (data?.description?.substr(0, 60) + "...") : ""}
                    </Typography>
                    <p style={{ fontSize: "14px", marginBottom: "2px", fontWeight: "bold" }}>
                        {
                            data?.promotion?.selling_price ? fomatCurrency(data?.promotion?.selling_price) : fomatCurrency(data?.price)
                        }   &nbsp;  <strike style={{ color: "gray" }}> {data?.promotion?.selling_price ? fomatCurrency(data?.price) : ""}</strike>
                    </p>
                </CardContent>
                <Box sx={{ position: 'relative', alignItems: 'center', pl: 1, pb: 1 }}>

                    {
                        // data?.in_stock ? <BoxBtnSelect data={data} /> : <p style={{ color: "red", textAlign: "right", marginBottom: "0px", paddingRight: "10px", fontWeight: "bold" }}>Hết món</p>
                    }
                    {/* <QuantityInput data={item} /> */}
                </Box>
            </Box>



        </div>

    )
})

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default SelectDishes;