import axios from 'axios';

export const auth = axios.create({
    baseURL: 'https://checkbrandcom.site/auth_service/auth/api/v1/'
});

export const user = axios.create({
    baseURL: 'https://checkbrandcom.site/auth_service/user/api/v1/'
});

export const data = axios.create({
    baseURL: 'https://checkbrandcom.site/admin_service/api/v1/'
});