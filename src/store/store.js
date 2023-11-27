// store.js
import { configureStore } from '@reduxjs/toolkit';
import dialog from './dialogSlice';

export const store = configureStore({
    reducer: {
        dialog: dialog
    },
});
