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
    extraReducers: builder => {
        // GET ALL BLOCKCHAINS LIST
        builder.addCase(getAllBlockchains.pending, state => {
            state.error = null;
            state.isLoading = true;
        });

        builder.addCase(getAllBlockchains.fulfilled, (state, action) => {
            blockchainsAdapter.upsertMany(state, action.payload);
            state.isLoading = false;
        });

        builder.addCase(getAllBlockchains.rejected, ({ error, isLoading }, action) => {
            error = action.payload;
            isLoading = false;
        });
    },
});

export const blockchainsSelectors = blockchainsAdapter.getSelectors(state => state.blockchains);

export const { addPage, deletePage, clearError } = blockchainsSlice.actions;

export default blockchainsSlice.reducer;
