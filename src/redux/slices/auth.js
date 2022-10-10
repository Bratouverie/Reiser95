import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    walletAddress: "",
    balance: 0,
    accessToken: "",
    refreshToken: "",
    // Profile data
    id: "",
    username: "",
    image: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
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
        }
    }
});

export const {setIsAuth, initWalletAddress, initBalance, initAccessToken,
    initRefreshToken, initId, initUsername, initImage} = authSlice.actions;

export default authSlice.reducer;