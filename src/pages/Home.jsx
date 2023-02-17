import { React, useState, useEffect, useContext } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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



export default function Home() {

    const [currentLoc, setCurrentLoc] = useState(JSON.parse(localStorage.getItem("customerLoc")));
    const [toggleLocationChange, setToggleLocationChange] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleOrders, setToggleOrders] = useState(false);
    const [toggleOderDetail, setToggleOderDetail] = useState(false);
    const [listOrders, setListOrders] = useState([]);
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
    const title = JSON.parse(localStorage.getItem("merchantLoc"))?.restaurant?.name;

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


        function genTokenDevice(length) {
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters[randomIndex];
            }
            return result;
        }
        var unique_id = genTokenDevice(16);
        localStorage.setItem("unique_id", unique_id);
        // var tokenDevice = genTokenDevice(18) + "-DHZ:" + genTokenDevice(140);
        // localStorage.setItem("token_device", tokenDevice);

        const genSessionID = () => {
            const hexDigits = '0123456789qwertyuioplkjhgfdsazxcvbnm';
            let uuid = '';

            for (let i = 0; i < 36; i++) {
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    uuid += '-';
                } else if (i === 14) {
                    uuid += '4';
                } else if (i === 19) {
                    uuid += hexDigits[(Math.random() * 4) | 8];
                } else {
                    uuid += hexDigits[Math.floor(Math.random() * 16)];
                }
            }
            localStorage.setItem("session_id", uuid);


        }
        genSessionID();
    }, []);
    const getListOrders = async () => {
        setToggleOrders(toggleOrders ? false : true);
        var data = await GojekAPI.getListOrders();
        setListOrders(data);
    }
    const handleClickOrder = (id) => {
        console.log("efdd")

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
                    toggleMenu && <div className='boxMenu'
                    >
                        <div onClick={getListOrders}> Đơn hàng của bạn</div>
                        <div> Đơn hàng của bạn</div>
                    </div>
                }
                {
                    toggleOrders && <ListOrders data={listOrders?.data} setToggleOderDetail={setToggleOderDetail} setIdOrder={setIdOrder} />
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
            <ModalBox open={toggleSearch} setOpen={setToggleSearch} title={"Tìm món"} >
                <Restaurants />
            </ModalBox>
            {/* modal chọn món ăn */}
            <ModalBox open={toggleSelectDishes} setOpen={setToggleSelectDishes} title={title || "Vui lòng chọn món"}>
                <SelectDishes />
            </ModalBox>

            {/* modal đặt đơn */}
            <ModalBox open={toggleCheckout} setOpen={setToggleCheckout} title={title || "Vui lòng chọn món"} >
                <Checkout />
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
                {indexCategories >= 0 && (<SwipeCategories banners={dataHomeCards?.cards[indexCategories]} />)}

                {indexCategoriesV1 >= 0 && (<SwipeCategoriesV1 banners={dataHomeCards?.cards[indexCategoriesV1]} />)}
                {indexCategoriesV2 >= 0 && (<SwipeCategoriesV2 products={dataHomeCards?.cards[indexCategoriesV2]} />)}
                {indexListRecomen >= 0 && (<ListItems listmerchants={dataHomeCards?.cards[indexListRecomen]} />)}




                <Cartpreview />


            </Container >
        </div >
    );
}