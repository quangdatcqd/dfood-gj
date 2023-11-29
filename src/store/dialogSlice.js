// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const appDialog = createSlice({
    name: 'dialog',
    initialState: {
        resDialog: {
            open: false,
            id: ""
        }
    },
    reducers: {
        setResDlg: (state, action) => {
            state.resDialog.open = action.payload;
        },
        setResId: (state, action) => {
            state.resDialog.id = action.payload;
            state.resDialog.open = true;
        }
    },
});

export const { setResDlg, setResId } = appDialog.actions;

export default appDialog.reducer;
