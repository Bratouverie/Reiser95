import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../const/http/API_URLS';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import { generateQuery } from '../../utils/http/generateQuery';

export const dataApi = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const {
                auth: { accessToken },
            } = getState();

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }

            return headers;
        },
    }),
    endpoints: builder => ({
        // GET
        // pages
        getPages: builder.query({
            query: () => ({
                url: 'page/',
            }),
        }),
        getPageByUrl: builder.query({
            query: url => ({
                url: `page/${url}`,
            }),
        }),
        getAccounts: builder.query({
            query: (page, pageSize) => ({
                url: `account/${generateQuery({ page, page_size: pageSize })}`,
            }),
        }),
        getCollections: builder.query({
            query: (page, pageSize) => ({
                url: `collection/${generateQuery({ page, page_size: pageSize })}`,
            }),
        }),
        getPacks: builder.query({
            query: (page, pageSize) => ({
                url: `pack/${generateQuery({ page, page_size: pageSize })}`,
            }),
        }),
        getTokens: builder.query({
            query: (page, pageSize) => ({
                url: `token/${generateQuery({ page, page_size: pageSize })}`,
            }),
        }),
        getCurrencyTokens: builder.query({
            query: blockchainId => ({
                url: `currency_token/${generateQuery({ blockchain_id: blockchainId })}`,
            }),
        }),
        getBlockchains: builder.query({
            query: () => ({
                url: `blockchain/`,
            }),
        }),
        // POST
        createPage: builder.mutation({
            query: data => ({
                url: 'page/',
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),
        createAccount: builder.mutation({
            query: data => ({
                url: 'account/',
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),
        createCollection: builder.mutation({
            query: data => ({
                url: 'collection/',
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),
        createPack: builder.mutation({
            query: data => ({
                url: 'pack/',
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),
    }),
});

export const {
    useGetPagesQuery,
    useGetPageByUrlQuery,

    useGetAccountsQuery,
    useGetCollectionsQuery,
    useGetPacksQuery,
    useGetTokensQuery,
    useGetCurrencyTokensQuery,
    useGetBlockchainsQuery,

    useCreatePageMutation,
    useCreateAccountMutation,
    useCreateCollectionMutation,
    useCreatePackMutation,
} = dataApi;
