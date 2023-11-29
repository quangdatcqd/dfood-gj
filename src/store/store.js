// store.js
import { configureStore } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import cart from './cartSlice';

export const store = configureStore({
    reducer: {
        dialog: dialog,
        cart: cart
    },
});
