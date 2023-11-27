// in app.js
import * as React from "react";
import { SnackbarProvider } from 'notistack';
import { Routes, BrowserRouter, Route, } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';


import BoxLogin from "./pages/BoxLogin";
import CheckUserValid from "./pages/CheckUserValid";
import Home from "./pages/Home/Home";
import Restaurant from "./pages/Restaurant";
import { useDispatch, useSelector } from 'react-redux';
import ModalBox from "./components/ModalBox";
import { setResDlg } from "./store/dialogSlice";

function App() {
  const theme = createTheme();
  const resDialog = useSelector(state => state.dialog.resDialog.open)
  const dispatch = useDispatch();
  console.log(resDialog);
  const handleOpenRes = (open) => {
    dispatch(setResDlg(open))
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
        <ModalBox open={resDialog} setOpen={() => handleOpenRes()} title="Chọn món" maxWidth="xl" fullWidth={true} useCloseBar={false}>
          <Restaurant />
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