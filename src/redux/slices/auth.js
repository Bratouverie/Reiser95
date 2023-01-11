import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_AUTH_API_URL } from '../../const/http/API_URLS';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import { authApi } from '../api/authService';

const initialState = {
    isAuth: false,
    loadAuth: true,
    walletAddress: '',
    balance: 0,
    accessToken: window.sessionStorage.getItem('access_token') || '',
    refreshToken: window.sessionStorage.getItem('refresh_token') || '',
    // Profile data
    id: '',
    username: '',
    image: '',
    created: '',
};

export const refreshTokenRequest = createAsyncThunk('refreshToken', async (_, { getState }) => {
    const { auth } = getState();

    if (!auth.refreshToken) {
        return;
    }

    const response = await axios.request({
        url: `${BASE_AUTH_API_URL}refresh`,
        method: HTTP_METHODS.POST,
        headers: {
            Authorization: `Bearer ${auth.refreshToken}`,
        },
    });

    if (response && response.data) {
        return response.data;
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setLoadAuth: (state, action) => {
            state.loadAuth = action.payload;
        },
        initWalletAddress: (state, action) => {
            state.walletAddress = action.payload;
        },
        initBalance: (state, action) => {
            state.balance = action.payload;
        },
        initAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        initRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        initId: (state, action) => {
            state.id = action.payload;
        },
        initUsername: (state, action) => {
            state.username = action.payload;
        },
        initImage: (state, action) => {
            state.image = action.payload;
        },
        refreshToken: (state, action) => {
            console.log('refresh token');
        },
        initCreated: (state, action) => {
            // Приводим дату в нормальный вид сразу, пример: 09.10.2022
            const date = new Date(action.payload);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const res =
                (day > 9 ? day : '0' + day) +
                '.' +
                (month > 9 ? month : '0' + month) +
                '.' +
                date.getFullYear();

            state.created = res;
        },
    },
    extraReducers: builder => {
        builder.addCase(refreshTokenRequest.fulfilled, (state, action) => {
            if (action.payload && action.payload.access_token && action.payload.refresh_token) {
                window.sessionStorage.setItem('access_token', action.payload.access_token);
                window.sessionStorage.setItem('refresh_token', action.payload.refresh_token);

                state.refreshToken = action.payload.refresh_token;
                state.accessToken = action.payload.access_token;
            }
        });
        builder.addMatcher(authApi.endpoints.getProfile.matchFulfilled, (state, action) => {
            console.log({
                state,
                action,
            });
        });
    },
});

export const {
    setIsAuth,
    setLoadAuth,
    initWalletAddress,
    initBalance,
    initAccessToken,
    initRefreshToken,
    initId,
    initUsername,
    initImage,
    initCreated,
    refreshToken,
} = authSlice.actions;

export default authSlice.reducer;
