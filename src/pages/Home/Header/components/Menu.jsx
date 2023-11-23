import React from 'react';
import './style.css';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

const Menu = () => {
    return (

        <div className='headerBtnDiv headerBtnMenu'>
            <IconButton
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
        </div>
    );
}

export default Menu;
