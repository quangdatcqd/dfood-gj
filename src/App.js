// in app.js
import * as React from "react";
import { SnackbarProvider } from 'notistack';
import { Routes, BrowserRouter, Route, } from "react-router-dom";
import Home from "./pages/Home";
import { createTheme, ThemeProvider } from '@mui/material/styles';


import Login from "./pages/Login";
import CheckUserValid from "./pages/CheckUserValid";
// import MapMarker from "./components/MapMarker";
function App() {
  const theme = createTheme();

  return (

    <ThemeProvider theme={theme}  >
      <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "left" }} maxSnack={3} autoHideDuration={1500}>

        <BrowserRouter>

          <Routes>

            <Route path="/*" element={<CheckUserValid children={<Login />} />} />
            <Route path="/home" element={<CheckUserValid children={<Home />} />} />
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