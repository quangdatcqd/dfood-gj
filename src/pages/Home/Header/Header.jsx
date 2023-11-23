import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './header.css';
import Notification from './components/Notification';
import Order from './components/Order';
import Profile from './components/Profile';
import Cart from './components/Cart';
import { Container, IconButton } from '@mui/material';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ModalBox from '../../../components/ModalBox';
import ChoseAddress from './components/ChoseAddress';
import SearchIcon from '@mui/icons-material/Search';
import Menu from './components/Menu';
import Search from './components/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Restaurants from '../../Restaurants';
const Header = () => {
    const [currentLoc, setCurrentLoc] = useState(localStorage.getItem("customerLoc") ? JSON.parse(localStorage.getItem("customerLoc")) : null);
    const [toggleLocation, setToggleLocation] = useState(false);
    const [toggleSearch, setToggleSearch] = useState(false);
    return (

        <div className='rowHeader'   >
            <Container className='headerContainer'>
                <div className='headerDivLeft'>
                    <div className='headerLogo'>
                        DFood
                    </div>
                    <div className='headerLocation headerLocationSM' onClick={() => setToggleLocation(true)}>
                        <p className='headerLocationTitle'>Vị trí hiện tại    <ExpandMoreIcon /></p>
                        <p className='headerLocationName'>  <FmdGoodIcon style={{ marginTop: "-6px", fontSize: "18px" }} />{currentLoc?.name}</p>

                    </div>

                </div>
                <div className='headerButton'>
                    <Search setToggleSearch={setToggleSearch} />
                    <Notification />
                    <Order />
                    <Cart />
                    <Profile />
                    <Menu />
                </div>

            </Container>
            <div className='divSearchHeaderSM'>
                <div className='headerLocation headerSearchBar ' onClick={() => setToggleSearch(true)}>
                    <p className='headerLocationName'>  <SearchIcon style={{ marginTop: "-2px", fontSize: "20px" }} />Tìm kiếm món ăn</p>
                </div>
                <IconButton
                    edge="start"
                    color="inherit"
                    style={{ margin: "0px 15px 0px 0px" }}
                >
                    <ShoppingCartIcon />
                </IconButton>
            </div>
            <ModalBox open={toggleLocation} setOpen={setToggleLocation} title={"Thay đổi địa chỉ"} >
                <ChoseAddress />
            </ModalBox>
            <ModalBox open={toggleSearch} setOpen={setToggleSearch} title={"Tìm món ăn"} fulls={false} fullWidth={true} maxWidth={"lg"}>
                <Restaurants />
            </ModalBox>
        </div>
    );
}

export default Header;
