import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CenteredContainer from '../../common/CenteredContainer';
import Loader from '../../common/Loader';
import { DIALOG_TYPES } from '../../components/WlModals/const';
import WLCreationDialog from '../../components/WlModals/WLCreationDialog';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { NotificationContext } from '../../context/NotificationContext';

import { useGetCollectionQuery, useGetFilteredTokensQuery } from '../../redux/api/dataService';
import {
    useGetCollectionWhiteListQuery,
    usePostCollectionToWhitelistMutation,
} from '../../redux/api/ugcService';
import { onClose, onOpen } from '../../redux/dialogs/aplyToWhitelistDialog';
import { normilizeError } from '../../utils/http/normilizeError';
import { roundInt } from '../../utils/roundInt';
import TokenItem from './TokenItem';

import './index.css';
import { pagesSelectors } from '../../redux/slices/pages';

// collection type example
// {
//     "id": "0bb70e6c-4d51-4904-8d7b-209d0cb31055",
//     "payment_tokens": [
//         {
//             "id": "f56d23c1-5e64-4bf6-9a24-43bbf4c2b6ea",
//             "name": "ETH1",
//             "smart_contract_address": "1111111111111111111",
//             "blockchain": "11643bd9-183e-48bc-bad8-07e54c810bc1"
//         }
//     ],
//     "blockchain": {
//         "id": "11643bd9-183e-48bc-bad8-07e54c810bc1",
//         "name": "Ethereum"
//     },
//     "hide": false,
//     "created_at": "2022-12-08T12:53:31.620443Z",
//     "link_opensea": "qwewqe",
//     "link_discord": "ewqe",
//     "link_instagram": "ewqe",
//     "link_medium": null,
//     "link_twitter": "ewq",
//     "type": "standard",
//     "logo": "https://gateway.storjshare.io/demo-bucket/003_TuePBWn.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221208%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221208T131339Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=47d33eab051c60993a20cea95311f9a0a0471cfde015b895bd6854206152fce1",
//     "featured": "https://gateway.storjshare.io/demo-bucket/003_rEL1sQK.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221208%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221208T131339Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ebe20a31f5c348daa2d2c987c4b1f2e94c8813dccc7771ae5c86bec0222d0b76",
//     "banner": "https://gateway.storjshare.io/demo-bucket/003_rFjCcE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221208%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221208T131339Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c14871c264d596f11c4dcedba8051738919745bcef3c59cf1fd043ca5088eeb1",
//     "name": "Burger",
//     "url": "Burger",
//     "url_opensea": "Burger",
//     "category_opensea": "Art",
//     "percentage_fee": "5.00000000",
//     "display_theme": "padded",
//     "description": "Burger",
//     "upload_blockchain": false,
//     "smart_contract_address": "0x65Ed0458D0967ddAfCA7585aF492c4ae7c485953",
//     "items_count": 0,
//     "owners_count": 0,
//     "floor_price_count": "0.00000000",
//     "volume_troded_count": "0.00000000",
//     "profit": "0.00000000",
//     "creator_profit": "0.00000000",
//     "creator_fee": "0.00000000",
//     "page": "0d4cdbd0-82a0-4ee8-861d-1441c73ed360",
//     "account": "7f640500-3a4d-4105-9d10-3dc9936ad0b4"
// }

const DIALOG_TYPES_ARR = Object.values(DIALOG_TYPES);

const Collection = () => {
    const { id } = useParams();

    const authInfo = useSelector((state) => state.auth);
    const createWLDialog = useSelector((state) => state.aplyToWhitelistDialog);
    const pages = useSelector(pagesSelectors.selectAll);

    console.log({ pages });

    const dispatch = useDispatch();

    const { data: collection, error: getCollectionError, isLoading } = useGetCollectionQuery(
        {
            id,
        },
        {
            skip: !id,
        },
    );

    const {
        data: whiteListApplicationData,
        isLoading: isWhitelistApplicationLoading,
        isSuccess: isWhitelistApplicationSuccess,
    } = useGetCollectionWhiteListQuery({ id }, { skip: !id });

    const [
        postWhiteList,
        { isSuccess: isWhitelistSuccessfullyPosted, error: postWhitelistError },
    ] = usePostCollectionToWhitelistMutation();

    const {
        data: collectionTokens,
        error: getTokensError,
        isLoading: isTokensLoading,
    } = useGetFilteredTokensQuery(
        {
            page: 1,
            pageSize: 1000,
            collectionId: collection ? collection.id : '',
        },
        {
            skip: !collection || !collection.id,
        },
    );

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const [whiteListApplication, setWhiteListApplication] = useState(null);

    const collectionPage = useMemo(() => {
        if (collection && collection.page && pages && pages.length > 0) {
            return pages.find((p) => p.id === collection.page) || null;
        }
        return null;
    }, [pages, collection]);

    const onGetToWhitelistHandler = useCallback(() => {
        if (!authInfo.isAuth) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'Authorize through your wallet to get items to whitelist',
            });

            return;
        }

        dispatch(onOpen(id));
    }, [authInfo.isAuth, id]);

    const closeCreationDialogHandler = useCallback(() => {
        dispatch(onClose());
    }, []);

    const actionBtn = useMemo(() => {
        if (!whiteListApplication) {
            return (
                <button
                    className="button collection__get--whitelist default__hover"
                    onClick={onGetToWhitelistHandler}
                >
                    <img
                        src="/assets/img/star.svg"
                        alt="star"
                        className="collection__button--icon"
                    />
                    Get on WhiteList
                </button>
            );
        }
    }, [whiteListApplication]);

    useEffect(() => {
        if (getCollectionError) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(getCollectionError),
            });
        }
    }, [getCollectionError]);

    useEffect(() => {
        if (getTokensError) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(getTokensError),
            });
        }
    }, [getTokensError]);

    useEffect(() => {
        if (isWhitelistApplicationSuccess && whiteListApplicationData) {
            setWhiteListApplication(whiteListApplicationData);
        }
    }, [whiteListApplicationData, isWhitelistApplicationSuccess]);

    if (!collection || !collectionTokens || isWhitelistApplicationLoading || isTokensLoading) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    }

    return (
        <>
            <div
                className="collection__header"
                style={{
                    backgroundImage: `url('${collection.banner}')`,
                    backgroundSize: 'cover',
                    objectFit: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container collection__container posr">
                    <div className="collection__avatar--inner">
                        <img src={collection.logo} alt="avatar" className="collection__avatar" />
                    </div>
                </div>
            </div>

            <div className="collection">
                <div className="container">
                    <div className="collection__inner">
                        <div className="collection__link--inner">
                            <h2 className="title collection__title">{collection.name}</h2>

                            <div className="collections__links--wrap">
                                <a
                                    href={collection.link_discord || ''}
                                    className="collection__discord--link default__hover"
                                >
                                    <img
                                        src="/assets/img/discord.svg"
                                        alt="discord"
                                        className="collection__discord--icon"
                                    />
                                    Discord support
                                </a>

                                <div className="collection__social--inner">
                                    <a
                                        href={collection.link_twitter || ''}
                                        className="collection__social--link default__hover"
                                    >
                                        <img
                                            src="/assets/img/twitter.svg"
                                            alt="twitter"
                                            className="collection__social--icon"
                                        />
                                    </a>

                                    <a
                                        href={collection.link_opensea || ''}
                                        className="collection__social--link default__hover"
                                    >
                                        <img
                                            src="/assets/img/opensea.svg"
                                            alt="opensea"
                                            className="collection__social--icon"
                                        />
                                    </a>

                                    <a
                                        href={collection.link_instagram || ''}
                                        className="collection__social--link default__hover"
                                    >
                                        <img
                                            src="/assets/img/insta.svg"
                                            alt="instagram"
                                            className="collection__social--icon"
                                        />
                                    </a>

                                    <a
                                        href={collection.link_medium || ''}
                                        className="collection__social--link default__hover"
                                    >
                                        <img
                                            src="/assets/img/dots.svg"
                                            alt="more"
                                            className="collection__social--icon"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="collection__social--mobile">
                            <a
                                href={collection.link_instagram || ''}
                                className="collection__social--link--mobile"
                            >
                                <img
                                    src="/assets/img/insta.svg"
                                    alt="instagram"
                                    className="collection__social--img"
                                />
                            </a>

                            <a
                                href={collection.link_opensea || ''}
                                className="collection__social--link--mobile"
                            >
                                <img
                                    src="/assets/img/opensea.svg"
                                    alt="opensea"
                                    className="collection__social--img"
                                />
                            </a>

                            <a
                                href={collection.link_discord || ''}
                                className="collection__social--link--mobile"
                            >
                                <img
                                    src="/assets/img/discord-white.svg"
                                    alt="discord"
                                    className="collection__social--img"
                                />
                            </a>

                            <a
                                href={collection.link_twitter || ''}
                                className="collection__social--link--mobile line"
                            >
                                <img
                                    src="/assets/img/twitter.svg"
                                    alt="twitter"
                                    className="collection__social--img"
                                />
                            </a>
                        </div>

                        <div className="collection__data">
                            <div className="collection__data--item">
                                <h3 className="collection__data--title">
                                    {collection.items_count}
                                </h3>

                                <p className="collection__data--text">items</p>
                            </div>

                            <div className="collection__data--item">
                                <h3 className="collection__data--title">
                                    {collection.owners_count}
                                </h3>

                                <p className="collection__data--text">owners</p>
                            </div>

                            <div className="collection__data--item">
                                <h3 className="collection__data--title">
                                    <img
                                        src="/assets/img/eth.svg"
                                        alt="eth"
                                        className="collection__data--eth"
                                    />
                                    {roundInt({ num: Number(collection.floor_price_count) })}
                                </h3>

                                <p className="collection__data--text">floor price</p>
                            </div>

                            <div className="collection__data--item">
                                <h3 className="collection__data--title">
                                    <img
                                        src="/assets/img/eth.svg"
                                        alt="eth"
                                        className="collection__data--eth"
                                    />
                                    {roundInt({ num: Number(collection.volume_troded_count) })}
                                </h3>

                                <p className="collection__data--text">volume traded</p>
                            </div>
                        </div>

                        <div className="collection__desc--inner">
                            <p className="collection__desc">{collection.description}</p>

                            {actionBtn}
                        </div>
                    </div>
                </div>
            </div>

            <div className="collection__items">
                <div className="container">
                    <div className="collection__items--inner">
                        <p className="collection__items--value">
                            {collectionTokens.results ? collectionTokens.results.length : 0} items
                        </p>

                        <div className="collection__items--content">
                            {!collectionTokens.results || !collectionTokens.results.length ? (
                                <div className="collection__items--none">No items to display</div>
                            ) : (
                                <>
                                    {collectionTokens.results.map((t) => (
                                        <TokenItem key={t.id} token={t} />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {collectionPage && (
                <WLCreationDialog
                    open={createWLDialog.isOpen}
                    dialogType={
                        DIALOG_TYPES_ARR.includes(collectionPage.application_form)
                            ? collectionPage.application_form
                            : DIALOG_TYPES.PERSONS
                    }
                    onClose={closeCreationDialogHandler}
                    onCreate={() => console.log('create')}
                />
            )}
        </>
    );
};

export default Collection;
