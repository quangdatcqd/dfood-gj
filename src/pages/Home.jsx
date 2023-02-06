import { React, useState, useEffect, useContext } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Cartpreview from '../components/Cartpreview';
import Restaurants from '../pages/Restaurants';
import SelectDishes from '../pages/SelectDishes';
import Checkout from '../pages/Checkout';
import ModalBox from '../components/ModalBox';
import ChoseAddress from '../components/ChoseAddress';
import SwipeBanner from '../components/SwipeBanner';
import GojekAPI from '../API/GojekAPI';
import SwipeCategories from '../components/SwipeCategories';
import SwipeCategoriesV1 from '../components/SwipeCategoriesV1';
import SwipeCategoriesV2 from '../components/SwipeCategoriesV2';
import ListItems from '../components/ListItems';
import { CartContext } from '../Contexts/CartContext';


export default function Home() {
    const [currentLoc, setCurrentLoc] = useState(JSON.parse(localStorage.getItem("customerLoc")));
    const [toggleLocationChange, setToggleLocationChange] = useState(false);
    const { toggleSelectDishes, setToggleSelectDishes, toggleCheckout, setToggleCheckout } = useContext(CartContext);

    const [toggleSearch, setToggleSearch] = useState(false);
    const [dataHomeCards, setDataHomeCards] = useState();
    const indexBanner = dataHomeCards?.cards?.findIndex((element) => element?.card_type === 11);
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

    }, []);


    return (
        <div style={{ backgroundColor: "white" }}>

            <Box onClick={() => setToggleLocationChange(true)} style={{ width: "100%", textAlign: "center", padding: "6px", backgroundColor: "white", marginBottom: "10px" }} >
                <div style={{ fontSize: "bold", color: "red", marginBottom: "-5px" }} >Vị trí hiện tại <ExpandMoreIcon /></div>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>  {currentLoc?.name} </div>
            </Box>
            <ModalBox open={toggleLocationChange} setOpen={setToggleLocationChange} title={"Thay đổi địa chỉ"} >
                <ChoseAddress setCurrentLoc={setCurrentLoc} setOpen={setToggleLocationChange} />
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
            <Container >
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



                {indexBanner >= 0 && (<SwipeBanner banners={dataHomeCards?.cards[indexBanner]} />)}
                {indexCategories >= 0 && (<SwipeCategories banners={dataHomeCards?.cards[indexCategories]} />)}

                {indexCategoriesV1 >= 0 && (<SwipeCategoriesV1 banners={dataHomeCards?.cards[indexCategoriesV1]} />)}
                {indexCategoriesV2 >= 0 && (<SwipeCategoriesV2 products={dataHomeCards?.cards[indexCategoriesV2]} />)}
                {indexListRecomen >= 0 && (<ListItems listmerchants={dataHomeCards?.cards[indexListRecomen]} />)}




                <Cartpreview />


            </Container >
        </div>
    );
}