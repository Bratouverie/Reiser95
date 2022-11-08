import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    pages: []
}

export const pagesSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isLoading = action.payload;
        },
        setPages: (state, action) => {
            state.pages = action.payload;
        },
        deletePage: (state, action) => {
            let newPagesList = state.pages.filter(val => {
                return val.id !== action.payload;
            });

            state.pages = newPagesList;
        }
    }
});

export const {setIsAuth, setPages, deletePage} = pagesSlice.actions;

export default pagesSlice.reducer;