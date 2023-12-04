import { React, useState, useEffect, useContext } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSnackbar } from 'notistack';
import './home.css';

import Cartpreview from '../../components/Cartpreview';
import Restaurants from '../SearchBox';
import SelectDishes from '../Restaurant/Restaurant';
import Checkout from '../Checkout';
import ModalBox from '../../components/ModalBox';
import OrderDetail from '../../components/OrderDetail';
import ChoseAddress from './Header/components/ChoseAddress';
import SwipeBanner from '../../components/SwipeBanner';
import { GojekAPI, OrderAPI } from '../../API/GojekAPI';
import SwipeCategories from '../../components/SwipeCategories';
import SwipeCategoriesV1 from '../../components/SwipeCategoriesV1';
import SwipeCategoriesV2 from '../../components/SwipeCategoriesV2';
import ListItems from '../../components/ListItems';
// import ListOrders from '../../components/ListOrders';
import ListResVIP from '../../components/ListResVIP';
import Header from './Header/Header';
import { useDispatch } from 'react-redux';
import { setOrderId } from '../../store/dialogSlice';



export default function Home() {
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [dataImport, setDataImport] = useState("");
    const [toggleListRes, setToggleListRes] = useState(false);

    const [listOrdersActive, setListOrdersActive] = useState([]);


    const [dataHomeCards, setDataHomeCards] = useState();
    const [dataDealsHome, setDataDealsHome] = useState();
    useEffect(() => {
        const fetchHomeCards = async () => {
            var data = await GojekAPI.cardsGofoodV2();
            setDataHomeCards(data?.data);
        }
        fetchHomeCards();

        const fetchDealsHOme = async () => {
            var data = await GojekAPI.dealsHome();
            setDataDealsHome(data?.data);
        }
        fetchDealsHOme();
        getOrdersActive();


    }, []);

    const getOrdersActive = async () => {
        try {
            var data = await OrderAPI.getOrdersActive();
            if (data?.success) {
                setListOrdersActive(data);

            } else {
                enqueueSnackbar(data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!", { variant: 'success' });

            }
        } catch (error) {
            enqueueSnackbar(error?.message, { variant: 'error' });

        }

    }


    const handleOpenOrderDetail = () => {
        dispatch(setOrderId(localStorage.getItem("idOrder")))
    }

    return (
        <div style={{ backgroundColor: "white", paddingTop: "40px" }} >
            <Header />
            <div>
                {
                    listOrdersActive?.data?.cards?.length > 0 &&
                    <div className='btn-active-order'
                        onClick={() => handleOpenOrderDetail()}
                    >
                        <div className='mess-ac' > Tới đây...
                            <div className='mess-af'> </div>
                        </div>
                        <img width={70} height={70} src="active-order.gif" alt="" />
                    </div>
                }
                {
                    // toggleOrders && <ListOrders data={listOrders?.data} dataActive={listOrdersActive?.data} setToggleOderDetail={setToggleOderDetail} setIdOrder={setIdOrder} />
                }
            </div>











            {/* <ModalBox open={toggleOderDetail} setOpen={setToggleOderDetail} title={"Chi tiết đơn hàng"} >
                <OrderDetail idOrder={idOrder} />
            </ModalBox>

            <ModalBox open={toggleListRes} setOpen={setToggleListRes} title={"Ưu đãi món ăn"} >
                <ListResVIP open={toggleListRes} />
            </ModalBox> */}
            {/* modal chọn món ăn */}
            {/* <ModalBox open={toggleSelectDishes} setOpen={setToggleSelectDishes} title={title || "Vui lòng chọn món"}>
                <SelectDishes />
            </ModalBox> */}

            {/* modal đặt đơn */}
            {/* <ModalBox open={toggleCheckout} setOpen={setToggleCheckout} title={title || "Vui lòng chọn món"} >
                <Checkout getOrdersActive={getOrdersActive} />
            </ModalBox> */}


            <Container onClick={() => {
                setToggleMenu(false);

            }} >

                {
                    dataHomeCards?.cards?.map((item, index) => {
                        if (item?.card_type === 11) {
                            return <SwipeBanner banners={item} key={index} />
                        }
                        if (item?.card_type === 13) {
                            return <SwipeCategories data={item} key={index} />
                        }
                        if (item?.card_type === 42 || item?.card_type === 12) {
                            return <SwipeCategoriesV1 data={item} key={index} />
                        }
                        if (item?.card_type === 47) {
                            return <SwipeCategoriesV2 products={item} key={index} />
                        }
                        if (item?.card_type === 48) {
                            return <ListItems listmerchants={item} key={index} />
                        }
                    })
                }
                {
                    (dataDealsHome?.cards?.length > 0 && dataDealsHome?.cards[0]?.content?.offer_list?.discounts?.length > 0) &&
                    <div className='box-coupon' onClick={() => setToggleListRes(true)}>
                        {dataDealsHome?.cards[0]?.content?.offer_list?.discounts[0]?.title}
                    </div>
                }



                {/* <Cartpreview /> */}


            </Container >
        </div >
    );
}