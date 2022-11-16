import {data} from '../api';

// Создать страницу
export const createPage = (formData, token) => {
    return data.post("page/", formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

// Получить все страницы
export const getPages = () => {
    const res = data.get("page/");

    return res;
}

// Удалить страницу(на беке она скрытая, но мы считаем ее удаленной)
export const hidePage = (id, token) => {
    const res = data.patch(`page/hide/${id}/`, {
        hide: true
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res;
}

// Получить данные одной страницы
export const getPage = (url) => {
    const res = data.get(`page/${url}/`);

    return res;
}