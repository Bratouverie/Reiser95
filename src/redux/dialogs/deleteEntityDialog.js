import { createSlice } from '@reduxjs/toolkit';

const INITAL_STATE = {
    isOpen: false,
};

export const deleteEntityDialogSlice = createSlice({
    name: 'deleteEntityDialog',
    initialState: INITAL_STATE,
    reducers: {
        onOpen: (state, action) => {
            console.log({ action });
            state.isOpen = true;
            state.id = action.payload;
        },
        onClose: () => INITAL_STATE,
    },
});

export const { onOpen, onClose } = deleteEntityDialogSlice.actions;

export default deleteEntityDialogSlice.reducer;
