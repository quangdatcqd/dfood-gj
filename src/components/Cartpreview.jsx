import { Container } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Cartpreview = () => {
    return (
        <div style={{
            width: "100%",
            position: "fixed",
            zIndex: "1000",
            bottom: "10px",
            left: "0px",
            textAlign: "center",

        }}>
            <NavLink to={"/checkout"}  >
                <Container
                    style={{
                        height: "100%",
                        fontSize: "16pt",
                        outline: "none",
                        border: "0",
                        borderRadius: "10px",
                        width: "94%",
                        color: "white",
                        backgroundColor: "#ffd33e",
                        height: "70px"
                    }}
                >

                    giỏ hàng

                </Container>
            </NavLink>
        </div >
    );
}

export default Cartpreview;
