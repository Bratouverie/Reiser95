import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { dataApi } from '../api/dataService';

const packsAdapter = createEntityAdapter({
    selectId: account => account.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const packsSlice = createSlice({
    name: 'packs',
    initialState: packsAdapter.getInitialState({
        isLoading: false,
        error: null,
    }),
    reducers: {
        addPack: packsAdapter.addOne,
        deletePack: packsAdapter.removeOne,
        clearError: state => {
            state.error = null;
        },
    },
    extraReducers: builder => {
        // GET ALL PACKS LIST
        builder.addMatcher(dataApi.endpoints.getPacks.matchFulfilled, (state, action) => {
            state.isLoading = false;
            packsAdapter.upsertMany(state, action.payload);
        });

        builder.addMatcher(dataApi.endpoints.getPacks.matchPending, (state, action) => {
            state.error = null;
            state.isLoading = true;
        });

        builder.addMatcher(dataApi.endpoints.getPacks.matchRejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
        // CREATE PACK
        builder.addMatcher(dataApi.endpoints.createPack.matchPending, (state, action) => {
            state.error = null;
            state.isPageCreationProccessing = true;
        });

        builder.addMatcher(dataApi.endpoints.createPack.matchFulfilled, (state, action) => {
            packsAdapter.addOne(state, action.payload);
            state.isPageCreationProccessing = false;
        });

        builder.addMatcher(dataApi.endpoints.createPack.matchRejected, (state, action) => {
            state.error = action.payload;
            state.isPageCreationProccessing = false;
        });
    },
});

export const { addPack, deletePack, clearError } = packsSlice.actions;

export default packsSlice.reducer;
