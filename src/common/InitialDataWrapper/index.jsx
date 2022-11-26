import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { setAccounts } from '../../redux/slices/accounts';
import { setBlockchains } from '../../redux/slices/blockchains';
import { setCollections } from '../../redux/slices/collections';
import { setPages } from '../../redux/slices/pages';
import { setTokens } from '../../redux/slices/tokens';
import CenteredContainer from '../CenteredContainer';
import Loader from '../Loader';

const InitialRequests = {
    PAGES: 'pages',
    ACCOUNTS: 'accounts',
    BLOCKCHAIN: 'blockchain',
    TOKEN: 'token',
    COLLECTION: 'collection',
    PACKS: 'packs',
};

const InitialDataWrapper = ({ children }) => {
    const dispatch = useDispatch();

    const [loadingRequests, setSetLoadingRequests] = useState([]);

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

    const { state: stateGetCollections, request: getCollections } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        url: 'collection/',
    });

    const { state: stateGetPacks, request: getPacks } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        url: 'pack/',
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
        if (stateGetCollections && stateGetCollections.result) {
            dispatch(setCollections(stateGetCollections.result.data));
        }
    }, [stateGetCollections]);

    useEffect(() => {
        if (stateGetPacks && stateGetPacks.result) {
            dispatch(setCollections(stateGetPacks.result.data));
        }
    }, [stateGetPacks]);

    useEffect(() => {
        getPages({
            beforeRequestFoo: setSetLoadingRequests(p => [...p, InitialRequests.PAGES]),
            callback: setSetLoadingRequests(p => p.filter(r => r !== InitialRequests.PAGES)),
        });
        getBlockchains({
            beforeRequestFoo: setSetLoadingRequests(p => [...p, InitialRequests.BLOCKCHAIN]),
            callback: setSetLoadingRequests(p => p.filter(r => r !== InitialRequests.BLOCKCHAIN)),
        });
        getAccounts({
            beforeRequestFoo: setSetLoadingRequests(p => [...p, InitialRequests.ACCOUNTS]),
            callback: setSetLoadingRequests(p => p.filter(r => r !== InitialRequests.ACCOUNTS)),
        });
        getToken({
            beforeRequestFoo: setSetLoadingRequests(p => [...p, InitialRequests.TOKEN]),
            callback: setSetLoadingRequests(p => p.filter(r => r !== InitialRequests.TOKEN)),
        });
        getCollections({
            beforeRequestFoo: setSetLoadingRequests(p => [...p, InitialRequests.COLLECTION]),
            callback: setSetLoadingRequests(p => p.filter(r => r !== InitialRequests.COLLECTION)),
        });
        getPacks({
            beforeRequestFoo: setSetLoadingRequests(p => [...p, InitialRequests.PACKS]),
            callback: setSetLoadingRequests(p => p.filter(r => r !== InitialRequests.PACKS)),
        });
    }, []);

    if (loadingRequests.lenght) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    }

    return children;
};

export default React.memo(InitialDataWrapper);
