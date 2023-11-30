import { Button, IconButton, TextareaAutosize, } from '@mui/material';
import { React, useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import { OrderAPI, GojekAPI } from '../API/GojekAPI';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import { fomatCurrency } from '../common';
import { Refresh } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import InputBox from '../components/InputBox';
import SelectedItem from '../components/SelectedItem';
import { debounce } from "debounce";
import BoxLoginGojek from '../components/BoxLoginGojek';
import ModalBox from '../components/ModalBox';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const indexCart = useSelector(state => state.dialog.checkoutDialog.index);
    const Cart = useSelector(state => state.cart.CartList[indexCart])
    const [dataCheckout, setDataCheckout] = useState();
    const [idOrderShow, setIdOrderShow] = useState("");
    const [noteOrder, setNoteOrder] = useState(localStorage.getItem("noteOrder") != "null" ? localStorage.getItem("noteOrder") : "alo tới a gọi số này nha 00000");
    const [toggleLogin, setToggleLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingRefresh, setLoadingRefresh] = useState("false");
    const [merchantData, setMerchantData] = useState([]);
    const [customerData, setCustomerData] = useState(localStorage.getItem("customerLoc") ? JSON.parse(localStorage.getItem("customerLoc")) : null);
    const [addressName, setAddressName] = useState(customerData?.name);
    // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    var idvoucher = useRef(localStorage.getItem("idVoucher"));
    var id_oder = useRef();
    const debounceDropDown = useCallback(debounce((merchantData) => fetchData(merchantData), 500), [])
    useEffect(() => {
        debounceDropDown(merchantData);
    }, [merchantData]);

    const fetchData = async (dataMerchant) => {
        try {
            dataMerchant = dataMerchant || merchantData;
            let totalOriginalPrice = calcuTotalPriceCart(Cart?.dishes)
            let promo_discount_cart_price = totalOriginalPrice - Cart?.totalPrice
            var payload = {
                apply_offer: true,
                cart_price: totalOriginalPrice,
                customer_location: customerData?.latitude + "," + customerData?.longitude,
                items: Cart?.dishes,
                merchant_location: dataMerchant?.restaurant?.location,
                offer_id: "",
                offer_type: "voucher",
                payment_types: [],
                promo_discount_cart_price: promo_discount_cart_price,
                restaurant_uuid: dataMerchant?.restaurant?.id
            }
            setLoadingRefresh("refresh-icon-ro");
            var data = await OrderAPI.checkout({
                ...payload,
                offer_id: idvoucher.current,
                voucherId: idvoucher.current

            });
            localStorage.setItem("noteOrder", noteOrder);
            setDataCheckout(data);
            if (data?.distance) {
                // enqueueSnackbar("Lựa món ok.", { variant: 'success', autoHideDuration: 2000 })
            } else {
                data?.errors?.map((item, key) => {
                    // enqueueSnackbar(item?.message, { variant: 'warning', autoHideDuration: 2000 })
                })
            }
        } catch (error) {
            // enqueueSnackbar(error.message, { variant: 'warning', autoHideDuration: 2000 })
        } finally {
            setLoadingRefresh("false")
        }
    }
    useLayoutEffect(() => {
        const fetchRes = async () => {
            let data = await GojekAPI.getRestaurant(Cart?.resData?.resId);
            setMerchantData(data);
        }
        fetchRes();
        setIdOrderShow("")
    }, []); // 106.64904150454079!3d10.845362078042243






    const handleOrder = async () => {
        try {
            if (localStorage.getItem("idVoucher")?.length >= 5) {

                var dataPayload = {
                    "cartPriceEstimated": Cart?.totalPrice,
                    "destinationAddress": customerData?.address,
                    "destinationAddressDetails": {
                        "isSaved": false,
                        "placeId": customerData?.placeid
                    },
                    "destinationLatLong": customerData?.latitude + "," + customerData?.longitude,
                    "destinationName": addressName,
                    "destinationNote": noteOrder,
                    "isGift": false,
                    "items": Cart?.dishes,
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
                    "voucherId": localStorage.getItem("idVoucher")
                }

                var dataOders = await OrderAPI.makeOrder(dataPayload);
                if (dataOders?.orderNo) {
                    id_oder.current = dataOders?.orderNo;
                    localStorage.setItem("idOrder", dataOders?.orderNo);
                    localStorage.setItem("idVoucher", "");
                    // const sttStore = await GojekAPI.postSession(dataOders?.orderNo);
                    // if (sttStore == 1) {
                    //     enqueueSnackbar("Đã lưu phiên đăng nhập!   " + id_oder.current, { variant: 'success' })
                    // } else if (sttStore == 2) {
                    //     enqueueSnackbar("Đã lưu phiên này rồi! ", { variant: 'warning' });
                    // }
                    // else {
                    //     enqueueSnackbar("Chưa lưu phiên đăng nhập, hãy xuất tay! ", { variant: 'danger' });
                    // }
                    // enqueueSnackbar("Đã đặt hàng! " + id_oder.current, { variant: 'success', })
                    setIdOrderShow(dataOders?.orderNo)
                }
                else {
                    // enqueueSnackbar(dataOders?.errorMessage, { variant: 'warning' })
                }
            }
        } catch (error) {
            // enqueueSnackbar(error?.message, { variant: 'warning' })

        } finally {
        }

    }

    const handleCancelOrder = async () => {
        var data = await OrderAPI.quickCancel(id_oder.current);
        localStorage.setItem("idVoucher", idvoucher.current)
        // enqueueSnackbar(data?.message_title ? data?.message_title : data?.message, { variant: 'warning' })
    }
    const handleCoppy = () => {

        navigator.clipboard.writeText(
            "YÊU CẦU BẠN KIỂM TRA ĐƠN HÀNG TRÁNH SAI SÓT \n" +
            "https://qtrack.vercel.app/" + idOrderShow + "\n \n" +
            localStorage.getItem("quick_message")
        )

        // enqueueSnackbar("Đã coppy", { variant: 'success' })

    }

    const handleExport = () => {
        let data = {
            "selectedItems": localStorage.getItem("selectedItems"),
            "merchantData": localStorage.getItem("merchantData"),
            "merchantLoc": localStorage.getItem("merchantLoc"),
            "customerLoc": localStorage.getItem("customerLoc"),
            "payload": localStorage.getItem("payload"),
        }
        navigator.clipboard.writeText(JSON.stringify(data))


        // enqueueSnackbar("Đã coppy", { variant: 'success' })
    }


    function calcuTotalPriceCart(dishes) {

        let totalPrice = dishes?.reduce((total, item) => {
            var totalPriceOps = 0;
            item.variants?.forEach((variant) => {
                totalPriceOps += variant?.price
            })
            return (total + (item?.originalPrice * item.quantity)) + totalPriceOps;
        }, 0)

        return totalPrice;
    }
    return (

        <div className='  w-100  pb-5 container-com'   >
            <ModalBox title={"Đăng nhập "} setOpen={setToggleLogin} open={toggleLogin}>
                <BoxLoginGojek setToggleLogin={setToggleLogin} quickLogin={false} fetchCheckout={fetchData} setLoadingLogin={setLoading} />
            </ModalBox>
            <Container>

                <div style={{
                    width: "100%",
                    paddingTop: "20px",


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
                <p style={{
                    fontWeight: "bold",
                    fontSize: "14pt",
                    margin: "20px 3px 5px 3px "

                }}> Các món bạn chọn</p>
                {
                    Cart?.dishes?.map((item, key) => {


                        var index = merchantData?.items?.findIndex((e) => e?.shopping_item_id === item?.itemId)
                        return (
                            <div className='itemDishCK' key={key}  >
                                <p className='nameDishCK'>{item?.itemName}</p>
                                <p className='notesCK'>Ghi chú: {item?.notes}</p>

                                {/* <SelectedItem data={item} key={key} action={1} quantity={item?.quantity} dataVariants={index > 0 && merchantData?.items[index]} indexItem={key} /> */}
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
                                marginBottom: "5px",
                                paddingTop: "5px",
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>Thanh toán :

                                {fomatCurrency(dataCheckout?.delivery_options[0]?.payment_options[0]?.total_amount)}
                                <i>
                                    <strike>
                                        {fomatCurrency(dataCheckout?.delivery_options[0]?.payment_options[0]?.total_discount)}
                                    </strike>
                                </i>
                            </p>
                            <p className='text-success'> {dataCheckout?.delivery_options[0]?.payment_options[0]?.pricing_info?.savings_info?.text?.replace("{amount}", dataCheckout?.delivery_options[0]?.payment_options[0]?.pricing_info?.savings_info?.amount)}</p>

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
                        onClick={() => {
                            setToggleLogin(true)
                            setLoading(true)
                        }}
                    >
                        ĐĂNG NHẬP
                    </LoadingButton>
                    <LoadingButton
                        size="small"
                        variant="contained"
                        color='warning'
                        onClick={() => handleCancelOrder()}
                    >
                        Huỷ đơn
                    </LoadingButton>
                    <LoadingButton
                        size="small"
                        variant="contained"
                        color='primary'
                        onClick={() => handleExport()}
                    >
                        Xuất món
                    </LoadingButton>
                    {

                        idOrderShow != "" &&
                        <LoadingButton
                            size="small"
                            variant="contained"
                            color='primary'
                            onClick={() => handleCoppy()}
                        >
                            COPPY
                        </LoadingButton>
                    }
                    <Button onClick={handleOrder} variant="contained" color="secondary" style={{ marginTop: "10px" }}   >Đặt ngay</Button>
                </div>


            </Container >




        </div >
    );




}


export default Checkout;
