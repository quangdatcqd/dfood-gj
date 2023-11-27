import React from 'react';
import './style.css';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { OrderAPI } from '../../../../API/GojekAPI';

const Menu = () => {

    const handleClick = async () => {
        await OrderAPI.tracking("F-2289560630");
    }
    return (

        <div className='headerBtnDiv headerBtnMenu' onClick={() => handleClick()}>
            <IconButton
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
        </div>
    );
}

export default Menu;
