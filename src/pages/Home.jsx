import { React, useState, useEffect, useContext } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSnackbar } from 'notistack';


import Cartpreview from '../components/Cartpreview';
import Restaurants from '../pages/Restaurants';
import SelectDishes from '../pages/SelectDishes';
import Checkout from '../pages/Checkout';
import ModalBox from '../components/ModalBox';
import OrderDetail from '../components/OrderDetail';
import ChoseAddress from '../components/ChoseAddress';
import SwipeBanner from '../components/SwipeBanner';
import GojekAPI from '../API/GojekAPI';
import SwipeCategories from '../components/SwipeCategories';
import SwipeCategoriesV1 from '../components/SwipeCategoriesV1';
import SwipeCategoriesV2 from '../components/SwipeCategoriesV2';
import ListItems from '../components/ListItems';
import { CartContext } from '../Contexts/CartContext';
import ListOrders from '../components/ListOrders';
import ListResVIP from '../components/ListResVIP';



export default function Home() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [currentLoc, setCurrentLoc] = useState(JSON.parse(localStorage.getItem("customerLoc")));
    const [toggleLocationChange, setToggleLocationChange] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleListRes, setToggleListRes] = useState(false);
    const [toggleOrders, setToggleOrders] = useState(false);
    const [toggleOderDetail, setToggleOderDetail] = useState(false);
    const [listOrders, setListOrders] = useState([]);
    const [listOrdersActive, setListOrdersActive] = useState([]);
    const [idOrder, setIdOrder] = useState("");
    const { toggleSelectDishes, setToggleSelectDishes, toggleCheckout, setToggleCheckout } = useContext(CartContext);
    const [toggleSearch, setToggleSearch] = useState(false);
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

        // ftabTWudToKUlyz3yc - DHZ: APA91bGoxvlyyWkFKFoBen85JfvFBAVosjWEt2N3BmxKSjdx97rkcZCSWaMB5Ygoj8ZwFuWbA70_CHate8E1rcZmQTIetRNsGM1Y8VwsuyXOxGACSVm3FaLCMjI1sVJ0kGiKWuKo0O0x

        getOrdersActive();



    }, []);
    const getListOrders = async () => {
        setToggleOrders(toggleOrders ? false : true);
        if (!toggleOrders) {
            var data = await GojekAPI.getListOrders();
            getOrdersActive();
            setListOrders(data);
        }


    }
    const getOrdersActive = async () => {
        try {
            var data = await GojekAPI.getOrdersActive();
            if (data?.success) {
                setListOrdersActive(data);

            } else {
                enqueueSnackbar(data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!", { variant: 'success' });

            }
        } catch (error) {
            enqueueSnackbar(data?.message, { variant: 'error' });
        }

    }

    return (
        <div style={{ backgroundColor: "white" }} >
            <div>
                <div className='btn-menu'
                    onClick={() => setToggleMenu(toggleMenu ? false : true)}
                >
                    <div className='menu-div'></div>
                    <div className='menu-div'></div>
                    <div className='menu-div'></div>
                </div>

                {
                    listOrdersActive?.data?.cards?.length > 0 &&
                    <div className='btn-active-order'
                        onClick={() => {
                            setIdOrder(listOrdersActive?.data?.cards[0]?.event_tracking_properties?.order_id)
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
                    toggleMenu && <div className='boxMenu'
                    >
                        <div onClick={getListOrders}> Đơn hàng của bạn</div>

                    </div>
                }
                {
                    toggleOrders && <ListOrders data={listOrders?.data} dataActive={listOrdersActive?.data} setToggleOderDetail={setToggleOderDetail} setIdOrder={setIdOrder} />
                }

            </div>

            <Box onClick={() => setToggleLocationChange(true)} style={{ width: "100%", textAlign: "center", cursor: "pointer", padding: "6px", backgroundColor: "white", marginBottom: "10px" }} >
                <div style={{ fontSize: "bold", color: "red", marginBottom: "-5px" }} >Vị trí hiện tại <ExpandMoreIcon /></div>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>  {currentLoc?.name} </div>
            </Box>
            <ModalBox open={toggleOderDetail} setOpen={setToggleOderDetail} title={"Chi tiết đơn hàng"} >
                <OrderDetail idOrder={idOrder} />
            </ModalBox>
            <ModalBox open={toggleLocationChange} setOpen={setToggleLocationChange} title={"Thay đổi địa chỉ"} >
                <ChoseAddress
                    setCurrentLoc={setCurrentLoc}
                    setOpen={setToggleLocationChange}
                    onClick={() => {
                        setToggleMenu(false);
                        setToggleOrders(false);
                    }}
                />
            </ModalBox>
            <ModalBox open={toggleSearch} setOpen={setToggleSearch} title={"Tìm món ăn"} >
                <Restaurants />
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

            }} >
                <div
                    style={{
                        width: "100%",
                        padding: "8px 10px",
                        // border: "solid 2px #e0e0e0",
                        borderRadius: "20px",
                        outline: "none",
                        fontSize: "14pt",
                        textAlign: "center",
                        color: "gray",
                        fontWeight: "bold",
                        boxShadow: "0px 0px 5px 5px #e9e9e9"

                    }}

                    // value={keyword}
                    // autoComplete="address"
                    onClick={() => setToggleSearch(true)}
                >Bạn muốn ăn gì nào?</div>



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




                <Cartpreview />


            </Container >
        </div >
    );
}