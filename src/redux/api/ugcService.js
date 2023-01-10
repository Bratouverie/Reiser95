import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_UGC_API_URL } from '../../const/http/API_URLS';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import { generateQuery } from '../../utils/http/generateQuery';

export const ugcApi = createApi({
    reducerPath: 'ugcApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_UGC_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const {
                auth: { accessToken },
            } = getState();

            headers.set('Authorization', `Bearer ${accessToken}`);

            return headers;
        },
    }),
    endpoints: (builder) => ({
        // GET
        getCollectionWhiteList: builder.query({
            query: ({ id }) => ({
                url: `users/${id}`,
            }),
        }),
        getWhiteListFiltered: builder.query({
            query: ({ page, pageSize, sort, collectionId, status }) => {
                const queryObj = {
                    page,
                    size: pageSize,
                };

                if (sort) {
                    queryObj.sort = sort;
                }

                if (status) {
                    queryObj.status = status;
                }

                if (collectionId) {
                    queryObj.collection_id = collectionId;
                }
                console.log({ queryObj });
                return {
                    url: `/filter/${generateQuery(queryObj)}`,
                };
            },
        }),

        // POST
        postCollectionToWhitelist: builder.mutation({
            query: ({ id, data }) => ({
                url: `users/${id}`,
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),

        // PATCH
        patchCollectionToWhitelist: builder.mutation({
            query: ({ id, data }) => ({
                url: `users/edit/${id}`,
                method: HTTP_METHODS.PATCH,
                body: data,
            }),
        }),
        patchApplication: builder.mutation({
            query: ({ id, data }) => ({
                url: `${id}`,
                method: HTTP_METHODS.PATCH,
                body: data,
            }),
        }),

        // HIDE
        hideWhiteListRequest: builder.mutation({
            query: ({ id }) => ({
                url: `users/hide/${id}`,
                method: HTTP_METHODS.PUT,
            }),
        }),
    }),
});

export const {
    useGetCollectionWhiteListQuery,
    useGetWhiteListFilteredQuery,
    usePostCollectionToWhitelistMutation,
    usePatchCollectionToWhitelistMutation,
    usePatchApplicationMutation,
    useHideWhiteListRequestMutation,
} = ugcApi;
