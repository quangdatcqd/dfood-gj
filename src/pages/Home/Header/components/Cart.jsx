import React from 'react';
import './style.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckoutData } from '../../../../store/dialogSlice';

const Cart = () => {
    const listCart = useSelector(state => state.cart.CartList)
    const dispatch = useDispatch();
    const handleSelectCart = (index) => {
        dispatch(setCheckoutData(index))
    }



    return (

        <div className='headerBtnDiv headerBtnCart'>
            <ShoppingCartIcon />
            <p >Giỏ hàng</p>
            <div className='headerBtnBox'>
                <p className='ptitle'>Giỏ hàng</p>
                <div className='headerBtnBoxItems'>
                    {
                        listCart?.map((item, index) => {
                            return <div className='headerBtnBoxItem' key={index} onClick={() => handleSelectCart(index)}>
                                <img src={item?.resData?.resImage} alt="" />
                                <div className='headerBtnBoxItemDes'>
                                    <p>{item?.resData?.resName}</p>
                                    <p>{(item?.totalPrice).toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
                                </div>
                            </div>
                        })
                    }



                </div>
            </div>
        </div>
    );
}

export default Cart;
