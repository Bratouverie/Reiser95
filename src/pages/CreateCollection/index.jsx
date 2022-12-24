import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CenteredContainer from '../../common/CenteredContainer';
import { CustomSelect } from '../../common/CustomSelect';
import File from '../../common/File';
import Input from '../../common/Input';
import Loader from '../../common/Loader';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { NotificationContext } from '../../context/NotificationContext';
import {
    useCreateCollectionMutation,
    useGetAccountQuery,
    useGetAccountsQuery,
    useGetBlockchainsQuery,
    useGetCollectionQuery,
    useGetCurrencyTokensQuery,
    useGetPagesQuery,
    useUpdateAccountMutation,
    useUpdateCollectionMutation,
} from '../../redux/api/dataService';
import { pagesSelectors } from '../../redux/slices/pages';
import { normilizeError } from '../../utils/http/normilizeError';

import './index.css';

const OpenSeaCategory = {
    ART: 'Art',
    COLLECTIBLES: 'Collectibles',
    MUSIC: 'Music',
    PHOTOGRAPHY: 'Photography',
    SPORTS: 'Sports',
    TRANDING_CARDS: 'TradingCards',
    UTILITY: 'Utility',
};

const SocialLinks = {
    OPENSEA: {
        imgLink: '/assets/img/opensea.svg',
        name: 'opensea',
        placeholder: 'https://opensea.io/abcdef',
    },
    DISCORD: {
        imgLink: '/assets/img/discord-white.svg',
        name: 'discord',
        placeholder: 'https://discord.gg/abcdef',
    },
    INSTAGRAM: {
        imgLink: '/assets/img/insta.svg',
        name: 'instagram',
        placeholder: 'https://www.instagram.com/YourinstagramHandle',
    },
    TWITTER: {
        imgLink: '/assets/img/twitter.svg',
        name: 'twitter',
        placeholder: 'https://twitter.com/abcdef',
    },
};

const DisplayThemes = {
    PADDED: {
        img: '/assets/img/display1.png',
        name: 'Padded',
        value: 'padded',
        description: 'Recommended for assets with transparent background',
    },
    CONTAINED: {
        img: '/assets/img/display2.png',
        name: 'Contained',
        value: 'contained',
        description: 'Recommended for assets that are not a 1:1 ratio',
    },
    COVERED: {
        img: '/assets/img/display3.png',
        name: 'Covered',
        value: 'covered',
        description: 'Recommended for assets that can extend to the edge',
    },
};

// {
//     "id": "9adeffe4-fb19-4531-a96e-e4a02a8fe26b",
//     "payment_tokens": [
//         {
//             "id": "f56d23c1-5e64-4bf6-9a24-43bbf4c2b6ea",
//             "name": "ETH1",
//             "smart_contract_address": "1111111111111111111",
//             "blockchain": "11643bd9-183e-48bc-bad8-07e54c810bc1"
//         },
//         {
//             "id": "53a932bf-8e83-4b56-9d4d-9ccb34ad47c0",
//             "name": "ETH2",
//             "smart_contract_address": "1111111111111111111",
//             "blockchain": "11643bd9-183e-48bc-bad8-07e54c810bc1"
//         }
//     ],
//     "blockchain": {
//         "id": "11643bd9-183e-48bc-bad8-07e54c810bc1",
//         "name": "Ethereum"
//     },
//     "hide": false,
//     "created_at": "2022-12-11T17:29:11.203092Z",
//     "link_opensea": null,
//     "link_discord": null,
//     "link_instagram": null,
//     "link_medium": null,
//     "link_twitter": null,
//     "type": "standard",
//     "logo": "https://gateway.storjshare.io/demo-bucket/file123_6sMNrPt.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221222%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221222T180403Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=f780746efe6a6a3098e72342935f6cc40c431231f02f57cd0ed113987d421220",
//     "featured": "https://gateway.storjshare.io/demo-bucket/file123_4RQpXf3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221222%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221222T180403Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8079a9a593f3453d2d5676cd0ac57ee1ba67608948ebbed263bb41686f5e7214",
//     "banner": "https://gateway.storjshare.io/demo-bucket/file123_niysD7C.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221222%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221222T180403Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8ed07bd20baf09cd154e9278bdbc97d138e22b6b2e23f2c6e551039454853b15",
//     "name": "ddwew12345d1",
//     "url": "ddwew12345d1",
//     "url_opensea": null,
//     "category_opensea": "11111",
//     "percentage_fee": "1.00000000",
//     "display_theme": "1111111",
//     "description": "1111111111",
//     "upload_blockchain": false,
//     "smart_contract_address": null,
//     "items_count": 16,
//     "owners_count": 0,
//     "floor_price_count": "1.00000000",
//     "volume_troded_count": "0.00000000",
//     "profit": "16.00000000",
//     "creator_profit": "0.00000000",
//     "creator_fee": "0.00000000",
//     "page": "de4aea1b-4562-472f-b943-6c74fa525cca",
//     "account": "afbcbf99-1fc1-4e50-bf5b-5fb682d3e179"
// }

const SOCIAL_LINKS_ARR = Object.values(SocialLinks);
const OPENSEA_CATEGORY_ARR = Object.values(OpenSeaCategory);
const DISPLAIED_THEMES_ARR = Object.values(DisplayThemes);

const CreateCollection = (props) => {
    const { isEdit } = props;

    const { id } = useParams();

    const pages = useSelector(pagesSelectors.selectAll);

    const { data: blockchains, isLoading: isBlockchainsLoading } = useGetBlockchainsQuery();
    const { isLoading: isPagesLoading } = useGetPagesQuery();
    // TODo rewrite to another endpoint
    const { data: accounts, isLoading: isAccountsLoading } = useGetAccountsQuery({
        page: 1,
        pageSize: 1000,
    });

    const { data: collection, isLoading: isCollectionLoading } = useGetCollectionQuery(
        { id },
        {
            skip: !id || !isEdit,
        },
    );

    const [
        onUpdateCollectionRequest,
        {
            isLoading: isCollectionUpdatingProccessing,
            error: updateCollectionError,
            isSuccess: isCollectionUpdatingSuccessfully,
            reset: resetCollectionUpdate,
        },
    ] = useUpdateCollectionMutation();

    const [blockchainId, setBlockchainId] = useState('');

    const { data: currencyTokens } = useGetCurrencyTokensQuery(
        { blockchainId },
        { skip: !blockchainId, pollingInterval: 300 },
    );

    const [
        onCreateCollectionRequest,
        {
            isLoading: isCollectionCreatingProccessing,
            isSuccess: isCollectionCreatedSuccessfully,
            error: collectionCreatingError,
            reset: resetCollectionCreationState,
        },
    ] = useCreateCollectionMutation();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const [logo, setLogo] = useState('');
    const [adminSmart, setAdminSmart] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [banner, setBanner] = useState('');
    const [name, setName] = useState('');
    const [opensea, setOpensea] = useState('');
    const [description, setDescriprion] = useState('');
    const [checkbrandcom, setCheckbrandcom] = useState('');
    const [openSeaCategory, setOpenSeaCategory] = useState(OpenSeaCategory.ART);
    const [brandId, setBrandId] = useState('');
    const [accountId, setAccountId] = useState('');
    const [social, setSocial] = useState({
        opensea: '',
        discord: '',
        instagram: '',
        twitter: '',
    });
    const [percentageFee, setPercentageFee] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [displayTheme, setDisplayTheme] = useState(DisplayThemes.PADDED.value);
    const [availablePaymentTokens, setAvailablePaymentTokens] = useState([]);

    const availbleAccaunts = useMemo(() => {
        if (!brandId || !accounts || !accounts.results) {
            return [];
        }

        return (accounts || []).results.filter((a) => a.page === brandId);
    }, [accounts, brandId]);

    const changeBrandHandler = useCallback((id) => {
        setBrandId(id);
    }, []);

    const changeAccountHandler = useCallback((id) => {
        setAccountId(id);
    }, []);

    const onChangeSocialLinksHandler = useCallback((key, value) => {
        setSocial((p) => ({
            ...p,
            [key]: value,
        }));
    }, []);

    const blockchainChangeHandler = useCallback((value) => {
        setBlockchainId(value);
    }, []);

    const tokenChangeHandler = useCallback((value) => {
        setTokenId(value);
    }, []);

    const changeThemeHandler = useCallback((theme) => {
        setDisplayTheme(theme);
    }, []);

    const onSubmitHandler = useCallback(() => {
        let formData = new FormData();

        if (
            (!logo && !isEdit) ||
            (!banner && !isEdit) ||
            (!featuredImage && !isEdit) ||
            !name ||
            !checkbrandcom ||
            !opensea ||
            !openSeaCategory ||
            !percentageFee ||
            !displayTheme ||
            !description ||
            !adminSmart ||
            !brandId ||
            !accountId ||
            !blockchainId ||
            !tokenId
        ) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'Fill all required fields',
            });

            return;
        }

        formData.append('link_opensea', social.opensea);
        formData.append('link_discord', social.discord);
        formData.append('link_instagram', social.instagram);
        formData.append('link_twitter', social.twitter);

        if (logo) {
            formData.append('logo', logo);
        }

        if (featuredImage) {
            formData.append('featured', featuredImage);
        }

        if (banner) {
            formData.append('banner', banner);
        }

        formData.append('name', name);
        formData.append('url', checkbrandcom);
        formData.append('url_opensea', opensea);
        formData.append('category_opensea', openSeaCategory);
        formData.append('percentage_fee', percentageFee);
        formData.append('display_theme', displayTheme);
        formData.append('description', description);
        formData.append('smart_contract_address', adminSmart);
        formData.append('page', brandId);
        formData.append('account', accountId);
        formData.append('blockchain', blockchainId);
        formData.append('payment_tokens', tokenId);

        // TO SHOW REQUEST DATA
        // const data = {
        //     link_opensea: social.opensea,
        //     link_discord: social.discord,
        //     link_instagram: social.instagram,
        //     link_twitter: social.twitter,
        //     logo: logo,
        //     featured: featuredImage,
        //     banner: banner,
        //     name: name,
        //     url: checkbrandcom,
        //     url_opensea: opensea,
        //     category_opensea: openSeaCategory,
        //     percentage_fee: percentageFee,
        //     display_theme: displayTheme,
        //     description: description,
        //     smart_contract_address: adminSmart,
        //     page: brandId,
        //     account: accountId,
        //     blockchain: blockchainId,
        //     payment_tokens: tokenId,
        // };

        if (isEdit) {
            onUpdateCollectionRequest({ id, data: formData });
        } else {
            onCreateCollectionRequest(formData);
        }
    }, [
        isEdit,
        id,
        social,
        logo,
        featuredImage,
        banner,
        name,
        checkbrandcom,
        opensea,
        openSeaCategory,
        percentageFee,
        displayTheme,
        description,
        adminSmart,
        brandId,
        accountId,
        blockchainId,
        tokenId,
    ]);

    useEffect(() => {
        if (isCollectionCreatedSuccessfully) {
            setLogo('');
            setAdminSmart('');
            setFeaturedImage('');
            setBanner('');
            setName('');
            setOpensea('');
            setDescriprion('');
            setCheckbrandcom('');
            setOpenSeaCategory(OpenSeaCategory.ART);
            setBrandId('');
            setAccountId('');
            setSocial({
                opensea: '',
                discord: '',
                instagram: '',
                twitter: '',
            });
            setPercentageFee('');
            setBlockchainId('');
            setTokenId('');
            setDisplayTheme('');

            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Collection successfuly created',
            });
        }
    }, [isCollectionCreatedSuccessfully]);

    useEffect(() => {
        if (collectionCreatingError) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(collectionCreatingError),
            });
        }
    }, [collectionCreatingError]);

    useEffect(() => {
        if (updateCollectionError) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(updateCollectionError),
            });
        }
    }, [updateCollectionError]);

    useEffect(() => {
        if (isCollectionUpdatingSuccessfully) {
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Collection successfuly updated',
            });
        }
    }, [isCollectionUpdatingSuccessfully]);

    useEffect(() => {
        if (collection && isEdit) {
            setAdminSmart(collection.smart_contract_address);
            setName(collection.name);
            setOpensea(collection.url_opensea);
            setDescriprion(collection.description);
            setCheckbrandcom(collection.url);
            setOpenSeaCategory(collection.category_opensea);
            setBrandId(collection.page);
            setAccountId(collection.account);
            setSocial({
                opensea: collection.link_opensea !== 'null' ? collection.link_opensea : '',
                discord: collection.link_discord !== 'null' ? collection.link_discord : '',
                instagram: collection.link_instagram !== 'null' ? collection.link_instagram : '',
                twitter: collection.link_twitter !== 'null' ? collection.link_twitter : '',
            });
            setPercentageFee(String(Number(collection.percentage_fee)));
            setBlockchainId(collection.blockchain.id);
            setDisplayTheme(collection.display_theme);
        }
    }, [collection, isEdit]);

    useEffect(
        () => () => {
            resetCollectionCreationState();
            resetCollectionUpdate();
        },
        [],
    );

    if (
        isBlockchainsLoading ||
        isPagesLoading ||
        isAccountsLoading ||
        isCollectionLoading ||
        (!collection && isEdit)
    ) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    }

    return (
        <div className="default__padding createpage">
            <div className="container">
                <div className="createpage__inner">
                    <h2 className="title left">
                        {isEdit ? 'Update Collection' : 'Create a collection'}
                    </h2>

                    <p className="text left">
                        Collection is creating on the OpenSea and is visible on CheckBrandcom
                    </p>

                    <div className="create__content">
                        <File
                            title="Logo image"
                            text="This image will be used as Brand / Person logo. 350 x 350 recommended."
                            required
                            half
                            type="logo"
                            id="createaccountLogo"
                            defaultValue={collection && collection.logo}
                            value={logo}
                            setValue={setLogo}
                        />
                        <Input
                            title="Smart-contract administrator"
                            placeholder="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF"
                            required
                            half
                            value={adminSmart}
                            setValue={setAdminSmart}
                        />
                        <File
                            title="Featured image"
                            text="This image will be used for featuning your collection on the Account page. 600 x 400
              recommended."
                            defaultValue={collection && collection.featured}
                            required
                            id="featuredImage"
                            value={featuredImage}
                            setValue={setFeaturedImage}
                        />
                        <File
                            title="Banner image"
                            text="This image will appear at the top of account page. 1400 x 400 recommended."
                            required
                            id="createcollectionBanner"
                            defaultValue={collection && collection.banner}
                            value={banner}
                            setValue={setBanner}
                        />
                        <Input
                            title="name"
                            placeholder="Enter Collection name"
                            required
                            value={name}
                            setValue={setName}
                        />
                        <Input
                            title="URL OpenSea"
                            text="Customize your URL on OpenSea. Must only contain lowercase letters, numbers, and hyphens."
                            placeholder="https://opensea.io/collection/custom URL"
                            required
                            value={opensea}
                            setValue={setOpensea}
                        />
                        <Input
                            title="URL CheckBrandcom"
                            text="Customize your URL on CheckBrandcom. Must only contain lowercase letters, numbers, and hyphens."
                            placeholder="https://checkbrand.com/collection/custom URL"
                            required
                            value={checkbrandcom}
                            setValue={setCheckbrandcom}
                        />
                        <Input
                            title="Description"
                            text="Markdown syntax is supported. 0 of 1000 characters used."
                            textarea
                            required
                            value={description}
                            setValue={setDescriprion}
                        />
                        <div className="create__item">
                            <p className="create__item--title">Category OpenSea</p>

                            <p className="create__item--text">
                                Adding a category will help make your item discoverable on OpenSea.
                            </p>

                            <div className="create__item--select--prop">
                                {OPENSEA_CATEGORY_ARR.map((c) => (
                                    <button
                                        keu={c}
                                        className={`button create__item--option ${
                                            c === openSeaCategory ? 'active' : ''
                                        }`}
                                        onClick={() => setOpenSeaCategory(c)}
                                    >
                                        {c}
                                        {c === openSeaCategory && (
                                            <img
                                                src="/assets/img/check.svg"
                                                alt="icon"
                                                className="create__item--icon"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">CheckBrandcom Page</p>

                            <p className="create__item--text">
                                Select the page that hosts the account where you want to create the
                                collection.
                            </p>

                            <div className="create__item--select--prop">
                                {(pages || []).map((page) => (
                                    <button
                                        key={page.id}
                                        className={`button create__item--option ${
                                            page.id === brandId ? 'active' : ''
                                        }`}
                                        onClick={() => changeBrandHandler(page.id)}
                                    >
                                        {page.name}
                                        {page.id === brandId && (
                                            <img
                                                src="/assets/img/check.svg"
                                                alt="icon"
                                                className="create__item--icon"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">Account</p>

                            <p className="create__item--text">
                                Choose an account to place the collection.
                            </p>

                            <div className="create__item--account--inner">
                                <div className="create__item--account--content">
                                    {brandId ? (
                                        <>
                                            {availbleAccaunts.length ? (
                                                <>
                                                    {availbleAccaunts.map((acc, i) => {
                                                        return (
                                                            <div
                                                                className="create__item--account--item"
                                                                key={acc.id}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="accounts"
                                                                    className="create__item--account--checkbox"
                                                                    checked={acc.id === accountId}
                                                                    id={acc.id}
                                                                    onChange={() =>
                                                                        changeAccountHandler(acc.id)
                                                                    }
                                                                />

                                                                <label
                                                                    htmlFor={acc.id}
                                                                    className="create__item--account--item--label"
                                                                >
                                                                    <span className="create__item--account--item--label--wrap">
                                                                        <p className="create__item--account--item--num">
                                                                            {i + 1}
                                                                        </p>

                                                                        <span className="create__item--account--item--img"></span>

                                                                        <p className="create__item--account--item--name">
                                                                            {acc.name}
                                                                        </p>
                                                                    </span>

                                                                    <span className="create__item--account--item--circle"></span>
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </>
                                            ) : (
                                                <span className="selectPageWarning">
                                                    Selected page has no accounts
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <span className="selectPageWarning">Select page first</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">Links</p>

                            <div className="create__item--links">
                                {SOCIAL_LINKS_ARR.map(({ imgLink, name, placeholder }) => (
                                    <div className="create__item--link" key={name}>
                                        <img
                                            src={imgLink}
                                            alt={name}
                                            className="create__item--link--icon"
                                        />
                                        <Input
                                            className="linkContainer"
                                            placeholder={placeholder}
                                            isLink
                                            value={social[name]}
                                            setValue={(value) =>
                                                onChangeSocialLinksHandler(name, value)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">Creator Earnings</p>

                            <p className="create__item--text">
                                Collect a fee when a user re-sells on item you originally created.
                                This is deducted from the final sale price and paid monthly to a
                                payout address of your choosing.
                            </p>

                            <p className="create__item--text">Percentage fee</p>
                            <Input
                                placeholder="e.g. 5"
                                value={percentageFee}
                                setValue={setPercentageFee}
                            />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">Blockchain</p>

                            <p className="create__item--text">
                                Select the blockchain where you&rsquo;d like new items from this
                                collection to be added by default.
                            </p>

                            <div className="create__item--select--inner">
                                {Boolean(blockchains) && (
                                    <div className="create__item--select--inner">
                                        <CustomSelect
                                            optionsList={blockchains.map((c) => ({
                                                value: c.id,
                                                name: c.name,
                                            }))}
                                            value={blockchainId}
                                            placeholder="Select Blockchain"
                                            onChange={blockchainChangeHandler}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">Payment tokens</p>

                            <p className="create__item--text">
                                These tokens can used to buy and sell your items.
                            </p>

                            <div className="create__item--select--prop">
                                <button className="button create__item--pay--button">
                                    <img
                                        src="/assets/img/eth.svg"
                                        alt="eth"
                                        className="create__item--pay--icon"
                                    />

                                    <span className="create__item--pay--button--wrap">
                                        <p className="create__item--pay--button--title">Eth</p>

                                        <p className="create__item--pay--button--text">Ethereum</p>
                                    </span>
                                </button>

                                <button className="button create__item--pay--button">
                                    <img
                                        src="/assets/img/cat.png"
                                        alt="eth"
                                        className="create__item--pay--icon"
                                    />

                                    <span className="create__item--pay--button--wrap">
                                        <p className="create__item--pay--button--title">Eth</p>

                                        <p className="create__item--pay--button--text">Ethereum</p>
                                    </span>
                                </button>
                            </div>

                            <div className="create__item--select--inner">
                                {!currencyTokens || !currencyTokens.length ? (
                                    <select
                                        className="select create__item--select"
                                        disabled={!availablePaymentTokens.length}
                                    >
                                        <option>Select blockchain</option>
                                    </select>
                                ) : (
                                    <CustomSelect
                                        optionsList={currencyTokens.map((c) => ({
                                            value: c.id,
                                            name: c.name,
                                        }))}
                                        value={tokenId}
                                        placeholder="Select Collection"
                                        onChange={tokenChangeHandler}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">Display theme</p>

                            <p className="create__item--text">Change how your items are shown.</p>

                            <div className="create__item--theme--inner">
                                {DISPLAIED_THEMES_ARR.map((dt) => (
                                    <button
                                        key={dt.value}
                                        className={`button create__item--theme--item ${
                                            displayTheme === dt.value ? 'active' : ''
                                        }`}
                                        onClick={() => changeThemeHandler(dt.value)}
                                    >
                                        <img
                                            src={dt.img}
                                            alt="theme"
                                            className="create__item--theme--item--img"
                                        />

                                        <p className="create__item--theme--item--title">
                                            {dt.name}
                                        </p>

                                        <p className="create__item--theme--item--text">
                                            {dt.description}
                                        </p>

                                        {displayTheme === dt.value && (
                                            <img
                                                src="/assets/img/check.svg"
                                                alt="icon"
                                                className="create__item--icon"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="create__button--content">
                        <div className="create__button--wrapper">
                            {isCollectionCreatingProccessing || isCollectionUpdatingProccessing ? (
                                <button className="button create__button default__hover">
                                    Loading...
                                </button>
                            ) : (
                                <button
                                    className="button create__button default__hover"
                                    onClick={onSubmitHandler}
                                >
                                    {isEdit ? 'Save changes' : 'Create'}
                                </button>
                            )}

                            {/* <button className="button create__button filled">
                                Upload in Blockchane
                            </button>

                            <button className="button create__button default__hover delete">
                                Delete Collection
                            </button> */}
                        </div>

                        {/* <div className="create__button--wrapper">
                            <button className="button create__button default__hover">
                                Submit changes
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CreateCollection);
