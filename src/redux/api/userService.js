import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_USER_API_URL } from '../../const/http/API_URLS';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_USER_API_URL,
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
        getSuperAdmins: builder.query({
            query: () => ({
                url: '/users_by_role/super_admin',
            }),
        }),
        getAdmins: builder.query({
            query: () => ({
                url: '/users_by_role/admin',
            }),
        }),
        getModerators: builder.query({
            query: () => ({
                url: '/users_by_role/moderator',
            }),
        }),
    }),
});

export const { useGetSuperAdminsQuery, useGetAdminsQuery, useGetModeratorsQuery } = userApi;
