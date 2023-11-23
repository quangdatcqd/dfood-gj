import { React, useState, useEffect, useContext } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSnackbar } from 'notistack';
import './home.css';

import Cartpreview from '../../components/Cartpreview';
import Restaurants from '../Restaurants';
import SelectDishes from '../SelectDishes';
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
import { CartContext } from '../../Contexts/CartContext';
import ListOrders from '../../components/ListOrders';
import ListResVIP from '../../components/ListResVIP';
import Header from './Header/Header';



export default function Home() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [toggleLocationChange, setToggleLocationChange] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [dataImport, setDataImport] = useState("");
    const [toggleListRes, setToggleListRes] = useState(false);
    const [toggleOrders, setToggleOrders] = useState(false);
    const [toggleImport, setToggleImport] = useState(false);
    const [toggleOderDetail, setToggleOderDetail] = useState(false);

    const [listOrdersActive, setListOrdersActive] = useState([]);
    const [idOrder, setIdOrder] = useState("");
    const { toggleSelectDishes, setToggleSelectDishes, toggleCheckout, setToggleCheckout } = useContext(CartContext);

    const [dataHomeCards, setDataHomeCards] = useState();
    const [dataDealsHome, setDataDealsHome] = useState();
    const indexBanner = dataHomeCards?.cards?.findIndex((element) => element?.card_type === 11);
    const indexDealsHome = dataDealsHome?.data?.cards?.findIndex((element) => element?.card_type === 60014);
    const indexCategories = dataHomeCards?.cards?.findIndex((element) => element?.card_type === 13);
    const indexCategoriesV1 = dataHomeCards?.cards?.findIndex((element) => element?.card_type === 42);
    const indexCategoriesV2 = dataHomeCards?.cards?.findIndex((element) => element?.card_type === 47);
    const indexListRecomen = dataHomeCards?.cards?.findIndex((element) => element?.card_type === 48);
    const title = JSON.parse(localStorage.getItem("merchantLoc"))?.name;

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
    const handleImport = () => {
        try {
            var data = JSON.parse(dataImport);
            localStorage.setItem("selectedItems", data?.selectedItems)
            localStorage.setItem("merchantData", data?.merchantData)
            localStorage.setItem("merchantLoc", data?.merchantLoc)
            localStorage.setItem("customerLoc", data?.customerLoc)
            localStorage.setItem("payload", data?.payload)
            enqueueSnackbar("Nhập đơn thành công!", { variant: 'success', autoHideDuration: 2500 })
            window.location.reload();
            setToggleImport(false)
        } catch (error) {
            enqueueSnackbar(error?.message, { variant: 'error' })
        }
        setDataImport("")
    }
    return (
        <div style={{ backgroundColor: "white", paddingTop: "40px" }} >

            <Header />
            <div>
                {
                    listOrdersActive?.data?.cards?.length > 0 &&
                    <div className='btn-active-order'
                        onClick={() => {
                            setIdOrder(localStorage.getItem("idOrder"))
                            setToggleOderDetail(toggleMenu ? false : true)
                        }}
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
            <ModalBox open={toggleOderDetail} setOpen={setToggleOderDetail} title={"Chi tiết đơn hàng"} >
                <OrderDetail idOrder={idOrder} />
            </ModalBox>

            <ModalBox open={toggleListRes} setOpen={setToggleListRes} title={"Ưu đãi món ăn"} >
                <ListResVIP open={toggleListRes} />
            </ModalBox>
            {/* modal chọn món ăn */}
            <ModalBox open={toggleSelectDishes} setOpen={setToggleSelectDishes} title={title || "Vui lòng chọn món"}>
                <SelectDishes />
            </ModalBox>

            {/* modal đặt đơn */}
            <ModalBox open={toggleCheckout} setOpen={setToggleCheckout} title={title || "Vui lòng chọn món"} >
                <Checkout getOrdersActive={getOrdersActive} />
            </ModalBox>


            <Container onClick={() => {
                setToggleMenu(false);
                setToggleOrders(false);
                setToggleImport(false);

            }} >
                {/* {indexDealsHome >= 0 && (<CardDealsHome banners={dataHomeCards?.cards[indexBanner]} />)} */}
                {indexBanner >= 0 && (<SwipeBanner banners={dataHomeCards?.cards[indexBanner]} />)}
                {
                    // (dataDealsHome?.cards?.length > 0 && dataDealsHome?.cards[0]?.content?.offer_list?.discounts?.length > 0) &&

                    <div className='box-coupon' onClick={() => setToggleListRes(true)}>
                        {dataDealsHome?.cards[0]?.content?.offer_list?.discounts[0]?.title}
                    </div>
                }

                {indexCategories >= 0 && (<SwipeCategories banners={dataHomeCards?.cards[indexCategories]} />)}

                {indexCategoriesV1 >= 0 && (<SwipeCategoriesV1 banners={dataHomeCards?.cards[indexCategoriesV1]} />)}
                {indexCategoriesV2 >= 0 && (<SwipeCategoriesV2 products={dataHomeCards?.cards[indexCategoriesV2]} />)}
                {indexListRecomen >= 0 && (<ListItems listmerchants={dataHomeCards?.cards[indexListRecomen]} />)}




                {/* <Cartpreview /> */}


            </Container >
        </div >
    );
}