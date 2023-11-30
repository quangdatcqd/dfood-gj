import { Box, CardContent, CardMedia, Typography, } from '@mui/material';
import { React, useState, useEffect, memo } from 'react';

import { GojekAPI } from '../../API/GojekAPI';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import VerifiedIcon from '@mui/icons-material/Verified';
import { fomatCurrency } from '../../common';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckoutData, setResDlg } from '../../store/dialogSlice';
import './style.css'
import BoxOptions from './Components/BoxOptions';
import { deCreaseQty, inCreaseQty } from '../../store/cartSlice';
const SelectDishes = () => {
    const [dataRestaurant, setDataRestaurant] = useState("");
    const idRes = useSelector(state => state.dialog.resDialog.id)
    const CartList = useSelector(state => state.cart?.CartList)
    const indexCart = CartList?.findIndex(item => item?.resData?.resId === dataRestaurant?.page?.share?.restaurant?.id)
    const Cart = CartList[indexCart];
    const dispatch = useDispatch();
    const [dishesSelectedDlg, setDishesSelectedDlg] = useState(false);
    const [openOption, setOpenOption] = useState(false);
    const [dataOption, setDataOption] = useState(null);

    const handleOpenRes = (open) => {
        dispatch(setResDlg(open))
    }

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
    const handleOpenOption = (data) => {
        const resInfo = dataRestaurant?.page?.share?.restaurant;
        const resData = {
            resId: resInfo?.id,
            resName: resInfo?.name,
            resImage: resInfo?.image,

        }
        setDataOption({
            data: data,
            resData: resData
        });
        setOpenOption(true)
    }


    const handleIncreaseQty = (index) => {
        dispatch(inCreaseQty({
            index: index,
            idRestaurant: dataRestaurant?.page?.share?.restaurant?.id
        }))
    }
    const handleDecreaseQty = (index) => {
        dispatch(deCreaseQty({
            index: index,
            idRestaurant: dataRestaurant?.page?.share?.restaurant?.id
        }))
    }
    const handleSelectCart = () => {
        dispatch(setCheckoutData(indexCart))
    }
    return (

        <>
            <div className="containerRes">
                <div className='boxResInfo'>
                    <div className='divBtnCloseDlg'><KeyboardBackspaceIcon className='btnCloseDlg' onClick={() => handleOpenRes(false)} /></div>
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
                    {
                        Cart?.dishes?.length > 0 &&
                        <div className={`boxResCart ${dishesSelectedDlg && "bg-1"}`}>
                            {
                                dishesSelectedDlg &&
                                <div className='boxSelectedDishes'>

                                    {Cart?.dishes?.map((item, index) => {

                                        return (
                                            <div className='resDishSelected' key={index}>
                                                <p className='dishSelectedName'>{item?.itemName}</p>

                                                <div className='boxBtnDishQty '>
                                                    <p className='dishSelectedPrice'>
                                                        {
                                                            item?.price ?
                                                                <>
                                                                    {
                                                                        fomatCurrency(item?.price)
                                                                    }
                                                                    {
                                                                        item?.originalPrice > 0 &&
                                                                        <i> - <strike>{fomatCurrency(item?.originalPrice)}</strike></i>
                                                                    }
                                                                </>
                                                                :
                                                                fomatCurrency(item?.originalPrice)

                                                        }

                                                    </p>
                                                    <div className='boxBtnDishQty'>
                                                        <div className='btnDishQtyRM'>
                                                            <RemoveIcon onClick={() => handleDecreaseQty(index)} />
                                                        </div>
                                                        <span className='qtyDish'>{item?.quantity}</span>
                                                        <div className='btnDishQtyRM'>
                                                            <AddIcon onClick={() => handleIncreaseQty(index)} />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        )
                                    })}

                                </div>
                            }
                            <div className='boxResCartBtn'>
                                <div className='resCartBtn' onClick={() => setDishesSelectedDlg(dishesSelectedDlg ? false : true)} >
                                    {
                                        dishesSelectedDlg ?
                                            <CancelRoundedIcon /> :
                                            <>
                                                <ShoppingBasketIcon />
                                                <span>{Cart?.dishes?.length}</span>
                                            </>
                                    }
                                </div>
                                <div className='boxResCartBtnCheckout' onClick={() => handleSelectCart()}>
                                    <PaymentsIcon className='paymentIcon' />
                                    <p>{fomatCurrency(Cart?.totalPrice)}</p>
                                </div>
                            </div>
                        </div>
                    }

                </div>
                <div className='boxResDishes'>
                    {
                        dataRestaurant?.cards?.map((cards, index) => {
                            // if (cards?.card_type === 60014) {
                            //     return (

                            //         <div className='promos-title' key={index} >
                            //             {
                            //                 cards?.content?.offer_list?.discounts?.map((item, index) => {

                            //                     return (
                            //                         <div key={index} >
                            //                             <p className='promos-title-max'>{item?.title}</p>
                            //                             {/* <p className='promos-title-max'>Giảm giá 50k</p> */}


                            //                             {
                            //                                 item?.line_items?.map((item1, index1) => {

                            //                                     return (
                            //                                         <p className={'promos-title-min '} key={index1}>{item1?.text}   </p>
                            //                                     )
                            //                                 })
                            //                             }
                            //                             <hr className='my-1' />
                            //                         </div>

                            //                     )
                            //                 })
                            //             }


                            //         </div>

                            //     )
                            // }
                            if (cards?.card_type === 60008) {
                                return (
                                    <div key={index} className='cateResDishes'>

                                        <p className='categoryTitle' style={{ color: 'rgb(219, 117, 15)' }}>
                                            {cards?.navigation?.title}
                                        </p>
                                        <div className='listItemDishes'>
                                            {
                                                cards?.content?.items?.map((item, index) => {
                                                    if (item?.active)
                                                        return (
                                                            <div onClick={() => handleOpenOption(item)} key={index}>
                                                                <ItemSelect data={item} />
                                                            </div>
                                                        )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            {
                dataOption &&
                <BoxOptions open={openOption} setOpen={setOpenOption} data={dataOption?.data} resData={dataOption?.resData} />
            }
        </>



    );

}



const ItemSelect = memo((props) => {
    const { data } = props;
    return (
        <div className='resItemDish'    >

            <CardMedia
                component="img"
                sx={{ width: 100, height: 100, borderRadius: "20px" }}
                image={data?.image ? data?.image : "/khay.JPG"}
                alt="Live from space album cover"
            />
            {
                (!data?.in_stock && data?.in_stock !== undefined) &&
                <div className='layerSoldOut'> Đã hết</div>
            }
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


export default SelectDishes;