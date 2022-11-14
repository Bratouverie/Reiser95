import { ethers } from "ethers";

import { auth } from "../api";
import {getProfile} from './user';

import {setIsAuth, setLoadAuth, initWalletAddress, initBalance, initAccessToken,
    initRefreshToken, initId, initUsername, initImage, initCreated} from '../redux/slices/auth';

// Авторизация(нажатие на кнопку connect wallet)
export const connectWallet = async (dispatch) => {
    dispatch(setLoadAuth(true));
    try {
        const signer = await getSigner();
        const address = await signer.getAddress();
        const balance = await signer.getBalance();
        const nonce = await getNonce(address);
        const signature = await signer.signMessage(
            `I am signing my one-time nonce:${nonce}`
        );
        const tokens = await getTokens(address, signature);
        const profile = await getProfileData(tokens["access_token"]);
        const {public_address, id, username, image_url, created} = profile.data;

        window.sessionStorage.setItem("access_token", tokens["access_token"]);
        window.sessionStorage.setItem("refresh_token", tokens["refresh_token"]);

        dispatch(setIsAuth(true));
        dispatch(initBalance(getNormalBalance(balance)));
        dispatch(initAccessToken(tokens["access_token"]));
        dispatch(initRefreshToken(tokens["refresh_token"]));
        dispatch(initWalletAddress(public_address));
        dispatch(initId(id));
        dispatch(initUsername(username));
        dispatch(initImage(image_url));
        dispatch(initCreated(created));
        dispatch(setLoadAuth(false));
    } catch (error) {
        console.log(error);
    }
};

// Получить signer
export const getSigner = async () => {
    let provider;

    if(window.ethereum){
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    else{
        window.location.href = 'https://metamask.app.link/dapp/resez.site';
    }

    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    return signer;
}

// Проверка авторизации время от времени, после истекания срока токенов - авторизуемся заново, незаметно для пользователя
export const checkAuth = async (dispatch) => {
    dispatch(setLoadAuth(true));
    const accessToken = window.sessionStorage.getItem("access_token");
    const refreshToken = window.sessionStorage.getItem("refresh_token");

    if(accessToken && refreshToken){
        const profile = await getProfileData(accessToken);

        if(profile.data){
            const {public_address, id, username, image_url, created} = profile.data;

            dispatch(setIsAuth(true));
            dispatch(initAccessToken(accessToken));
            dispatch(initRefreshToken(refreshToken));
            dispatch(initWalletAddress(public_address));
            dispatch(initId(id));
            dispatch(initUsername(username));
            dispatch(initImage(image_url));
            dispatch(initCreated(created));
            const signer = await getSigner();
            const balance = await getBalance(signer);
            dispatch(initBalance(getNormalBalance(balance)));
            dispatch(setLoadAuth(false));
        }
        else{
            const newTokens = await auth.post("refresh", {}, {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            });

            window.sessionStorage.setItem("access_token", newTokens.data["access_token"]);
            window.sessionStorage.setItem("refresh_token", newTokens.data["refresh_token"]);
            checkAuth(dispatch);
        }
    }
    else{
        dispatch(setLoadAuth(false));
        clearData(dispatch);
    }
}

// Получаем данные профиля
export const getProfileData = async(token) => {
    try {
        const profile = await getProfile(token);
    
        return profile;
    } catch (error) {
        return error;
    }
}

// Получаем баланс
export const getBalance = async (signer) => {
    const balance = await signer.getBalance();

    return balance;
}

// Получаем нормальный баланс(в eth)
export const getNormalBalance = (balance) => {
    return parseFloat(ethers.utils.formatEther(balance));
}

// Получаем nonce
export const getNonce = async (walletAddress) => {
    const nonce = await auth.get(`web3/nonce?public_address=${walletAddress}`);

    return nonce.data.nonce;
};

// Получаем refresh и access токены
export const getTokens = async (walletAddress, signature) => {
    const tokens = await auth.post("web3/login", {
        public_address: walletAddress,
        signature: signature,
    });

    return tokens.data;
};

// Выход с аккаунта
export const logout = async (token, dispatch) => {
    const result = await auth.post("logout", {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    clearData(dispatch);

    return result;
}

// Получить короткий адрес кошелька - xxxx...xxxx
export const getShortAddress = (address) => {
    return address.substr(0, 4) + "..." + address.substr(-4);
}

// Очистить данные в redux и localstorage после выхода из аккаунта
export const clearData = (dispatch) => {
    dispatch(setIsAuth(false));

    window.sessionStorage.removeItem("access_token");
    window.sessionStorage.removeItem("refresh_token");

    dispatch(initAccessToken(""));
    dispatch(initRefreshToken(""));
    dispatch(initWalletAddress(""));
    dispatch(initId(""));
    dispatch(initUsername(""));
    dispatch(initImage(""));
    dispatch(initBalance(0));
}