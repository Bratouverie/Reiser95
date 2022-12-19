import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import authSlice, { refreshToken, refreshTokenRequest, setIsAuth } from './slices/auth';
import pagesSlice from './slices/pages';
import accountsSlice from './slices/accounts';
import blockchainsSlice from './slices/blockchains';
import tokensSlice from './slices/tokens';
import collectionsSlice from './slices/collections';
import packsSlice from './slices/packs';
import deleteEntityDialogSlice from './dialogs/deleteEntityDialog';
import { authApi } from './api/authService';
import { dataApi } from './api/dataService';

const listenerMiddleware = createListenerMiddleware();

let interval;

listenerMiddleware.startListening({
    actionCreator: setIsAuth,
    effect: async (action, { dispatch }) => {
        if (action.payload) {
            interval = setInterval(() => {
                dispatch(refreshTokenRequest());
            }, 300000);
        } else {
            clearInterval(interval);
        }
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
        deleteEntityDialog: deleteEntityDialogSlice,
        [authApi.reducerPath]: authApi.reducer,
        [dataApi.reducerPath]: dataApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
