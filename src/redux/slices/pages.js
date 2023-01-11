import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { dataApi } from '../api/dataService';

const pagesAdapter = createEntityAdapter({
    selectId: page => page.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const pagesSlice = createSlice({
    name: 'pages',
    initialState: pagesAdapter.getInitialState({
        isLoading: false,
        isPageCreationProccessing: false,
        error: null,
    }),
    reducers: {
        addPage: pagesAdapter.addOne,
        deletePage: pagesAdapter.removeOne,
        clearError: state => {
            state.error = null;
        },
    },
    extraReducers: builder => {
        // GET ALL PAGES LIST
        builder.addMatcher(dataApi.endpoints.getPages.matchFulfilled, (state, action) => {
            state.isLoading = false;
            pagesAdapter.upsertMany(state, action.payload);
        });

        builder.addMatcher(dataApi.endpoints.getPages.matchPending, (state, action) => {
            state.error = null;
            state.isLoading = true;
        });

        builder.addMatcher(dataApi.endpoints.getPages.matchRejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
        // CREATE PAGE
        builder.addMatcher(dataApi.endpoints.createPage.matchPending, (state, action) => {
            state.error = null;
            state.isPageCreationProccessing = true;
        });

        builder.addMatcher(dataApi.endpoints.createPage.matchFulfilled, (state, action) => {
            pagesAdapter.addOne(state, action.payload);
            state.isPageCreationProccessing = false;
        });

        builder.addMatcher(dataApi.endpoints.createPage.matchRejected, (state, action) => {
            state.error = action.payload;
            state.isPageCreationProccessing = false;
        });
        // UPDATE PAGE
        builder.addMatcher(dataApi.endpoints.updatePage.matchFulfilled, (state, action) => {
            pagesAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload,
            });
        });
        // HIDE PAGE
        builder.addMatcher(dataApi.endpoints.hidePage.matchFulfilled, (state, action) => {
            console.log({ payload: action.payload });
        });
    },
});

export const pagesSelectors = pagesAdapter.getSelectors(state => state.pages);

export const { addPage, deletePage, clearError } = pagesSlice.actions;

export default pagesSlice.reducer;
