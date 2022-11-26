import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    collections: [],
};

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isLoading = action.payload;
        },
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
        deleteCollection: (state, action) => {
            let newCollectionsList = state.collections.filter(val => {
                return val.id !== action.payload;
            });

            state.collections = newCollectionsList;
        },
    },
});

export const { setIsAuth, setCollections, deleteCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
