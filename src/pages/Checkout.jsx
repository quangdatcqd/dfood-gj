import { AvatarGroup, Box, Button, Card, CardContent, CardMedia, Divider, IconButton, Paper, Stack, TextareaAutosize, Typography, } from '@mui/material';
import { React, useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GojekAPI from '../API/GojekAPI';
import { styled } from '@mui/material/styles';
import BackBtn from '../components/BackBtn';
import QuantityInput from '../components/QuantityInput';
import { Container } from '@mui/system';
import { CartContext } from '../Contexts/CartContext';
import { useSnackbar } from 'notistack';
import { fomatCurrency } from '../common';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBox from './ChatBox';
import { Refresh } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import InputBox from '../components/InputBox';
import SelectedItem from '../components/SelectedItem';
import { debounce } from "debounce";
import BoxLoginGojek from '../components/BoxLoginGojek';
import ModalBox from '../components/ModalBox';
const Checkout = () => {
    const { payload, selectedItems } = useContext(CartContext);
    const params = useParams();
    const [dataCheckout, setDataCheckout] = useState();
    const [source_map, setSourceMap] = useState("");
    const [noteOrder, setNoteOrder] = useState(localStorage.getItem("noteOrder"));
    const [toggleLogin, setToggleLogin] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingRefresh, setLoadingRefresh] = useState("false");
    const [toggleChat, setToggleChat] = useState(false);

    const [merchantData, setMerchantData] = useState(JSON.parse(localStorage.getItem("merchantLoc")));
    const [customerData, setCustomerData] = useState(JSON.parse(localStorage.getItem("customerLoc")));
    const [addressName, setAddressName] = useState(customerData?.name);



    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    var id_oder = "";
    const debounceDropDown = useCallback(debounce(() => fetchData(), 1500), [])
    useEffect(() => {
        debounceDropDown(payload);
    }, [payload]);
    const fetchData = async () => {
        setLoadingRefresh("refresh-icon-ro");
        var data = await GojekAPI.checkout(payload);
        localStorage.setItem("noteOrder", noteOrder);
        setDataCheckout(data);
        if (data?.distance) {
            enqueueSnackbar("Lựa món ok.", { variant: 'success', autoHideDuration: "1000" })
        } else {
            data?.errors?.map((item, key) => {
                enqueueSnackbar(item?.message, { variant: 'warning', autoHideDuration: "1000" })
            })
        }
        var getVC = await GojekAPI.getVoucher();

        (getVC?.data?.length >= 13) ? localStorage.setItem("idvoucher", getVC?.data[getVC?.data?.length - 1]?.id) : localStorage.setItem("idvoucher", "");
        setLoadingRefresh("false")
    }
    useEffect(() => {
        if (payload?.items?.length > 0) {
            localStorage.setItem("payload", JSON.stringify(payload));
            localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        }
    }, []); // 106.64904150454079!3d10.845362078042243






    const handleOrder = async () => {

        try {
            var idvoucher = localStorage.getItem("idvoucher");
            if (idvoucher != undefined) {
                var dataPayload = {
                    "cartPriceEstimated": (Number(payload?.cart_price) - Number(payload?.promo_discount_cart_price)),
                    "destinationAddress": customerData?.address,
                    "destinationAddressDetails": {
                        "isSaved": false,
                        "placeId": customerData?.placeid
                    },
                    "destinationLatLong": customerData?.latitude + "," + customerData?.longitude,
                    "destinationName": addressName,
                    "destinationNote": noteOrder,
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

                var dataOders = await GojekAPI.makeOrder(dataPayload);
                if (dataOders?.orderNo) {
                    id_oder = dataOders?.orderNo;
                    localStorage.setItem("idOrder", dataOders?.orderNo);
                    enqueueSnackbar("Đã đặt hàng! " + id_oder, { variant: 'success' })
                }
                else {
                    enqueueSnackbar(dataOders?.errorMessage, { variant: 'warning' })
                }
            }
        } catch (error) {
            enqueueSnackbar(error?.message, { variant: 'warning' })

        } finally {

        }

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

        }
    }



    return (

        <div className='  w-100'   >
            <ModalBox title={"Đăng nhập "} setOpen={setToggleLogin} open={toggleLogin}>
                <BoxLoginGojek setToggleLogin={setToggleLogin} />
            </ModalBox>
            <Container>

                <div style={{
                    width: "100%",
                    paddingTop: "20px"

                }}>
                    <p style={{
                        fontWeight: "bold",
                        fontSize: "11pt",
                        marginBottom: "5px"

                    }}> Địa điểm nhà hàng</p>
                    <p style={{
                        fontSize: "14pt",
                        fontWeight: "bold"
                    }}>
                        {merchantData?.restaurant?.address}
                    </p>
                </div>
                <hr />
                <div style={{
                    width: "100%",


                }}>
                    <p style={{
                        fontWeight: "bold",
                        fontSize: "11pt",
                        marginBottom: "5px"

                    }}> Địa điểm giao hàng</p>

                    <InputBox
                        value={addressName}
                        onChange={(e) => setAddressName(e.target.value)}
                    />
                    <p style={{
                        fontWeight: "bold",
                        fontSize: "11pt",
                        margin: "20px 3px 5px 3px "

                    }}> Ghi chú đơn hàng</p>
                    <div style={{
                        width: "100%",
                        border: "none",
                        borderRadius: "15px",
                        outline: "none",
                        fontSize: "14pt",
                        textAlign: "left",
                        boxShadow: "0px 0px 5px 5px #e9e9e9",


                    }}>
                        <TextareaAutosize onChange={(e) => setNoteOrder(e.target.value)} value={noteOrder} style={{ width: "100%", resize: "none", padding: "10px", outline: "none", border: "0px solid #ff0086", borderRadius: "10px", fontSize: "15pt", fontWeight: "bold" }} />
                    </div>


                </div>
                <hr />
                <p style={{
                    fontWeight: "bold",
                    fontSize: "14pt",
                    margin: "20px 3px 5px 3px "

                }}> Các món bạn chọn</p>
                {
                    payload?.items?.map((item, key) => {


                        var index = merchantData?.items?.findIndex((e) => e?.shopping_item_id === item?.itemId)
                        return (
                            <div key={key} style={{

                                marginTop: "10px",
                                boxShadow: "#cecece 3px 3px 6px 0px",
                                padding: "10px 15px",
                                borderRadius: "20px",
                                backgroundColor: "#f8fff9",

                            }}>
                                <p style={{
                                    fontWeight: "bold",
                                    fontSize: "14pt",
                                    marginBottom: "3px"
                                }}>{item?.itemName}</p>

                                <SelectedItem data={item} key={key} action={1} quantity={item?.quantity} dataVariants={merchantData?.items[index]} indexItem={key} indexItemRes={index} />
                            </div>
                        )
                    })
                }






                <div
                    style={{
                        backgroundColor: "#fffdf0",
                        borderRadius: "30px",
                        border: "5px dashed #ffb8b8",
                        padding: "8px 12px",
                        marginTop: "20px"

                    }}
                >
                    <p style={{
                        fontWeight: "bold",
                        fontSize: "14pt",
                        margin: "2px 3px 10px 3px ",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"

                    }}> Tóm tắt thanh toán
                        <IconButton sx={{
                            fontSize: "30pt",
                            color: "green"
                        }} aria-label="add to shopping cart"
                            onClick={() => fetchData()}
                        >
                            <Refresh fontSize="inherit" className={loadingRefresh} />
                        </IconButton>
                    </p>

                    {

                        dataCheckout?.delivery_options != undefined ?
                            dataCheckout?.delivery_options[0]?.payment_options[0]?.pricing_info?.price_line_items?.rows?.map((item, key) => {
                                return (
                                    <div key={key}>
                                        <p style={{ margin: "5px 3px", fontSize: "12pt", display: "flex", justifyContent: "space-between" }}> {item?.title}:<span> {item?.final_value}  <strike> {item?.original_value}</strike></span> </p>
                                        {/* <p>Giảm giá: {dataCheckout?.delivery_options[0]?.payment_options[0]?.total_discount}</p>
                                <p>Phí ship: {dataCheckout?.delivery_options[0]?.payment_options[0]?.delivery_fee}</p>
                                <p>Thanh toán: {dataCheckout?.delivery_options[0]?.payment_options[0]?.total_amount}</p> */}
                                    </div>
                                )
                            })

                            : ""
                    }
                    {dataCheckout?.delivery_options != undefined ?
                        <div>
                            <p style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                borderTop: "1px dotted gray",
                                paddingTop: "10px",
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>Thanh toán :

                                {fomatCurrency(dataCheckout?.delivery_options[0]?.payment_options[0]?.total_amount)}
                                <strike>
                                    {dataCheckout?.delivery_options[0]?.payment_options[0]?.total_discount}
                                </strike>
                            </p>
                            <p className='text-success'>     {dataCheckout?.delivery_options[0]?.payment_options[0]?.pricing_info?.savings_info?.text?.replace("{amount}", dataCheckout?.delivery_options[0]?.payment_options[0]?.pricing_info?.savings_info?.amount)}</p>

                        </div>

                        : ""}



                </div>



                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "10px"
                }}>
                    <LoadingButton
                        size="small"
                        loading={loading}
                        loadingIndicator="Đợi.."
                        variant="contained"
                        color='success'
                        onClick={() => setToggleLogin(true)}
                    >
                        ĐĂNG NHẬP
                    </LoadingButton>


                    <Button onClick={handleOrder} variant="contained" color="secondary" style={{ marginTop: "10px" }}   >Đặt ngay</Button>
                </div>
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

            </Container >

            {toggleChat && <ChatBox toggleChat={toggleChat} setToggleChat={setToggleChat} />}

            {
                <div id='map' style={{ height: "500px" }}>
                    <div className='pickloc'>

                    </div>
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7837.109077393735!2d106.64111775488112!3d10.844808056338975!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1672314641236!5m2!1svi!2s" width="100%" height="450"></iframe> */}
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.6453706417853!2d106.64111775488112!3d10.844808056338975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8ff38acf58184f72!2zMTDCsDUwJzM1LjkiTiAxMDbCsDM4JzIyLjMiRQ!5e0!3m2!1svi!2s!4v1672406199421!5m2!1svi!2s" width="600" height="450" loading="lazy"  ></iframe> */}
                    <iframe src={source_map} width="100%" height="450"  ></iframe>
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d489.81950773459255!2d106.64838509734601!3d10.845245826660424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752999c1a72537%3A0x45c1b27d9f32a71c!2zVGh14buRYyBWaXBtYXggUlggY2jDrW5oIGjDo25n!5e0!3m2!1svi!2s!4v1675245566875!5m2!1svi!2s" width="100%" height="500" ></iframe> */}
                </div>
            }


        </div >
    );

}


export default Checkout;
