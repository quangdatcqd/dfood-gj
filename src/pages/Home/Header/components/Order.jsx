import React, { useState, useEffect } from 'react';
import './style.css';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { OrderAPI } from '../../../../API/GojekAPI';
const Order = () => {
    const [listOrders, setListOrders] = useState(null);
    const getListOrders = async () => {
        var data = await OrderAPI.getListOrders();
        setListOrders(data?.data?.cards);
    }
    useEffect(() => {
        getListOrders();
    }, []);
    return (
        <div className='headerBtnDiv headerBtnOrder'>
            <ReceiptLongIcon />
            <p >Đơn hàng</p>
            <div className='headerBtnBox'>
                <p className='ptitle'>Đơn hàng</p>
                <div className='headerBtnBoxItems'>

                    {listOrders?.map((item, index) => {
                        return <div className='headerBtnBoxItem' key={index}>
                            <img src={item?.content?.restaurant?.image} alt="" />
                            <div className='headerBtnBoxItemDes'>
                                <p>{item?.content?.restaurant?.name}</p>
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
