import { Avatar, AvatarGroup, Box, Button, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Divider, Paper, Stack, Typography, } from '@mui/material';
import { React, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GojekAPI from '../API/GojekAPI';
import { styled } from '@mui/material/styles';
import BackBtn from '../components/BackBtn';
import QuantityInput from '../components/QuantityInput';
import { Container } from '@mui/system';
import ChoseOptions from '../components/ChoseOptions';
import { CartContext } from '../Contexts/CartContext';
import { useSnackbar } from 'notistack';
import { fomatCurrency } from '../common';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBox from './ChatBox';

const Checkout = () => {
    const { payload, locData, selectedItems } = useContext(CartContext);
    const params = useParams();
    const [dataCheckout, setDataCheckout] = useState();
    const [source_map, setSourceMap] = useState("");
    const [toggleChat, setToggleChat] = useState(false);

    const [merchantData, setMerchantData] = useState(JSON.parse(localStorage.getItem("merchantLoc")));
    const [customerData, setCustomerData] = useState(JSON.parse(localStorage.getItem("customerLoc")));
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    var id_oder = "";
    useEffect(() => {
        if (payload?.items?.length > 0) {
            localStorage.setItem("payload", JSON.stringify(payload));
            localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        }


        const fetchData = async () => {
            var data = await GojekAPI.checkout(payload);
            setDataCheckout(data);
            if (data?.distance) {
                enqueueSnackbar("Lựa món ok.", { variant: 'success' })
            } else {
                data?.errors?.map((item, key) => {
                    enqueueSnackbar(item?.message, { variant: 'warning' })
                })
            }
            var getVC = await GojekAPI.getVoucher();
            // console.log(getVC?.data)
            (getVC?.data?.length >= 13) && localStorage.setItem("idvoucher", getVC?.data[getVC?.data?.length - 1]?.id);

        }
        fetchData();



    }, []); // 106.64904150454079!3d10.845362078042243

    const handleOrder = async () => {

        var idvoucher = localStorage.getItem("idvoucher");
        if (idvoucher != undefined)
            var dataPayload = {
                "cartPriceEstimated": (Number(payload?.cart_price) - Number(payload?.promo_discount_cart_price)),
                "destinationAddress": "498/19 " + customerData?.data?.address,
                "destinationAddressDetails": {
                    "isSaved": false,
                    "placeId": customerData?.data?.placeid
                },
                "destinationLatLong": customerData?.data?.latitude + "," + customerData?.data?.longitude,
                "destinationName": customerData?.data?.name,
                "destinationNote": "alô tới a gọi 0389824667 giùm e nhé",
                "isGift": false,
                "items": payload?.items,
                "analytics": {
                    "discoverySource": "Restaurant Deeplink",
                    "discoverySourceDetails": "gojek://gofood/merchant/93c3c961-53e3-4dc2-9dbd-07959c53bcd9?query_understanding_id\u003da09669f7-7d2e-43d8-a462-bfcb240efe17\u0026intent_action_type\u003drestaurant\u0026action_position\u003d1\u0026item_position\u003d3\u0026intent_action_value\u003dph%C3%BAc%20l%E1%BB%99c%20th%E1%BB%8D\u0026template_id\u003dBRAND_OUTLETS",
                    "selectId": "6da03f7a-62e2-4af1-95a8-c12322d4e39c",
                    "understandingId": "a09669f7-7d2e-43d8-a462-bfcb240efe17"
                },
                "orderReviewScreenEnabled": false,
                "originAddress": merchantData?.restaurant?.address,
                "originLatLong": merchantData?.restaurant?.location,
                "originName": merchantData?.restaurant?.name,
                "paymentOptions": [
                    {
                        "displayName": "Tiền mặt",
                        "type": "CASH"
                    }
                ],
                "restaurantId": merchantData?.restaurant?.id,
                "voucherId": idvoucher
            }
        var picked_loc = customerData?.data?.latitude + "," + customerData?.data?.longitude;
        var dataOders = await GojekAPI.makeOrder(dataPayload, picked_loc);

        id_oder = dataOders?.orderNo;
        localStorage.setItem("idOrder", dataOders?.orderNo);
        enqueueSnackbar(dataOders?.errorMessage, { variant: 'warning' })
        // console.log(dataPayload) 
    }
    const handleCancelOrder = async () => {
        var data = await GojekAPI.cancelOrder(id_oder);
        enqueueSnackbar(data?.message, { variant: 'warning' })
    }
    const getTracking = async () => {
        var data = await GojekAPI.tracking();
        if (data?.trackingDetails) {

            var loca = data?.trackingDetails[0]?.data?.vehicle?.location?.snappedSegment[0]?.longitude + "!3d" + data?.trackingDetails[0]?.data?.vehicle?.location?.snappedSegment[0]?.latitude;
            setSourceMap('https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7837.109077393735!2d' + loca + '!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1672314641236!5m2!1svi!2s')
            console.log(loca)
        }
    }



    return (

        <div className='bg-light w-100'   >

            <Container>


                <BackBtn to={"/restaurant"} />
                <Box>


                    <Stack spacing={2}>
                        <Item >
                            <AvatarGroup>


                                <Box className={"w-100"}>
                                    {/* <Typography gutterBottom variant="h5" align={"justify"} className={"w-100"} component="div"> Con Cặc </Typography> */}
                                    <Typography gutterBottom variant="h5" align={"justify"} className={"w-100"} component="div">{merchantData?.restaurant?.name} </Typography>
                                    <Typography gutterBottom variant="body1" align={"justify"} className={"w-100"} component="div">{merchantData?.restaurant?.address} </Typography>

                                </Box>

                                {/* <Avatar
                                    alt="Remy Sharp"
                                    src={dataRestaurant?.restaurant?.brand?.logo_url ? dataRestaurant?.restaurant?.brand?.logo_url : "/khay.JPG"}
                                    sx={{ width: 56, height: 56 }}
                                /> */}
                            </AvatarGroup>


                        </Item>
                    </Stack>


                </Box>
                {
                    payload?.items?.map((item, key) => {
                        return (
                            <Box key={key}>
                                <Card sx={{ display: 'flex', }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 100 }}
                                        image={item?.image ? item?.image : "/khay.JPG"}
                                        alt="Live from space album cover"
                                    />
                                    <Box sx={{ display: 'flex', width: "100%", flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto', padding: "6px 1px 0px 8px" }}>
                                            <p style={{ fontSize: "16px", marginTop: "  0", marginBottom: "2px", fontWeight: "bold" }}>
                                                {item?.itemName?.length <= 50 ? item?.itemName : (item?.itemName.substr(0, 50) + "...")}
                                            </p>
                                            <Typography component="div" style={{ overflow: "hidden" }} variant="body2">
                                                {item?.description <= 60 ? item?.description : (item?.description !== undefined) ? (item?.description?.substr(0, 60) + "...") : ""}
                                            </Typography>
                                            <p style={{ fontSize: "16px", marginTop: "4px", marginBottom: "0", fontWeight: "bold" }}>
                                                Giá :   {
                                                    item?.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                            </p>
                                        </CardContent>
                                        <Box sx={{ position: 'relative', alignItems: 'center', pl: 1, pb: 1 }}>
                                            <QuantityInput data={item} />
                                        </Box>
                                    </Box>

                                </Card>
                                <Divider variant="inset" sx={{ listStyle: "none" }} className='m-0 mt-1' component="li" />
                            </Box>
                        )
                    })
                }
                {
                    // console.log(dataCheckout?.delivery_options)
                }
                {

                    dataCheckout?.delivery_options != undefined ?
                        dataCheckout?.delivery_options[0]?.payment_options[0]?.pricing_info?.price_line_items?.rows?.map((item, key) => {
                            return (
                                <div key={key}>
                                    <p> {item?.title}: {item?.final_value} <strike> {item?.original_value}</strike> </p>
                                    {/* <p>Giảm giá: {dataCheckout?.delivery_options[0]?.payment_options[0]?.total_discount}</p>
                                <p>Phí ship: {dataCheckout?.delivery_options[0]?.payment_options[0]?.delivery_fee}</p>
                                <p>Thanh toán: {dataCheckout?.delivery_options[0]?.payment_options[0]?.total_amount}</p> */}
                                </div>
                            )
                        })

                        : ""
                }
                {dataCheckout?.delivery_options != undefined ? <p>Thanh toán :  {fomatCurrency(dataCheckout?.delivery_options[0]?.payment_options[0]?.total_amount)} <strike> {fomatCurrency(dataCheckout?.delivery_options[0]?.payment_options[0]?.total_discount)} </strike></p> : ""}


                {/* <p>Tổng đơn hàng: { } </p>
                <p>Giảm giá: {dataCheckout?.delivery_options[0]?.payment_options[0]?.total_discount}</p>
                <p>Phí ship: {dataCheckout?.delivery_options[0]?.payment_options[0]?.delivery_fee}</p>*/}

                <Button onClick={handleOrder} variant="contained" style={{ marginTop: "10px" }} fullWidth={true} >Đặt ngay</Button>
                <div style={{ display: "flex", flexDirection: "row", margin: "20px", justifyContent: "space-around" }}>

                    <div onClick={() => setToggleChat(true)} style={{ padding: "10px", marginTop: "10px", backgroundColor: "#2783dd", width: "45px", cursor: "pointer", color: "white", borderRadius: "50px" }}>
                        <ChatIcon />
                    </div>
                    <div onClick={() => handleCancelOrder()} style={{ padding: "10px", marginTop: "10px", backgroundColor: "#2783dd", width: "80px", cursor: "pointer", color: "white", borderRadius: "50px" }}>
                        Huỷ món
                    </div>
                    <div onClick={() => getTracking()} style={{ padding: "10px", marginTop: "10px", backgroundColor: "#2783dd", width: "65px", cursor: "pointer", color: "white", borderRadius: "50px" }}>
                        refresh
                    </div>
                </div>

            </Container>

            {toggleChat && <ChatBox toggleChat={toggleChat} setToggleChat={setToggleChat} />}

            {
                <div id='map' style={{ height: "500px" }}>
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7837.109077393735!2d106.64111775488112!3d10.844808056338975!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1672314641236!5m2!1svi!2s" width="100%" height="450"></iframe> */}
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.6453706417853!2d106.64111775488112!3d10.844808056338975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8ff38acf58184f72!2zMTDCsDUwJzM1LjkiTiAxMDbCsDM4JzIyLjMiRQ!5e0!3m2!1svi!2s!4v1672406199421!5m2!1svi!2s" width="600" height="450" loading="lazy"  ></iframe> */}
                    <iframe src={source_map} width="100%" height="450"  ></iframe>
                </div>
            }


        </div >
    );

}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default Checkout;
