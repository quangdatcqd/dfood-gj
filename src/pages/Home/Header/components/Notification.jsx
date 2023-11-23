import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './style.css';
const Notification = () => {
    return (

        <div className='headerBtnDiv headerBtnNoti'>
            <NotificationsIcon />
            <p >Thông báo</p>
        </div>
    );
}

export default Notification;
