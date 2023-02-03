
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import { IconButton, Tooltip } from "@mui/material";

const BackBtn = (props) => {
    let navigate = useNavigate();
    return (
        <Tooltip onClick={() => navigate(-1)} style={{ backgroundColor: "rgb(29 29 29 / 70%)", color: "white", zIndex: 999, position: "fixed", fontSize: "20px", bottom: "100px", left: "10px" }}>

            <IconButton  >
                < ArrowBackIcon />
            </IconButton>
        </Tooltip>
    );
}

export default BackBtn;
