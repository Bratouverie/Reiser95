import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    blockchains: [],
};

export const blockchainsSlice = createSlice({
    name: 'blockchains',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isLoading = action.payload;
        },
        setBlockchains: (state, action) => {
            state.blockchains = action.payload;
        },
        deleteAccount: (state, action) => {
            let newBlockchainsList = state.blockchains.filter(val => {
                return val.id !== action.payload;
            });

            state.blockchains = newBlockchainsList;
        },
    },
});

export const { setIsAuth, setBlockchains, deleteAccount } = blockchainsSlice.actions;

export default blockchainsSlice.reducer;
