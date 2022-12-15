import axios from 'axios';
import { useSelector } from 'react-redux';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';

export const sendRequest = async ({
    url,
    method = HTTP_METHODS.GET,
    data,
    query,
    body,
    headers = {},
}) => {
    const q =
        query && Object.values(query).length ? `?${new URLSearchParams(query).toString()}` : '';
    const b = body || data || undefined;

    const h = {
        'Content-Type': 'application/json',
        ...headers,
    };

    try {
        const response = await axios.request({
            method,
            url: `${url}${q}`,
            headers: h,
            data: b,
        });

        return {
            data: response.data,
            headers: response.headers,
        };
    } catch (err) {
        console.log({ err });
        const { response } = err;

        if (!response) {
            throw err;
        }

        const { data } = response;

        const errorKeys = Object.keys(data);

        let error = `${data}`;

        if (typeof data === 'object') {
            error = `${errorKeys.map(k => `${k} - ${data[k]}`).join(', ')}`;
        }

        throw error;
    }
};
