// in app.js
import * as React from "react";
import { SnackbarProvider } from 'notistack';
import { Routes, BrowserRouter, Route, } from "react-router-dom";
import Home from "./pages/Home";
import { createTheme, ThemeProvider } from '@mui/material/styles';


import Login from "./pages/Login";
import MapMarker from "./components/MapMarker";
function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}  >
      <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "left" }} maxSnack={2} autoHideDuration={1500}>

        <BrowserRouter>

          <Routes>

            <Route path="/*" element={<Login />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/explore" element={<Explore />} />
            <Route path="/selectdishes/:id/*" element={<SelectDishes />} />
            <Route path="/checkout" element={<Checkout />} /> */}
            <Route path="/tracking" element={<MapMarker />} />

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