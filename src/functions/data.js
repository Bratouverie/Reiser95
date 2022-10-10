import {data} from '../api';

export const createPage = (formData, token) => {
    return data.post("page/", formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getPages = (token) => {
    const res = data.get("page/", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res;
}