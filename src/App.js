// in app.js
import * as React from "react";
import { SnackbarProvider } from 'notistack';
import { Routes, BrowserRouter, Route, } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';


import BoxLogin from "./pages/BoxLogin";
import CheckUserValid from "./pages/CheckUserValid";
import Home from "./pages/Home/Home";
// import MapMarker from "./components/MapMarker";
function App() {
  const theme = createTheme();

  return (

    <ThemeProvider theme={theme}  >
      <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "left" }} maxSnack={3} autoHideDuration={1500}>

        <BrowserRouter>

          <Routes>

            <Route path="/*" element={<BoxLogin />} />
            <Route path="/home" element={<Home />} />
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