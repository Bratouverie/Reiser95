import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import authSlice, { refreshToken, refreshTokenRequest, setIsAuth } from './slices/auth';
import pagesSlice from './slices/pages';
import accountsSlice from './slices/accounts';
import blockchainsSlice from './slices/blockchains';
import tokensSlice from './slices/tokens';
import collectionsSlice from './slices/collections';
import packsSlice from './slices/packs';
import {
    aplyToWhitelistDialogSlice,
    deleteEntityDialogSlice,
    confirmAplicationDialogSlice,
} from './dialogs';
import { authApi } from './api/authService';
import { dataApi } from './api/dataService';
import { userApi } from './api/userService';
import { ugcApi } from './api/ugcService';

const REFRESH_AUTH_INTERVAL_IN_MS = 5 * 60 * 1000;

const listenerMiddleware = createListenerMiddleware();

let interval;

listenerMiddleware.startListening({
    actionCreator: setIsAuth,
    effect: async (action, { dispatch }) => {
        if (action.payload) {
            interval = setInterval(() => {
                dispatch(refreshTokenRequest());
            }, REFRESH_AUTH_INTERVAL_IN_MS);
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
        aplyToWhitelistDialog: aplyToWhitelistDialogSlice,
        confirmAplicationDialog: confirmAplicationDialogSlice,
        [authApi.reducerPath]: authApi.reducer,
        [dataApi.reducerPath]: dataApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [ugcApi.reducerPath]: ugcApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
