// in app.js
import * as React from "react";
import { SnackbarProvider } from 'notistack';
import { Routes, BrowserRouter, Route, } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';


import BoxLogin from "./screens/BoxLogin";
import CheckUserValid from "./screens/CheckUserValid";
import Home from "./screens/Home/Home";
import Restaurant from "./screens/Restaurant/Restaurant";
import { useDispatch, useSelector } from 'react-redux';
import ModalBox from "./components/ModalBox";
import { setCheckoutDlg, setOrderDlg, setResDlg } from "./store/dialogSlice";
import { useMediaQuery } from "@mui/material";
import OrderDetail from "./components/OrderDetail";
import Checkout from "./screens/Checkout";

function App() {
  const theme = createTheme();
  const matchMD = useMediaQuery("(max-width:1024px)")
  const resDialog = useSelector(state => state.dialog.resDialog.open)
  const dispatch = useDispatch();
  const handleOpenRes = (open) => {
    dispatch(setResDlg(open))
  }
  const orderDialog = useSelector(state => state.dialog.orderDialog.open)
  const handleOpenOrderDetail = (open) => {
    dispatch(setOrderDlg(open))
  }
  const checkoutDialog = useSelector(state => state.dialog.checkoutDialog.open)
  const handleOpenCheckout = (open) => {
    dispatch(setCheckoutDlg(open))
  }
  return (
    <>
      <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "left" }} maxSnack={3} autoHideDuration={2500}>
        <ThemeProvider theme={theme}  >
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider >
        {
          resDialog &&
          <ModalBox open={resDialog} setOpen={handleOpenRes} title="Chọn món" maxWidth="xl" fulls={matchMD} fullWidth={true} useCloseBar={false}>
            <Restaurant />
          </ModalBox>
        }
        {
          orderDialog &&
          <ModalBox open={orderDialog} setOpen={handleOpenOrderDetail} title="Đơn hàng" maxWidth="md" fulls={matchMD} fullWidth={true}  >
            <OrderDetail />
          </ModalBox>
        }
        {
          checkoutDialog &&
          <ModalBox open={checkoutDialog} setOpen={handleOpenCheckout} title="Thanh toán" maxWidth="md" fulls={matchMD} fullWidth={true}  >
            <Checkout />
          </ModalBox>
        }
      </SnackbarProvider >
    </>
  )
}
export default App;
export function AddLibrary(urlOfTheLibrary) {
  const script = document.createElement('script');
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}