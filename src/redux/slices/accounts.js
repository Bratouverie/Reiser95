import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    accounts: [],
};

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isLoading = action.payload;
        },
        setAccounts: (state, action) => {
            state.accounts = action.payload;
        },
        deleteAccount: (state, action) => {
            let newAccountsList = state.accounts.filter(val => {
                return val.id !== action.payload;
            });

            state.accounts = newAccountsList;
        },
    },
});

export const { setIsAuth, setAccounts, deleteAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
