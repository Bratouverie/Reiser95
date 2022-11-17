import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { setAccounts } from '../../redux/slices/accounts';
import { setBlockchains } from '../../redux/slices/blockchains';
import { setPages } from '../../redux/slices/pages';
import { setTokens } from '../../redux/slices/tokens';

const InitialDataWrapper = () => {
    const dispatch = useDispatch();

    const { state: stateGetPages, request: getPages } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        url: 'page/',
    });

    const { state: stateGetAccounts, request: getAccounts } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        url: 'account/',
    });

    const { state: stateGetBlockchains, request: getBlockchains } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        url: 'blockchain/',
    });

    const { state: stateGetTokens, request: getToken } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        url: 'token/',
    });

    useEffect(() => {
        if (stateGetPages && stateGetPages.result) {
            dispatch(setPages(stateGetPages.result.data));
        }
    }, [stateGetPages]);

    useEffect(() => {
        if (stateGetAccounts && stateGetAccounts.result) {
            dispatch(setAccounts(stateGetAccounts.result.data));
        }
    }, [stateGetAccounts]);

    useEffect(() => {
        if (stateGetBlockchains && stateGetBlockchains.result) {
            dispatch(setBlockchains(stateGetBlockchains.result.data));
        }
    }, [stateGetBlockchains]);

    useEffect(() => {
        if (stateGetTokens && stateGetTokens.result) {
            dispatch(setTokens(stateGetTokens.result.data));
        }
    }, [stateGetTokens]);

    useEffect(() => {
        getPages({});
        getBlockchains({});
        getAccounts({});
        getToken({});
    }, []);

    return null;
};

export default React.memo(InitialDataWrapper);
