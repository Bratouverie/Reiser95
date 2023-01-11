import { createSlice } from '@reduxjs/toolkit';

const INITAL_STATE = {
    isOpen: false,
};

export const confirmAplicationDialogSlice = createSlice({
    name: 'confirmAplicationDialog',
    initialState: INITAL_STATE,
    reducers: {
        onOpen: (state, action) => {
            state.isOpen = true;
            state.id = action.payload;
        },
        onClose: () => INITAL_STATE,
    },
});

export const { onOpen, onClose } = confirmAplicationDialogSlice.actions;

export default confirmAplicationDialogSlice.reducer;
