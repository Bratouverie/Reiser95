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
    endpoints: (builder) => ({
        // GET
        // PAGE
        getPages: builder.query({
            query: () => ({
                url: 'page/',
            }),
        }),
        getPageByUrl: builder.query({
            query: (url) => ({
                url: `page/${url}/`,
            }),
        }),
        // ACCOUNT
        getAccounts: builder.query({
            query: ({ page, pageSize }) => {
                return {
                    url: `account/${generateQuery({ page, page_size: pageSize })}`,
                };
            },
        }),
        getAccount: builder.query({
            query: ({ id }) => {
                return {
                    url: `account/${id}/`,
                };
            },
        }),
        // COLLECTION
        getCollections: builder.query({
            query: ({ page, pageSize }) => ({
                url: `collection/${generateQuery({ page, page_size: pageSize })}`,
            }),
        }),
        getCollection: builder.query({
            query: ({ id }) => ({
                url: `collection/${id}/`,
            }),
        }),
        // PACK
        getPacks: builder.query({
            query: ({ page, pageSize }) => ({
                url: `pack/${generateQuery({ page, page_size: pageSize })}`,
            }),
        }),
        getPack: builder.query({
            query: ({ id }) => ({
                url: `pack/${id}/`,
            }),
        }),
        // TOKEN
        getTokens: builder.query({
            query: ({ page, pageSize }) => ({
                url: `token/${generateQuery({ page, page_size: pageSize })}`,
            }),
        }),
        getToken: builder.query({
            query: ({ id }) => ({
                url: `token/${id}/`,
            }),
        }),

        getCurrencyTokens: builder.query({
            query: ({ blockchainId }) => {
                return {
                    url: `currency_token/${generateQuery({ blockchain_id: blockchainId })}`,
                };
            },
        }),
        getBlockchains: builder.query({
            query: () => ({
                url: `blockchain/`,
            }),
        }),

        // WITH FILTER PAGINATED
        getFilteredCollection: builder.query({
            query: ({ page, pageSize, accountId }) => ({
                url: `collection_filter/${generateQuery({
                    page,
                    page_size: pageSize,
                    account_id: accountId,
                })}`,
            }),
        }),
        getFilteredPacks: builder.query({
            query: ({ page, pageSize, collectionId }) => ({
                url: `pack_filter/${generateQuery({
                    page,
                    page_size: pageSize,
                    collection_id: collectionId,
                })}`,
            }),
        }),
        getFilteredTokens: builder.query({
            query: ({ page, pageSize, packId, collectionId }) => {
                const queryObj = {
                    page,
                    page_size: pageSize,
                };

                if (packId) {
                    queryObj.pack_id = packId;
                }

                if (collectionId) {
                    queryObj.collection_id = collectionId;
                }

                return {
                    url: `token_filter/${generateQuery(queryObj)}`,
                };
            },
        }),

        // POST
        createPage: builder.mutation({
            query: (data) => ({
                url: 'page/',
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),
        createAccount: builder.mutation({
            query: (data) => ({
                url: 'account/',
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),
        createCollection: builder.mutation({
            query: (data) => ({
                url: 'collection/',
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),
        createPack: builder.mutation({
            query: (data) => ({
                url: 'pack/',
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),

        // PATCH
        updatePage: builder.mutation({
            query: ({ url, data }) => ({
                url: `page/${url}/`,
                method: HTTP_METHODS.PATCH,
                body: data,
            }),
        }),
        updateAccount: builder.mutation({
            query: ({ id, data }) => ({
                url: `account/${id}/`,
                method: HTTP_METHODS.PATCH,
                body: data,
            }),
        }),
        updateCollection: builder.mutation({
            query: ({ id, data }) => ({
                url: `collection/${id}/`,
                method: HTTP_METHODS.PATCH,
                body: data,
            }),
        }),
        updatePack: builder.mutation({
            query: ({ id, data }) => ({
                url: `pack/${id}/`,
                method: HTTP_METHODS.PATCH,
                body: data,
            }),
        }),
        updateToken: builder.mutation({
            query: ({ id, data }) => ({
                url: `token/${id}/`,
                method: HTTP_METHODS.PATCH,
                body: data,
            }),
        }),

        // HIDE ENTITY
        hidePage: builder.mutation({
            query: ({ id, isHide }) => ({
                url: `page/hide/${id}/`,
                method: HTTP_METHODS.PATCH,
                body: {
                    hide: isHide,
                },
            }),
        }),
        hideAccount: builder.mutation({
            query: ({ id, isHide }) => ({
                url: `account/hide/${id}/`,
                method: HTTP_METHODS.PATCH,
                body: {
                    hide: isHide,
                },
            }),
        }),
        hideCollection: builder.mutation({
            query: ({ id, isHide }) => ({
                url: `collection/hide/${id}/`,
                method: HTTP_METHODS.PATCH,
                body: {
                    hide: isHide,
                },
            }),
        }),
        hidePack: builder.mutation({
            query: ({ id, isHide }) => ({
                url: `pack/hide/${id}/`,
                method: HTTP_METHODS.PATCH,
                body: {
                    hide: isHide,
                },
            }),
        }),
        hideToken: builder.mutation({
            query: ({ id, isHide }) => ({
                url: `token/hide/${id}/`,
                method: HTTP_METHODS.PATCH,
                body: {
                    hide: isHide,
                },
            }),
        }),
    }),
});

export const {
    useGetPagesQuery,
    useGetPageByUrlQuery,

    useGetAccountsQuery,
    useGetAccountQuery,

    useGetCollectionsQuery,
    useGetCollectionQuery,

    useGetPacksQuery,
    useGetPackQuery,

    useGetTokensQuery,
    useGetTokenQuery,

    useGetCurrencyTokensQuery,
    useGetBlockchainsQuery,

    useGetFilteredCollectionQuery,
    useGetFilteredPacksQuery,
    useGetFilteredTokensQuery,

    useCreatePageMutation,
    useCreateAccountMutation,
    useCreateCollectionMutation,
    useCreatePackMutation,

    useUpdatePageMutation,
    useUpdateAccountMutation,
    useUpdateCollectionMutation,
    useUpdatePackMutation,
    useUpdateTokenMutation,

    useHidePageMutation,
    useHideAccountMutation,
    useHideCollectionMutation,
    useHidePackMutation,
    useHideTokenMutation,
} = dataApi;
