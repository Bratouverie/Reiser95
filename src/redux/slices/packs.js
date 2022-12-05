import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    packs: [],
};

export const packsSlice = createSlice({
    name: 'packs',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isLoading = action.payload;
        },
        setPacks: (state, action) => {
            state.packs = action.payload;
        },
        deletePack: (state, action) => {
            let newPacksList = state.packs.filter(val => {
                return val.id !== action.payload;
            });

            state.packs = newPacksList;
        },
    },
});

export const { setIsAuth, setPacks, deletePack } = packsSlice.actions;

export default packsSlice.reducer;
