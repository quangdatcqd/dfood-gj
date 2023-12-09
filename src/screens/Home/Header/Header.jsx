import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './header.css';
import Notification from './components/Notification';
import Orders from './components/Orders';
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
import SearchBox from '../../SearchBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckoutData } from '../../../store/dialogSlice';
import { clearCart, removeCart } from '../../../store/cartSlice';
import Login from './components/Login';
const Header = () => {
    const [currentLoc, setCurrentLoc] = useState(localStorage.getItem("customerLoc") ? JSON.parse(localStorage.getItem("customerLoc")) : null);
    const userProfile = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    const [toggleLocation, setToggleLocation] = useState(false);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleCart, setToggleCart] = useState(false);
    const [toggleOrders, setToggleOrders] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleLogin, setToggleLogin] = useState(!userProfile);
    const listCart = useSelector(state => state.cart.CartList)
    const dispatch = useDispatch();
    const handleSelectCart = (index) => {
        dispatch(setCheckoutData(index))
    }
    const handleClearCart = () => {
        dispatch(clearCart())
    }
    const handleRemoveCart = (index) => {
        dispatch(removeCart(index))
    }

    const handleLogout = () => {
        localStorage.removeItem("userInfo")
        window.location.reload();
    }
    const handleOpenLogin = () => {
        !userProfile && setToggleLogin(true)
    }
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
                    {/* <Order /> */}
                    <div className='headerBtnDiv headerBtnOrder'>
                        <ReceiptLongIcon />
                        <p >Đơn hàng</p>
                        <Orders />
                    </div>
                    <Cart listCart={listCart} handleSelectCart={handleSelectCart} handleClearCart={handleClearCart} handleRemoveCart={handleRemoveCart} />
                    <div className='headerBtnDiv headerBtnProfile' onClick={() => handleOpenLogin()}>
                        <PersonIcon />
                        <p style={{ width: "70px", overflow: "hidden", textWrap: "nowrap" }}>
                            {
                                userProfile ? userProfile?.name : "Đăng nhập"
                            }
                        </p>
                        {
                            userProfile &&
                            <div className='boxProfileH'>
                                <p>Thông tin</p>
                                <p onClick={() => handleLogout()}>Đăng xuất</p>
                            </div>
                        }
                    </div>
                    {
                        toggleLogin &&
                        <Login open={toggleLogin} setOpen={setToggleLogin} />
                    }
                    <div className='headerBtnDiv headerBtnMenu' >
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                setToggleMenu(true);
                                setToggleCart(false);
                                setToggleOrders(false);
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                </div>
            </Container>


            <Menu setToggleMenu={setToggleMenu}
                toggleMenu={toggleMenu}
                handleLogout={handleLogout}
                userProfile={userProfile}
                handleOpenLogin={handleOpenLogin}
            />
            <div className='divSearchHeaderSM'>
                <div className='headerLocation headerSearchBar ' onClick={() => setToggleSearch(true)}>
                    <p className='headerLocationName'>  <SearchIcon style={{ marginTop: "-2px", fontSize: "18px" }} />Tìm kiếm món ăn</p>
                </div>
                <IconButton
                    edge="start"
                    color="inherit"
                    style={{ margin: "0px 5px 0px 10px" }}
                    className='btnCart2'
                    onClick={() => {
                        setToggleOrders(toggleOrders ? false : true)
                        setToggleMenu(false);
                        setToggleCart(false);

                    }}
                >
                    {
                        toggleOrders ? <HighlightOffIcon /> : <ReceiptLongOutlinedIcon />
                    }
                </IconButton>
                {
                    toggleOrders &&
                    <Orders toggleOrders={toggleOrders} />
                }
                <IconButton
                    edge="start"
                    color="inherit"
                    style={{ margin: "0px 7px 0px 0px" }}
                    className='btnCart2'
                    onClick={() => {
                        setToggleCart(toggleCart ? false : true)
                        setToggleMenu(false);
                        setToggleOrders(false);
                    }
                    }
                >
                    {
                        toggleCart ? <HighlightOffIcon /> : <ShoppingCartIcon />
                    }
                </IconButton>
                {
                    toggleCart &&
                    <div className='boxCart2'>
                        <p className='ptitle'  >Giỏ hàng của bạn</p>
                        <div className='btnRemoveCartAll' onClick={() => handleClearCart()}>Xoá hết</div>
                        <div className='listCart2'>
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
                                listCart?.length <= 0 && <p className='headerBtnBoxItem' >Giỏ hàng trống!</p>
                            }
                        </div>
                    </div>
                }
            </div>
            <ModalBox open={toggleLocation} setOpen={setToggleLocation} title={"Thay đổi địa chỉ"} >
                <ChoseAddress />
            </ModalBox>
            <ModalBox open={toggleSearch} setOpen={setToggleSearch} title={"Tìm món ăn"} fulls={false} fullWidth={true} maxWidth={"lg"}>
                <SearchBox />
            </ModalBox>
        </div>
    );
}


export default Header;
