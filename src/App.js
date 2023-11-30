// in app.js
import * as React from "react";
import { SnackbarProvider } from 'notistack';
import { Routes, BrowserRouter, Route, } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';


import BoxLogin from "./pages/BoxLogin";
import CheckUserValid from "./pages/CheckUserValid";
import Home from "./pages/Home/Home";
import Restaurant from "./pages/Restaurant/Restaurant";
import { useDispatch, useSelector } from 'react-redux';
import ModalBox from "./components/ModalBox";
import { setCheckoutDlg, setOrderDlg, setResDlg } from "./store/dialogSlice";
import { useMediaQuery } from "@mui/material";
import OrderDetail from "./components/OrderDetail";
import Checkout from "./pages/Checkout";

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
      <ThemeProvider theme={theme}  >
        <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "left" }} maxSnack={3} autoHideDuration={1500}>
          <BrowserRouter>

            <Routes>

              <Route path="/*" element={<BoxLogin />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
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