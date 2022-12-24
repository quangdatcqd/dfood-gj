// in app.js
import * as React from "react";
import { SnackbarProvider } from 'notistack';
import { Routes, BrowserRouter, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SelectDishes from "./pages/SelectDishes";
import Header from "./components/BackBtn";

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }} maxSnack={2}>
        <BrowserRouter>

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id/*" element={<Restaurants />} />
            <Route path="/selectdishes/:id/*" element={<SelectDishes />} />

          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider >

  )
}
export default App;