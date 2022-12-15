import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { dataApi } from '../api/dataService';

const collectionsAdapter = createEntityAdapter({
    selectId: collection => collection.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState: collectionsAdapter.getInitialState({
        isLoading: false,
        error: null,
    }),
    reducers: {
        addCollection: collectionsAdapter.addOne,
        deleteCollection: collectionsAdapter.removeOne,
        clearError: state => {
            state.error = null;
        },
    },
    extraReducers: builder => {
        // GET ALL COLLECTIONs LIST
        builder.addMatcher(dataApi.endpoints.getCollections.matchFulfilled, (state, action) => {
            state.isLoading = false;
            collectionsAdapter.upsertMany(state, action.payload);
        });

        builder.addMatcher(dataApi.endpoints.getCollections.matchPending, (state, action) => {
            state.error = null;
            state.isLoading = true;
        });

        builder.addMatcher(dataApi.endpoints.getCollections.matchRejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
        // CREATE COLLECTION
        builder.addMatcher(dataApi.endpoints.createCollection.matchPending, (state, action) => {
            state.error = null;
            state.isPageCreationProccessing = true;
        });

        builder.addMatcher(dataApi.endpoints.createCollection.matchFulfilled, (state, action) => {
            collectionsAdapter.addOne(state, action.payload);
            state.isPageCreationProccessing = false;
        });

        builder.addMatcher(dataApi.endpoints.createCollection.matchRejected, (state, action) => {
            state.error = action.payload;
            state.isPageCreationProccessing = false;
        });
    },
});

export const { addCollection, deleteCollection, clearError } = collectionsSlice.actions;

export default collectionsSlice.reducer;
