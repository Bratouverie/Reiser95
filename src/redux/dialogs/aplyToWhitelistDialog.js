import { createSlice } from '@reduxjs/toolkit';

const INITAL_STATE = {
    isOpen: false,
};

export const aplyToWhitelistDialogSlice = createSlice({
    name: 'aplyToWhitelistDialo',
    initialState: INITAL_STATE,
    reducers: {
        onOpen: (state, action) => {
            state.isOpen = true;
            state.id = action.payload;
        },
        onClose: () => INITAL_STATE,
    },
});

export const { onOpen, onClose } = aplyToWhitelistDialogSlice.actions;

export default aplyToWhitelistDialogSlice.reducer;
