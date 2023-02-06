// in app.js
import * as React from "react";
import { SnackbarProvider } from 'notistack';
import { Routes, BrowserRouter, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SelectDishes from "./pages/SelectDishes";
import Checkout from "./pages/Checkout";
import TrackingOrder from "./pages/ChatBox";
import Explore from "./pages/Explore";
import Login from "./pages/Login";

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}  >
      <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }} maxSnack={1}>

        <BrowserRouter>

          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/selectdishes/:id/*" element={<SelectDishes />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/tracking" element={<TrackingOrder />} />

          </Routes>
        </BrowserRouter>

      </SnackbarProvider>
      {/* {AddLibrary("https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&libraries=places&v=weekly")
      } */}
    </ThemeProvider >



  )
}
export default App;
export function AddLibrary(urlOfTheLibrary) {
  const script = document.createElement('script');
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}