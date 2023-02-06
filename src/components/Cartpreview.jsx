
import { Container } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../Contexts/CartContext';
import { fomatCurrency } from '../common';
const Cartpreview = () => {
    const { setToggleCheckout, selectedItems, payload } = useContext(CartContext);

    const [merchantData, setMerchantData] = useState(JSON.parse(localStorage.getItem("merchantLoc")));
    const [countItems, setCountItems] = useState(0);

    useEffect(() => {
        setCountItems(
            payload?.items?.length > 0 && payload?.items?.reduce((total, item) => total + item?.quantity, 0)
        )
    }, [payload, selectedItems]);
    return (
        <div style={{
            width: "100%",
            position: "fixed",
            zIndex: "1000",
            bottom: "10px",
            left: "0px",
            textAlign: "center",
            display: payload?.items?.length <= 0 && "none"
            ,
            cursor: "pointer"

        }}>
            <Container
                style={{

                    fontSize: "13pt",
                    outline: "none",
                    border: "0",
                    borderRadius: "10px",
                    width: "94%",
                    color: "white",
                    backgroundColor: "rgb(2 146 42)",
                    height: "60px",
                    padding: "5px"
                }}
                onClick={() => setToggleCheckout(true)}
            >
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around"
                }}>
                    <div >
                        {countItems} Món
                    </div>
                    <div>
                        {fomatCurrency((Number(payload?.cart_price) - Number(payload?.promo_discount_cart_price)))}
                    </div>
                </div>
                <div>{merchantData?.restaurant?.address}</div>


            </Container>

        </div >
    );
}

export default Cartpreview;
