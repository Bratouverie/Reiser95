import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_AUTH_API_URL } from '../../const/http/API_URLS';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_AUTH_API_URL,
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
        getProfile: builder.query({
            query: () => ({
                url: 'profile/my',
            }),
            transformResponse: response => {
                console.log({ response });
            },
        }),
    }),
});

export const { usePostRefreshTokensQuery, useGetProfileQuery } = authApi;
