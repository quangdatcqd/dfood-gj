import React from 'react';
import './style.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';

const Cart = ({ handleSelectCart, listCart, handleClearCart, handleRemoveCart }) => {


    return (

        <div className='headerBtnDiv headerBtnCart'>
            <ShoppingCartIcon />
            <p >Giỏ hàng</p>
            <div className='headerBtnBox'>
                <p className='ptitle'> Giỏ hàng </p>
                <div className='btnRemoveCartAll' onClick={() => handleClearCart()}>Xoá hết</div>
                <div className='headerBtnBoxItems'>
                    {
                        listCart?.map((item, index) => {
                            return <div className='listCart' key={index}>
                                <div className='headerBtnBoxItem' onClick={() => handleSelectCart(index)}>
                                    <img src={item?.resData?.resImage} alt="" />
                                    <div className='headerBtnBoxItemDes'>
                                        <p>{item?.resData?.resName}</p>
                                        <p>  {(item?.totalPrice).toLocaleString("vi", { style: "currency", currency: "VND" })} - {item?.dishes?.length} món</p>
                                    </div>
                                </div>
                                <div className='btnRemoveCart' onClick={() => handleRemoveCart(index)}>Xoá</div>
                            </div>
                        })
                    }
                    {
                        listCart?.length <= 0 && <p className='headerBtnBoxItem'>Giỏ hàng trống!</p>
                    }


                </div>
            </div>
        </div>
    );
}

export default Cart;
