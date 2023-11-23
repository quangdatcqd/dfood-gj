import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import './style.css';
import Login from './Login';
const Profile = () => {
    const [toggleLogin, setToggleLogin] = useState(false);
    return (
        <>
            <div className='headerBtnDiv headerBtnProfile' onClick={() => setToggleLogin(toggleLogin ? false : true)}>
                <PersonIcon />
                <p >Đăng nhập</p>
            </div>
            {
                toggleLogin &&
                <Login open={toggleLogin} setOpen={setToggleLogin} />
            }
        </>
    );
}

export default Profile;
