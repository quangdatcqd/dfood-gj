import React from 'react';
import './style.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
const Menu = ({ toggleMenu, setToggleMenu, handleOpenLogin, handleLogout, userProfile }) => {


    return (
        <div className={`boxMenuItem ${toggleMenu && "boxMenuItemOn"}`}>
            <div className='boxMenuBar' > <span>Thông tin cá nhân</span> <CloseOutlinedIcon className='btnCloseMenu' onClick={() => setToggleMenu(false)} /></div>
            <div className='boxMenuUser' onClick={() => handleOpenLogin()} >
                <div >
                    <img src={userProfile?.profile_image_url || "/Khay.jpg"} alt="" />
                    <div className='boxMenuUserDetail'>
                        <p>{userProfile?.name || "Đăng nhập"}</p>
                        {
                            userProfile &&
                            <>
                                <p>{userProfile?.email}</p>
                                <p>{userProfile?.phone}</p>
                            </>
                        }

                    </div>
                </div>
                {
                    userProfile &&
                    <EditIcon className='profileBtnEdit' />
                }

            </div>
            {
                userProfile &&
                <div className='menuBtnLogout' onClick={() => handleLogout()}>
                    Đăng xuất <LogoutIcon className='menuBtnLogoutIcon' />
                </div>
            }
        </div>
    );
}

export default Menu;
