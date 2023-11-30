// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const appDialog = createSlice({
    name: 'dialog',
    initialState: {
        resDialog: {
            open: false,
            id: ""
        },
        orderDialog: {
            open: false,
            id: ""
        }
        ,
        checkoutDialog: {
            open: false,
            index: ""
        }
    },
    reducers: {
        setResDlg: (state, action) => {
            state.resDialog.open = action.payload;
        },
        setResId: (state, action) => {
            state.resDialog.id = action.payload;
            state.resDialog.open = true;
        },
        setOrderDlg: (state, action) => {
            state.orderDialog.open = action.payload;
        },
        setOrderId: (state, action) => {
            state.orderDialog.id = action.payload;
            state.orderDialog.open = true;
        }
        ,
        setCheckoutDlg: (state, action) => {
            state.checkoutDialog.open = action.payload;
        },
        setCheckoutData: (state, action) => {
            state.checkoutDialog.index = action.payload;
            state.checkoutDialog.open = true;
        }
    },
});

export const { setResDlg, setResId, setOrderDlg, setOrderId, setCheckoutData, setCheckoutDlg } = appDialog.actions;

export default appDialog.reducer;
