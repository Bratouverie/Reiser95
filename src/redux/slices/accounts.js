import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { dataApi } from '../api/dataService';

const accountsAdapter = createEntityAdapter({
    selectId: account => account.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState: accountsAdapter.getInitialState({
        isLoading: false,
        error: null,
    }),
    reducers: {
        addAccount: accountsAdapter.addOne,
        deleteAccount: accountsAdapter.removeOne,
        clearError: state => {
            state.error = null;
        },
    },
    extraReducers: builder => {
        // // GET ALL ACCOUNTS LIST
        // builder.addMatcher(dataApi.endpoints.getAccounts.matchFulfilled, (state, action) => {
        //     state.isLoading = false;
        //     accountsAdapter.upsertMany(state, action.payload);
        // });

        // builder.addMatcher(dataApi.endpoints.getAccounts.matchPending, (state, action) => {
        //     state.error = null;
        //     state.isLoading = true;
        // });

        // builder.addMatcher(dataApi.endpoints.getAccounts.matchRejected, (state, action) => {
        //     state.error = action.payload;
        //     state.isLoading = false;
        // });
        // CREATE ACCOUNTS
        builder.addMatcher(dataApi.endpoints.createAccount.matchPending, (state, action) => {
            state.error = null;
            state.isPageCreationProccessing = true;
        });

        builder.addMatcher(dataApi.endpoints.createAccount.matchFulfilled, (state, action) => {
            accountsAdapter.addOne(state, action.payload);
            state.isPageCreationProccessing = false;
        });

        builder.addMatcher(dataApi.endpoints.createAccount.matchRejected, (state, action) => {
            state.error = action.payload;
            state.isPageCreationProccessing = false;
        });
    },
});

export const { addAccount, deleteAccount, clearError } = accountsSlice.actions;

export default accountsSlice.reducer;
