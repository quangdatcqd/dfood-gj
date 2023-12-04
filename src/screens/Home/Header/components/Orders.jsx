import React, { useState, useEffect } from 'react';
import './style.css';
import { OrderAPI } from '../../../../API/GojekAPI';
import { useDispatch } from 'react-redux';
import { setOrderId } from '../../../../store/dialogSlice';
const Orders = ({ toggleOrders }) => {
    const [listOrders, setListOrders] = useState(null);
    const dispatch = useDispatch();
    const getListOrders = async () => {
        var data = await OrderAPI.getListOrders();
        var dataActive = await OrderAPI.getOrdersActive();
        setListOrders({
            orders: data?.data?.cards || [],
            activeActive: dataActive?.data?.cards || [],
        });
    }
    useEffect(() => {
        getListOrders();
    }, []);
    const handleOpenOrderDetail = (id) => {
        dispatch(setOrderId(id))
    }
    return (
        <div className={` ${toggleOrders ? "boxCart2" : "headerBtnBox"}`}>
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
                        <img src="./Khay.jpg" alt="" />
                        <div className='headerBtnBoxItemDes'>
                            <p style={{ color: "red" }}>Đơn hàng đang thực hiện</p>
                            <p style={{ color: "black", fontWeight: "bold" }}>{item?.event_tracking_properties?.order_id}</p>
                            <p>{item?.event_tracking_properties?.order_status}</p>
                        </div>
                    </div>
                })}
                {
                    listOrders === null ?
                        <p className='headerBtnBoxItem'>Đang tải...</p> :
                        (listOrders?.orders?.length <= 0 && listOrders?.activeActive?.length <= 0) && <p className='headerBtnBoxItem'>Đơn hàng trống!</p>
                }
            </div>
        </div>
    );
}

export default Orders;
