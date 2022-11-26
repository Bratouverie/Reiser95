import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { setAccounts } from '../../redux/slices/accounts';
import { setBlockchains } from '../../redux/slices/blockchains';
import { setCollections } from '../../redux/slices/collections';
import { setPages } from '../../redux/slices/pages';
import { setTokens } from '../../redux/slices/tokens';
import CenteredContainer from '../../common/CenteredContainer';
import Loader from '../../common/Loader';
import { NotificationContext } from '../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';

const InitialRequests = {
    PAGES: 'pages',
    ACCOUNTS: 'accounts',
    BLOCKCHAIN: 'blockchain',
    TOKEN: 'token',
    COLLECTION: 'collection',
    PACKS: 'packs',
};

const InitialDataContainer = ({ children }) => {
    const dispatch = useDispatch();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

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

        if (stateGetPages.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: stateGetPages.error.message,
            });
        }
    }, [stateGetPages]);

    useEffect(() => {
        if (stateGetAccounts && stateGetAccounts.result) {
            dispatch(setAccounts(stateGetAccounts.result.data));
        }

        if (stateGetAccounts.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: stateGetAccounts.error.message,
            });
        }
    }, [stateGetAccounts]);

    useEffect(() => {
        if (stateGetBlockchains && stateGetBlockchains.result) {
            dispatch(setBlockchains(stateGetBlockchains.result.data));
        }

        if (stateGetBlockchains.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: stateGetBlockchains.error.message,
            });
        }
    }, [stateGetBlockchains]);

    useEffect(() => {
        if (stateGetTokens && stateGetTokens.result) {
            dispatch(setTokens(stateGetTokens.result.data));
        }

        if (stateGetTokens.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: stateGetTokens.error.message,
            });
        }
    }, [stateGetTokens]);

    useEffect(() => {
        if (stateGetCollections && stateGetCollections.result) {
            dispatch(setCollections(stateGetCollections.result.data));
        }

        if (stateGetCollections.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: stateGetCollections.error.message,
            });
        }
    }, [stateGetCollections]);

    useEffect(() => {
        if (stateGetPacks && stateGetPacks.result) {
            dispatch(setCollections(stateGetPacks.result.data));
        }

        if (stateGetPacks.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: stateGetPacks.error.message,
            });
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

export default React.memo(InitialDataContainer);
