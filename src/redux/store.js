import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import authSlice, { refreshToken, refreshTokenRequest, setIsAuth } from './slices/auth';
import pagesSlice from './slices/pages';
import accountsSlice from './slices/accounts';
import blockchainsSlice from './slices/blockchains';
import tokensSlice from './slices/tokens';
import collectionsSlice from './slices/collections';
import packsSlice from './slices/packs';
import { authApi } from './api/authService';
import { dataApi } from './api/dataService';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: setIsAuth,
    effect: async (action, { dispatch }) => {
        if (action.payload) {
            dispatch(refreshTokenRequest());
            dispatch(refreshToken());
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: refreshToken,
    effect: async (action, { delay, dispatch }) => {
        console.log(action);
        await delay(3000);
        dispatch(refreshTokenRequest());
        dispatch(refreshToken());
    },
});

export const store = configureStore({
    reducer: {
        auth: authSlice,
        pages: pagesSlice,
        accounts: accountsSlice,
        blockchains: blockchainsSlice,
        tokens: tokensSlice,
        collections: collectionsSlice,
        packs: packsSlice,
        [authApi.reducerPath]: authApi.reducer,
        [dataApi.reducerPath]: dataApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
