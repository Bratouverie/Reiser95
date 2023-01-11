import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const blockchainsAdapter = createEntityAdapter({
    selectId: blockchain => blockchain.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const blockchainsSlice = createSlice({
    name: 'blockchains',
    initialState: blockchainsAdapter.getInitialState({
        isLoading: false,
        error: null,
    }),
    reducers: {
        addPage: blockchainsAdapter.addOne,
        deletePage: blockchainsAdapter.removeOne,
        clearError: state => {
            state.error = null;
        },
    },
});

export const blockchainsSelectors = blockchainsAdapter.getSelectors(state => state.blockchains);

export const { addPage, deletePage, clearError } = blockchainsSlice.actions;

export default blockchainsSlice.reducer;
