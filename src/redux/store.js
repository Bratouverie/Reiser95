import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth';
import pagesSlice from './slices/pages';
import accountsSlice from './slices/accounts';
import blockchainsSlice from './slices/blockchains';
import tokensSlice from './slices/tokens';
import collectionsSlice from './slices/collections';
import packsSlice from './slices/packs';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        pages: pagesSlice,
        accounts: accountsSlice,
        blockchains: blockchainsSlice,
        tokens: tokensSlice,
        collections: collectionsSlice,
        packs: packsSlice,
    },
});
