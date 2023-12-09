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
        },
        itemFilterDialog: {
            open: false,
            data: "",
            title: "tilte"
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
        },
        setCheckoutDlg: (state, action) => {
            state.checkoutDialog.open = action.payload;
        },
        setCheckoutData: (state, action) => {
            state.checkoutDialog.index = action.payload;
            state.checkoutDialog.open = true;
        },
        setItemFilterDlg: (state, action) => {
            state.itemFilterDialog.open = action.payload;
        },
        setItemFilterData: (state, action) => {
            state.itemFilterDialog.data = action.payload.data;
            state.itemFilterDialog.title = action.payload.title;
            state.itemFilterDialog.open = true;
        }
    },
});

export const {
    setResDlg, setResId,
    setOrderDlg, setOrderId,
    setCheckoutData, setCheckoutDlg,
    setItemFilterData, setItemFilterDlg
} = appDialog.actions;

export default appDialog.reducer;
