import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CustomSelect } from '../../common/CustomSelect';
import File from '../../common/File';
import Input from '../../common/Input';
import Loader from '../../common/Loader';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { NotificationContext } from '../../context/NotificationContext';
import { getAccountsList } from '../../functions/data';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';

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

const SOCIAL_LINKS_ARR = Object.values(SocialLinks);
const OPENSEA_CATEGORY_ARR = Object.values(OpenSeaCategory);
const DISPLAIED_THEMES_ARR = Object.values(DisplayThemes);

const CreateCollection = () => {
    const pages = useSelector(state => state.pages);
    const accounts = useSelector(state => state.accounts);
    const blockchains = useSelector(state => state.blockchains);

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const { state, request, onClearState } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        method: HTTP_METHODS.POST,
        url: 'collection/',
        isAuth: true,
    });

    const { state: getBlockchainTokensState, request: onGetBlockchainTokens } = useRequest({
        url: 'currency_token/',
        requestType: REQUEST_TYPE.DATA,
        isAuth: true,
    });

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
    const [blockchainId, setBlockchainId] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [displayTheme, setDisplayTheme] = useState(DisplayThemes.PADDED.value);
    const [availablePaymentTokens, setAvailablePaymentTokens] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const availbleAccaunts = useMemo(() => {
        if (!brandId || !accounts.accounts) {
            return null;
        }

        return (accounts.accounts || []).filter(a => a.page === brandId);
    }, [accounts.accounts, brandId]);

    const changeBrandHandler = useCallback(id => {
        setBrandId(id);
    }, []);

    const changeAccountHandler = useCallback(id => {
        setAccountId(id);
    }, []);

    const onChangeSocialLinksHandler = useCallback((key, value) => {
        setSocial(p => ({
            ...p,
            [key]: value,
        }));
    }, []);

    const blockchainChangeHandler = useCallback(value => {
        setBlockchainId(value);
    }, []);

    const tokenChangeHandler = useCallback(value => {
        setTokenId(value);
    }, []);

    const changeThemeHandler = useCallback(theme => {
        setDisplayTheme(theme);
    }, []);

    const onSubmitHandler = useCallback(() => {
        let formData = new FormData();

        if (
            !logo ||
            !featuredImage ||
            !banner ||
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
        setIsLoading(true);

        formData.append('link_opensea', social.opensea);
        formData.append('link_discord', social.discord);
        formData.append('link_instagram', social.instagram);
        formData.append('link_twitter', social.twitter);
        formData.append('logo', logo);
        formData.append('featured', featuredImage);
        formData.append('banner', banner);
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

        request({ data: formData });
    }, [
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
        if (state && state.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'Fill all required fields',
            });
        }
    }, [state.error]);

    useEffect(() => {
        if (getBlockchainTokensState.result && getBlockchainTokensState.result.data) {
            setAvailablePaymentTokens(getBlockchainTokensState.result.data);
        }

        if (getBlockchainTokensState.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: getBlockchainTokensState.error,
            });
        }
    }, [getBlockchainTokensState]);

    useEffect(() => {
        if (blockchainId) {
            onGetBlockchainTokens({
                query: {
                    blockchain_id: blockchainId,
                },
            });
        }
    }, [blockchainId]);

    useEffect(() => {
        if (state.result && state.result.data) {
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
            onClearState();

            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Collection successfuly created',
            });

            setIsLoading(false);
        }

        if (state.error) {
            setIsLoading(false);
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: state.error,
            });
        }
    }, [state]);

    return (
        <div className="default__padding createpage">
            <div className="container">
                <div className="createpage__inner">
                    <h2 className="title left">Create a collection</h2>

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
                                {OPENSEA_CATEGORY_ARR.map(c => (
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
                                {(pages.pages || []).map(page => (
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
                                                    {availbleAccaunts.map((acc, i) => (
                                                        <div
                                                            className="create__item--account--item"
                                                            key={acc.id}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="accounts"
                                                                className="create__item--account--checkbox"
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
                                                    ))}
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
                                            setValue={value =>
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
                                {Boolean(blockchains && blockchains.blockchains) && (
                                    <div className="create__item--select--inner">
                                        <CustomSelect
                                            optionsList={blockchains.blockchains.map(c => ({
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
                                {!availablePaymentTokens.length ? (
                                    <select
                                        className="select create__item--select"
                                        disabled={!availablePaymentTokens.length}
                                    >
                                        <option>Select blockchain</option>
                                    </select>
                                ) : (
                                    <CustomSelect
                                        optionsList={availablePaymentTokens.map(c => ({
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
                                {DISPLAIED_THEMES_ARR.map(dt => (
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
                            {isLoading ? (
                                <div className="createCollection__loaderContainer">
                                    <Loader className="createCollection__loader" />
                                </div>
                            ) : (
                                <button
                                    className="button create__button default__hover"
                                    onClick={onSubmitHandler}
                                >
                                    Create
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

export default CreateCollection;
