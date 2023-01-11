import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    tokens: [],
};

export const tokensSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isLoading = action.payload;
        },
        setTokens: (state, action) => {
            state.tokens = action.payload;
        },
        deleteAccount: (state, action) => {
            let newTokensList = state.tokens.filter(val => {
                return val.id !== action.payload;
            });

            state.tokens = newTokensList;
        },
    },
});

export const { setIsAuth, setTokens, deleteAccount } = tokensSlice.actions;

export default tokensSlice.reducer;
