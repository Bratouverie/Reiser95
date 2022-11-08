import { configureStore } from "@reduxjs/toolkit";

import authSlice from './slices/auth';
import pagesSlice from './slices/pages';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        pages: pagesSlice
    }
});