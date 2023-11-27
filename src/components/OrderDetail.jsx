import { Container } from '@mui/material';
import { React, useLayoutEffect, useState, useRef } from 'react';
import { GojekAPI, OrderAPI } from '../API/GojekAPI';
import MapMarker from './MapMarker';
import ChatBox from './ChatBox';
import { useSnackbar } from 'notistack';
import { fomatCurrency } from '../common';

const OrderDetail = ({ idOrder }) => {
    const [toggleChat, setToggleChat] = useState(false);
    const [dataOrder, setDataOrder] = useState([]);
    const [channelID, setChannelID] = useState("");
    const [trackingLocation, setTrackingLocation] = useState("");
    const [trackingLocationDr, setTrackingLocationDr] = useState("");
    const [trackingStatus, setTrackingStatus] = useState("");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();



    useLayoutEffect(() => {
        getListOrders();

    }, []);

    var trackingLocationRC = useRef();

    const handleCancelOrder = async () => {
        var check = await getListSP();
        if (check == 0) {
            makeCancel();
        }
    }
    const getListSP = async () => {
        try {
            var data = await GojekAPI.getListSupport();
            if (data?.success) {
                if (data?.data?.tokens?.length > 0) {
                    setChannelID(data?.data?.tokens[0]?.channel?.id);
                    setToggleChat(true);
                    return 1;
                }
            }
            return 0;
        } catch (error) {
        }
    }

    const makeCancel = async () => {
        var cfCancel = window.confirm("Huỷ với lí do thay đổi món!");
        if (!cfCancel) return "";
        var phone = dataOrder?.destination?.recipient_phone;
        var data = await OrderAPI.cancelOrder(idOrder, phone, dataOrder?.customer_id);
        if (data?.success) {
            enqueueSnackbar("Đã yêu cầu huỷ đơn hàng, đợi xíu!", { variant: 'success' })
            while (true) {
                let id = await getListSP();
                if (id != 0) break;
                await new Promise(reject => setTimeout(reject, 2000))
                enqueueSnackbar("Đợi xíu!", { variant: 'warning' })
            }
        } else {
            enqueueSnackbar(data?.error[0]?.message, { variant: 'error' })
        }
    }

    const getListOrders = async () => {
        try {

            var data = await OrderAPI.getOrderDetail(idOrder);
            if (data?.success) {
                setDataOrder(data?.data);
                setTrackingStatus(listStatus(data?.data?.status) + " " + data?.data?.cancellation?.description)
                var trackingLoc = data?.data?.destination?.latitude + "," + data?.data?.destination?.longitude + "|" +
                    data?.data?.origin?.latitude + "," + data?.data?.origin?.longitude
                // + "|" + data?.data?.driver_info?.latitude + "," + data?.data?.driver_info?.longitude
                trackingLocationRC.current = trackingLoc;

                trackingOrder();
            }

        } catch (error) {

        }

    }
    const trackingOrder = async () => {
        try {
            var data = await OrderAPI.tracking(idOrder);
            if (data?.trackingDetails) {
                let dataloc = data?.trackingDetails[0]?.data?.vehicle?.location?.coordinates;
                setTrackingLocation(trackingLocationRC.current + "|" + dataloc?.latitude + "," + dataloc?.longitude);

            }

        } catch (error) {

        }
    }
    const handleCoppy = () => {

        navigator.clipboard.writeText(
            "Check đơn, coppy link xoá dấu ? đi: \n" +
            // "Check đơn : \n" +
            "https://qtrack.vercel?.app/" + idOrder
        )

        enqueueSnackbar("Đã coppy", { variant: 'success' })

    }


    return (
        <Container className='container-com'>
            <div style={{
                position: "fixed",
                right: "5px",
                bottom: "5px",
                backgroundColor: "red",
                color: "white",
                padding: "8px 20px",
                borderRadius: "10px",
                zIndex: "999999999",
                fontWeight: "bold"




            }}>
                {trackingStatus}
            </div>
            <div className='div-detail-order'>
                <div className=' box-info delivery-detail'>
                    <p className='title-d  '>Thông tin giao hàng</p>
                    <div className='addr-box'>
                        <p className='addr'>Địa chỉ nhà hàng</p>
                        <p className='addr-i'>{dataOrder?.origin?.address}</p>
                    </div>
                    <div className='addr-box'>
                        <p className='addr'>Địa chỉ của bạn</p>
                        <p className='addr-i'>{dataOrder?.destination?.location_name + "-" + dataOrder?.destination?.address}</p>
                    </div>
                </div>

                <div className=' box-info order-item'>
                    <p className='title-d  '>Các món bạn chọn</p>

                    {
                        dataOrder?.oms_meta?.items?.map((item, key) => {
                            return (
                                <div className='addr-box border-top' key={key}>
                                    <p className='addr-i'>{item?.name}</p>
                                    <div className='d-flex justify-content-between'>
                                        <p className='text-danger'>{fomatCurrency(item?.price)}</p>
                                        <p className='text-success'>Số lượng: {item?.quantity}</p>

                                    </div>
                                </div>

                            )
                        })
                    }


                </div>

                <div className=' box-info order-item'>
                    <p className='title-d  '>Thông tin thanh toán</p>

                    {
                        dataOrder?.oms_meta?.customer_payment_details?.v1?.line_items?.rows?.map((item, key) => {
                            return (
                                <div key={key}>
                                    <div className='addr-box d-flex justify-content-between'>
                                        <span className=' '>{item?.title} </span>
                                        <span className=' '>{item?.value} </span>
                                    </div>

                                </div>
                            )
                        })
                    }
                    <hr className='mb-1 mt-2' />
                    <div className='addr-box d-flex justify-content-between'>
                        <span className=' '>Tổng </span>
                        <span className=' '>{dataOrder?.oms_meta?.customer_payment_details?.v1?.payment_method_details?.total} </span>
                    </div>
                    <hr className='mb-1 mt-2' />
                    <div className='addr-box d-flex justify-content-between'>
                        <span className=' '>Thanh toán</span>
                        <span className=' '>{dataOrder?.oms_meta?.customer_payment_details?.v1?.payment_method_details?.methods[0]?.amount} </span>
                    </div>

                </div>

                <div className='box-info '>
                    <div className=' d-flex '>
                        <div className='photo-driver'>
                            <img src={dataOrder?.driver_info?.photo} alt="" />
                        </div>
                        <div className='driver-info position-relative '>
                            <p className='driver-name'> {dataOrder?.driver_info?.name}</p>

                            <p>{dataOrder?.driver_info?.phone}</p>


                        </div>
                    </div>
                    <p className='vehicle-info py-2'>{dataOrder?.vehicle?.brand_name}  {dataOrder?.vehicle?.model} | {dataOrder?.vehicle?.vehicle_number} | <span onClick={() => navigator.clipboard.writeText(idOrder)}>{idOrder}</span></p>
                    <hr />
                    <div className='box-btn-order' >
                        <div
                            onClick={() => {
                                setChannelID("");
                                setToggleChat(true);
                            }}
                        >
                            Chat
                        </div>
                        <div onClick={() => handleCancelOrder()}  >
                            Huỷ
                        </div>

                        <div onClick={() => getListOrders()}  >
                            Tải lại
                        </div>
                        <div onClick={() => { navigator.clipboard.writeText(localStorage.getItem("G-Token")) }}   >
                            Token
                        </div>
                        <div onClick={() => handleCoppy()}   >
                            Xuất
                        </div>

                    </div>
                </div>

                {
                    trackingLocation && <MapMarker location={trackingLocation} />
                }

                {toggleChat && <ChatBox makeCancel={makeCancel} toggleChat={toggleChat} channelID={channelID} idOrder={idOrder} setToggleChat={setToggleChat} />}
                {/* {toggleCancel && <CancelOrder toggle={toggleCancel} idOrder={idOrder} setToggle={setToggleCancel} />} */}

            </div>



        </Container >

    );
}
const listStatus = (key) => {
    // 3==  đag chuẩN bị món
    // 6 ==  đã bị huỷ
    // 4 == đang giao hàng
    const liststatus = [
        "case0",
        "Đang không biết!",
        "Đang tìm tài xế!",
        "Đag chuẩn bị món ăn!",
        "Đang giao hàng!",
        "Đã hoàn thành đơn!",
        "Đã bị huỷ!",
        "Đã bị bởi ",
        "case 8",
        "case 9",
    ]

    return liststatus[key];

}
export default OrderDetail;
