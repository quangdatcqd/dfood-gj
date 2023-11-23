import React from 'react';
import './style.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
    return (

        <div className='headerBtnDiv headerBtnCart'>
            <ShoppingCartIcon />
            <p >Giỏ hàng</p>
            <div className='headerBtnBox'>
                <p className='ptitle'>Giỏ hàng</p>
                <div className='headerBtnBoxItems'>
                    <div className='headerBtnBoxItem'>
                        <img src="https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/6bb3d38d-96d3-4dea-9ccb-02fad933e77f_brand-image_1690516414799.jpg?fit=crop&w=800&h=400" alt="" />
                        <div className='headerBtnBoxItemDes'>
                            <p>Sinh Tố - Nước Ép - Trà Trái Cây Gạo Sữa, Phạm Văn Chiêu sdfsd sdfsd fs dfs df</p>
                            <p>{(250000).toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
                        </div>
                    </div>
                    <div className='headerBtnBoxItem'>
                        <img src="https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/6bb3d38d-96d3-4dea-9ccb-02fad933e77f_brand-image_1690516414799.jpg?fit=crop&w=800&h=400" alt="" />
                        <div className='headerBtnBoxItemDes'>
                            <p>Sinh Tố - Nước Ép - Trà Trái Cây Gạo Sữa, Phạm Văn Chiêu sdfsd sdfsd fs dfs df</p>
                            <p>{(250000).toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
                        </div>
                    </div>
                    <div className='headerBtnBoxItem'>
                        <img src="https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/6bb3d38d-96d3-4dea-9ccb-02fad933e77f_brand-image_1690516414799.jpg?fit=crop&w=800&h=400" alt="" />
                        <div className='headerBtnBoxItemDes'>
                            <p>Sinh Tố - Nước Ép - Trà Trái Cây Gạo Sữa, Phạm Văn Chiêu sdfsd sdfsd fs dfs df</p>
                            <p>{(250000).toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
                        </div>
                    </div>
                    <div className='headerBtnBoxItem'>
                        <img src="https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/6bb3d38d-96d3-4dea-9ccb-02fad933e77f_brand-image_1690516414799.jpg?fit=crop&w=800&h=400" alt="" />
                        <div className='headerBtnBoxItemDes'>
                            <p>Sinh Tố - Nước Ép - Trà Trái Cây Gạo Sữa, Phạm Văn Chiêu sdfsd sdfsd fs dfs df</p>
                            <p>{(250000).toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
                        </div>
                    </div>
                    <div className='headerBtnBoxItem'>
                        <img src="https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/6bb3d38d-96d3-4dea-9ccb-02fad933e77f_brand-image_1690516414799.jpg?fit=crop&w=800&h=400" alt="" />
                        <div className='headerBtnBoxItemDes'>
                            <p>Sinh Tố - Nước Ép - Trà Trái Cây Gạo Sữa, Phạm Văn Chiêu sdfsd sdfsd fs dfs df</p>
                            <p>{(250000).toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
                        </div>
                    </div>
                    <div className='headerBtnBoxItem'>
                        <img src="https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/6bb3d38d-96d3-4dea-9ccb-02fad933e77f_brand-image_1690516414799.jpg?fit=crop&w=800&h=400" alt="" />
                        <div className='headerBtnBoxItemDes'>
                            <p>Sinh Tố - Nước Ép - Trà Trái Cây Gạo Sữa, Phạm Văn Chiêu sdfsd sdfsd fs dfs df</p>
                            <p>{(250000).toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Cart;
