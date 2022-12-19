import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_AUTH_API_URL } from '../../const/http/API_URLS';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_AUTH_API_URL,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const {
                auth: { accessToken, refreshToken },
            } = getState();

            if (endpoint !== 'refreshToken' && accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }

            if (endpoint === 'refreshToken' && refreshToken) {
                headers.set('Authorization', `Bearer ${refreshToken}`);
            }

            return headers;
        },
    }),
    endpoints: builder => ({
        getProfile: builder.query({
            query: () => ({
                url: 'profile/my',
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: 'refresh',
                method: HTTP_METHODS.POST,
            }),
        }),
    }),
});

export const { usePostRefreshTokensQuery, useGetProfileQuery } = authApi;
