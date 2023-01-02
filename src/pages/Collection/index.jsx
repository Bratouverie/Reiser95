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

import { CustomSelect } from '../../common/CustomSelect';
import FilterItem from '../../components/FilterItem';
import set from 'date-fns/esm/set/index';

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

const filterData = [
    {
        text: 'Booked',
    },
    {
        text: 'Minted',
    },
];

const filterData2 = [
    {
        text: 'Male 1',
    },
    {
        text: 'Male 2',
    },
    {
        text: 'Male 3',
    },
];

const Collection = () => {
    const { id } = useParams();
    const [fullDesc, setFullDesc] = React.useState(false);
    const [filter, setFilter] = React.useState('price');
    const [filterActive, setFilterActive] = React.useState(false);
    const [sortActive, setSortActive] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [social, setSocial] = React.useState(false);

    const changeSearch = (e) => {
        setSearch(e.target.value);
    };

    const emptySearch = () => {
        setSearch('');
    };

    const filterChenge = (value) => {
        setFilter(value);
    };

    const authInfo = useSelector((state) => state.auth);
    const createWLDialog = useSelector((state) => state.aplyToWhitelistDialog);

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
            ></div>

            <div className="collection">
                <div className="collection__social--mobile">
                    <a href="#" className="collection__social--share">
                        <img src="/assets/img/share.svg" alt="share" />
                    </a>

                    <div className="collection__dots--inner">
                        <img
                            src="/assets/img/dots.svg"
                            alt="dots"
                            className="collection__social--dots"
                            onClick={() => setSocial((prev) => !prev)}
                        />

                        {social && (
                            <div className="collection__dots--social">
                                <p className="collection__dots--title">Links</p>

                                <a href="#" className="collection__dots--link">
                                    <img
                                        src="/assets/img/insta.svg"
                                        alt="insta"
                                        className="collection__dots--link--icon"
                                    />
                                    Instagram
                                </a>

                                <a href="#" className="collection__dots--link">
                                    <img
                                        src="/assets/img/opensea.svg"
                                        alt="opensea"
                                        className="collection__dots--link--icon"
                                    />
                                    OpenSea
                                </a>

                                <a href="#" className="collection__dots--link">
                                    <img
                                        src="/assets/img/discord.svg"
                                        alt="Discord"
                                        className="collection__dots--link--icon"
                                    />
                                    Discord
                                </a>

                                <a href="#" className="collection__dots--link">
                                    <img
                                        src="/assets/img/twitter.svg"
                                        alt="Twitter"
                                        className="collection__dots--link--icon"
                                    />
                                    Twitter
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="container">
                    <div className="collection__inner">
                        <div className="collection__chain">
                            <img
                                src="/assets/img/eth-black.svg"
                                alt="icon"
                                className="collection__chain--icon"
                            />
                        </div>

                        <div className="collection__avatar--inner">
                            <img
                                src={collection.logo}
                                alt="avatar"
                                className="collection__avatar"
                            />
                        </div>

                        <div className="collection__link--inner">
                            <h2 className="title collection__title">{collection.name}</h2>

                            <div className="collection__social--inner">
                                <a
                                    href={collection.link_twitter || ''}
                                    className="collection__social--link"
                                >
                                    <img
                                        src="/assets/img/twitter.svg"
                                        alt="twitter"
                                        className="collection__social--icon"
                                    />
                                </a>

                                <a
                                    href={collection.link_opensea || ''}
                                    className="collection__social--link"
                                >
                                    <img
                                        src="/assets/img/opensea.svg"
                                        alt="opensea"
                                        className="collection__social--icon"
                                    />
                                </a>

                                <a
                                    href={collection.link_instagram || ''}
                                    className="collection__social--link"
                                >
                                    <img
                                        src="/assets/img/insta.svg"
                                        alt="instagram"
                                        className="collection__social--icon"
                                    />
                                </a>

                                <a
                                    href={collection.link_medium || ''}
                                    className="collection__social--link"
                                >
                                    <img
                                        src="/assets/img/discord.svg"
                                        alt="discord"
                                        className="collection__social--icon"
                                    />
                                </a>
                            </div>
                        </div>

                        <div className="collection__data">
                            <div className="collection__data--item">
                                <h3 className="collection__data--title">
                                    {roundInt({ num: Number(collection.volume_troded_count) })} ETH
                                </h3>

                                <p className="collection__data--text">total volume</p>
                            </div>

                            <div className="collection__data--item">
                                <h3 className="collection__data--title">
                                    {roundInt({ num: Number(collection.floor_price_count) })} ETH
                                </h3>

                                <p className="collection__data--text">floor price</p>
                            </div>

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
                        </div>

                        <div className="collection__desc--inner">
                            <p className={`collection__desc${fullDesc ? ' full' : ''}`}>
                                {collection.description}
                            </p>

                            <div
                                className="collection__desc--full"
                                onClick={() => setFullDesc((prev) => !prev)}
                            >
                                See {fullDesc ? 'less' : 'more'}
                                <img
                                    src="/assets/img/arrow-top.svg"
                                    alt="arrow"
                                    className={`collection__desc--full--icon${
                                        fullDesc ? ' full' : ''
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="collection__filter--content">
                            <button
                                className="button collection__filter--button"
                                onClick={() => setFilterActive((prev) => !prev)}
                            >
                                <img
                                    src="/assets/img/filter.svg"
                                    alt="filter"
                                    className="collection__filter--icon"
                                />

                                <p className="collection__filter--button--text">Filters</p>
                            </button>

                            <button
                                className="button collection__sort--button"
                                onClick={() => setSortActive((prev) => !prev)}
                            >
                                <img
                                    src="/assets/img/sort.svg"
                                    alt="sort"
                                    className="collection__filter--icon"
                                />

                                <p className="collection__sort--button--text">Sort</p>
                            </button>

                            <div className="collection__search--inner">
                                <input
                                    type="text"
                                    className="input header__search"
                                    placeholder="Search by token name"
                                    value={search}
                                    onChange={changeSearch}
                                />

                                <img
                                    src="/assets/img/search.svg"
                                    alt="search"
                                    className="header__search--icon"
                                />

                                {search && (
                                    <img
                                        src="/assets/img/cross.svg"
                                        alt="cross"
                                        className="header__search--remove"
                                        onClick={emptySearch}
                                    />
                                )}
                            </div>

                            <div className="collection__filter--order">
                                <CustomSelect
                                    optionsList={[
                                        { value: 'price', name: 'Price low to high' },
                                        { value: 'recently', name: 'Recently listed' },
                                        { value: 'recentlyBook', name: 'Recently booked' },
                                        { value: 'recentlyMint', name: 'Recently minted' },
                                        { value: 'rare', name: 'Most rare' },
                                        { value: 'soon', name: 'Ending soon' },
                                    ]}
                                    value={filter}
                                    placeholder="Select filter"
                                    onChange={filterChenge}
                                />
                            </div>

                            <div className="collection__filter--view">
                                <button className="button collection__filter--view--item active">
                                    <img
                                        src="/assets/img/view1.svg"
                                        alt="view"
                                        className="collection__filter--view--icon"
                                    />
                                </button>

                                <button className="button collection__filter--view--item">
                                    <img
                                        src="/assets/img/view2.svg"
                                        alt="view"
                                        className="collection__filter--view--icon"
                                    />
                                </button>
                            </div>

                            <button className="button collection__get">Get on whitelist</button>
                            {actionBtn}
                        </div>

                        <div className="collection__content">
                            {filterActive && (
                                <div className="collection__filter--box">
                                    <div className="collection__filter--title--box">
                                        <p className="collection__filter--title">Filters</p>

                                        <img
                                            src="/assets/img/cross2.svg"
                                            alt="cross"
                                            className="collection__filter--title--cross"
                                            onClick={() => setFilterActive((prev) => !prev)}
                                        />
                                    </div>

                                    <FilterItem title="Status" value="2" elements={filterData} />
                                    <FilterItem
                                        title="Character 1"
                                        value="3"
                                        elements={filterData2}
                                        filter
                                    />

                                    <div className="collection__filter--buttons">
                                        <button className="button collection__filter--button--filter">
                                            Clear all
                                        </button>

                                        <button className="button collection__filter--button--filter blue__button">
                                            Done
                                        </button>
                                    </div>
                                </div>
                            )}

                            {sortActive && (
                                <div className="collection__sort--box">
                                    <div className="collection__filter--title--box">
                                        <p className="collection__filter--title">Sort by</p>

                                        <img
                                            src="/assets/img/cross2.svg"
                                            alt="cross"
                                            className="collection__filter--title--cross"
                                            onClick={() => setSortActive((prev) => !prev)}
                                        />
                                    </div>

                                    <div className="collection__sort--content">
                                        <div className="collection__sort--item">
                                            <input
                                                type="radio"
                                                className="radio"
                                                name="sort"
                                                id="sort1"
                                            />

                                            <label
                                                htmlFor="sort1"
                                                className="collection__sort--item--label"
                                            >
                                                Recently listed
                                            </label>
                                        </div>

                                        <div className="collection__sort--item">
                                            <input
                                                type="radio"
                                                className="radio"
                                                name="sort"
                                                id="sort2"
                                            />

                                            <label
                                                htmlFor="sort2"
                                                className="collection__sort--item--label"
                                            >
                                                Recently booked
                                            </label>
                                        </div>

                                        <div className="collection__sort--item">
                                            <input
                                                type="radio"
                                                className="radio"
                                                name="sort"
                                                id="sort3"
                                            />

                                            <label
                                                htmlFor="sort3"
                                                className="collection__sort--item--label"
                                            >
                                                Recently minted
                                            </label>
                                        </div>
                                    </div>

                                    <div className="collection__filter--buttons">
                                        <button className="button collection__sort--button--filter blue__button">
                                            Done
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="collection__content--preitems">
                                <div className="collection__content--info">
                                    <div className="collection__content--update">
                                        <button className="button collection__content--update--button">
                                            <img
                                                src="/assets/img/reload.svg"
                                                alt="reload"
                                                className="collection__content--update--icon"
                                            />
                                        </button>

                                        <p className="collection__content--update--text">
                                            Updated 2m ago
                                        </p>
                                    </div>

                                    <p className="collection__items--value">
                                        {collectionTokens.results
                                            ? collectionTokens.results.length
                                            : 0}{' '}
                                        items
                                    </p>
                                </div>

                                <div className="collection__filter--active">
                                    <div className="collection__filter--active--content">
                                        <button className="button collection__filter--active--item">
                                            <p className="collection__filter--active--item--text">
                                                1st ten
                                            </p>

                                            <img
                                                src="/assets/img/cross2.svg"
                                                alt="cross"
                                                className="collection__filter--active--item--delete"
                                            />
                                        </button>

                                        <button className="button collection__filter--active--item">
                                            <p className="collection__filter--active--item--text">
                                                2nd ten
                                            </p>

                                            <img
                                                src="/assets/img/cross2.svg"
                                                alt="cross"
                                                className="collection__filter--active--item--delete"
                                            />
                                        </button>
                                    </div>

                                    <button className="button collection__filter--clear">
                                        Clear All
                                    </button>
                                </div>

                                <div
                                    className={`collection__content--items${
                                        filterActive ? ' active' : ''
                                    }`}
                                >
                                    {!collectionTokens.results ||
                                    !collectionTokens.results.length ? (
                                        <div className="collection__items--none">
                                            No items to display
                                        </div>
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
                </div>
            </div>

            <WLCreationDialog
                open={createWLDialog.isOpen}
                dialogType={DIALOG_TYPES.PERSONS}
                onClose={closeCreationDialogHandler}
                onCreate={() => console.log('create')}
            />
        </>
    );
};

export default Collection;
