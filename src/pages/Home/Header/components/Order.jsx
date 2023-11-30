import React, { useState, useEffect } from 'react';
import './style.css';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { OrderAPI } from '../../../../API/GojekAPI';
import OrderDetail from '../../../../components/OrderDetail'
import { useDispatch } from 'react-redux';
import { setOrderId } from '../../../../store/dialogSlice';
const Order = () => {
    const [listOrders, setListOrders] = useState(null);
    const [listOrderActive, setListOrderActive] = useState(null);
    const dispatch = useDispatch();
    const getListOrders = async () => {
        var data = await OrderAPI.getListOrders();
        var dataActive = await OrderAPI.getOrdersActive();
        setListOrders({
            orders: data?.data?.cards,
            activeActive: dataActive?.data?.cards,

        });
    }
    useEffect(() => {
        getListOrders();
    }, []);



    const handleOpenOrderDetail = (id) => {
        dispatch(setOrderId(id))
    }
    return (
        <div className='headerBtnDiv headerBtnOrder'>
            <ReceiptLongIcon />
            <p >Đơn hàng</p>
            <div className='headerBtnBox'>
                <p className='ptitle'>Đơn hàng</p>
                <div className='headerBtnBoxItems'>

                    {listOrders?.orders?.map((item, index) => {
                        return <div className='headerBtnBoxItem' key={index} onClick={() => handleOpenOrderDetail(item?.content?.order?.order_number)}>
                            <img src={item?.content?.restaurant?.image} alt="" />
                            <div className='headerBtnBoxItemDes'>
                                <p>{item?.content?.restaurant?.name}</p>
                                <p>{(item?.content?.order?.paid)?.toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
                                <p>{item?.content?.order?.order_status_text}</p>
                            </div>
                        </div>
                    })}
                    {listOrders?.activeActive?.map((item, index) => {
                        return <div className='headerBtnBoxItem' key={index} onClick={() => handleOpenOrderDetail(item?.event_tracking_properties?.order_id)}>
                            <img src={item?.estate?.footer_components?.payload?.extra_payload?.driver_image_url} alt="" />
                            <div className='headerBtnBoxItemDes'>
                                <p>{item?.estate?.body_components}</p>
                                <p>{(item?.content?.order?.paid)?.toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
                                <p>{item?.content?.order?.order_status_text}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>

        </div>

    );
}

export default Order;
