import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_UGC_API_URL } from '../../const/http/API_URLS';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';

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

        // POST
        postCollectionToWhitelist: builder.mutation({
            query: ({ id, data }) => ({
                url: `users/${id}`,
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),
    }),
});

export const { useGetCollectionWhiteListQuery, usePostCollectionToWhitelistMutation } = ugcApi;
