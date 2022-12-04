import { useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { HTTP_METHODS } from '../const/http/HTTP_METHODS';
import { BASE_API_URL } from '../const/http/API_URLS';

export const REQUEST_TYPE = {
    AUTH: 'auth',
    USER: 'user',
    DATA: 'data',
};

const DEFAULT_STATE = {
    isProcessing: false,
    result: {},
    error: null,
};

const sendRequest = async (axiosInstance, url, method, data, query, body, headers = {}) => {
    const q =
        query && Object.values(query).length ? `?${new URLSearchParams(query).toString()}` : '';
    const b = body || data || undefined;

    const h = {
        'Content-Type': 'application/json',
        ...headers,
    };

    try {
        const response = await axiosInstance.request({
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
        const { response } = err;

        if (!response) {
            throw err;
        }

        const {
            data: { detail },
        } = response;

        throw detail;
    }
};

export const useRequest = ({
    requestType = REQUEST_TYPE.DATA,
    url,
    method = HTTP_METHODS.GET,
    isAuth = false,
}) => {
    const authInfo = useSelector(state => state.auth);

    const [state, setState] = useState(DEFAULT_STATE);

    const auth = axios.create({
        baseURL: 'https://checkbrandcom.site/auth_service/auth/api/v1/',
        headers: {
            Authorization: `Bearer ${authInfo.accessToken}`,
        },
    });

    const user = axios.create({
        baseURL: 'https://checkbrandcom.site/auth_service/user/api/v1/',
        headers: {
            Authorization: `Bearer ${authInfo.accessToken}`,
        },
    });

    const data = axios.create({
        baseURL: BASE_API_URL,
    });

    const axiosInstancesMap = new Map([
        [REQUEST_TYPE.AUTH, auth],
        [REQUEST_TYPE.DATA, data],
        [REQUEST_TYPE.USER, user],
    ]);

    const request = useCallback(
        async ({ data, query, body, headers, beforeRequestFoo, callback }) => {
            if (beforeRequestFoo) {
                beforeRequestFoo();
            }

            setState(p => ({
                ...p,
                isProcessing: true,
            }));

            const axiosInstance = axiosInstancesMap.get(requestType);

            let reqHeaders = headers;

            if (isAuth) {
                reqHeaders = {
                    ...reqHeaders,
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MDE0MDIwMCwianRpIjoiOWRhMzIyNzUtMTQzOC00ODc3LTg5ZjQtZjc3ZWVlMjE4MTM3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjB4NDViY2Q5YTljNGM4ZWJkMmQ4YzdkOWRiYTgxMDdhNmRkNDc3NjhmYSIsIm5iZiI6MTY3MDE0MDIwMCwiZXhwIjoxNjcwMTQzODAwfQ.74DvSgGC2SlZvVOc2JFqo3iXnlilWw3534qJVg0qQb8',
                };
            }

            try {
                const result = await sendRequest(
                    axiosInstance,
                    url,
                    method,
                    data,
                    query,
                    body,
                    reqHeaders,
                );

                setState({
                    isProcessing: false,
                    result,
                });

                if (callback) {
                    callback();
                }

                return result;
            } catch (err) {
                setState(p => ({
                    ...p,
                    isProcessing: false,
                    error: err,
                }));

                return null;
            }
        },
        [requestType, url, method, isAuth, authInfo.accessToken],
    );

    const onClearState = useCallback(() => {
        setState(DEFAULT_STATE);
    }, []);

    return {
        state,
        request,
        onClearState,
    };
};
