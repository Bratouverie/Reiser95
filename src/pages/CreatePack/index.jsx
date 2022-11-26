import React, { useState, useMemo, useCallback, useContext } from 'react';
import _, { uniqueId } from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FileDropzone from '../../common/FileDropzone';
import Input, { INPUT_TYPE } from '../../common/Input';
import RoyaltyDestribution from '../../common/RoyaltyDestribution';
import LevelsDialog from '../../components/LevelsDialog';
import PropertiesDialog from '../../components/PropertiesDialog';
import StatsDialog from '../../components/StatsDialog';
import { ONLY_NUMBERS_REGEX_ONLY_G } from '../../const/regExp';
import { NotificationContext } from '../../context/NotificationContext';
import { useDialog } from '../../hooks/useDialog';
import { useFileDropzone } from '../../hooks/useFileDropzone';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { generateNumericIndicator } from '../../utils/generateNumericIndicator';
import { getFileNameAndExt } from '../../utils/getFilenameAndExt';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';

import './index.css';

const UPLOAD_FILES_MAX_LIMIT = 1000;
const MAX_NUMERIC_INDICATOR_START = 1000;
const ONE_HUNDRED = 100;

// FILE TYPE
// type FileValue = {
//     file: {
//         path: "BURGER2.png",
//         lastModified: 1667925903547,
//         lastModifiedDate: Tue Nov 08 2022 19:45:03 GMT+0300 (Moscow Standard Time) {},
//         name: "BURGER2.png",
//         size: 1310265,
//         type: "image/png",
//     },
//     fileType: "image/png",
//     id: "file_1",
//     preview: "blob:http://localhost:3000/8e020a77-9e32-4fbe-a1fe-6015bca163ea",
// }

const TOKEN_PRICE_TYPE = {
    AUCTION: 'auction',
    PRICE: 'price',
    NO_PRICE: 'no_price',
};

const CreatePack = () => {
    const collections = useSelector(state => state.collections);
    const blockchains = useSelector(state => state.blockchains);

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const [availablePaymentTokens, setAvailablePaymentTokens] = useState([]);

    const [name, setName] = useState('');
    const [tokenCommonName, setTokenCommonName] = useState('Common name');
    const [numbering, setNumbering] = useState('1');
    const [tokenPrice, setTokenPrice] = useState('');
    const [investorRoyalty, setInvestorRoyalty] = useState('');
    const [creatorRoyalty, setCreatorRoyalty] = useState('');
    const [isTokenNameEqualFileName, setIsTokenNameEqualFileName] = useState(false);
    const [isAuction, setIsAuction] = useState(false);
    const [isNoPrice, setIsNoPrice] = useState(false);
    const [properties, setProperties] = useState([]);
    const [levels, setLevels] = useState([]);
    const [stats, setStats] = useState([]);

    const [creatorRoyaltyDestribution, setCreatorRoyaltyDestribution] = useState([]);
    const [incomeRoyaltyDestribution, setIncomeRoyaltyDestribution] = useState([]);

    const [collectionId, setCollectionId] = useState('');

    const [unlockable, setUnlockable] = useState(false);
    const [unlockableContent, setUnlockableContent] = useState('');

    const propertiesDialog = useDialog();
    const levelsDialog = useDialog();
    const statsDialog = useDialog();

    const { state: getBlockchainTokensState, request: onGetBlockchainTokens } = useRequest({
        url: 'currency_token/',
        requestType: REQUEST_TYPE.DATA,
        isAuth: true,
    });

    const {
        values: tokenImgValues,
        onAdd: onAddTokenImg,
        onDelete: onDeleteTokenImg,
    } = useFileDropzone({
        multiple: true,
        limit: UPLOAD_FILES_MAX_LIMIT,
    });

    const {
        values: tokenPreviewValues,
        onAdd: onAddTokenPreview,
        onDelete: onDeleteTokenPreview,
    } = useFileDropzone({
        multiple: true,
        limit: UPLOAD_FILES_MAX_LIMIT,
    });

    const selectedCollection = useMemo(() => {
        if (!collectionId || !collections.collections) {
            return null;
        }

        return collections.collections.find(c => c.id === collectionId);
    }, [collections.collections, collectionId]);

    const selectedBlockchain = useMemo(() => {
        if (!selectedCollection || !blockchains || !blockchains.blockchains) {
            return null;
        }

        return blockchains.blockchains.find(b => b.id === selectedCollection.blockchain.id);
    }, [selectedCollection, blockchains]);

    const genrateTablesRow = useMemo(() => {
        if (tokenImgValues.length === 0) {
            return [];
        }

        const res = [];

        tokenImgValues.map((tiv, i) => {
            const fileNameAndExt = getFileNameAndExt(tiv.file.name);

            if (res.some(r => r.tokenImgName === fileNameAndExt.fileName)) {
                return null;
            }

            const tokenPreviewImg = tokenPreviewValues.find(tpv => tpv.file.name === tiv.file.name);
            const numericIndicator = generateNumericIndicator(Number(numbering) + i);

            res.push({
                nameComponent: (
                    <>
                        {isTokenNameEqualFileName ? (
                            <>{fileNameAndExt.fileName}</>
                        ) : (
                            <>
                                {tokenCommonName}{' '}
                                <span className="green__c">{numericIndicator}</span>
                            </>
                        )}
                    </>
                ),
                numericIndicator,
                tokenImgName: tiv.file.name,
                tokenImgFile: tiv.file,
                tokenPreviewName: tokenPreviewImg ? tokenPreviewImg.file.name : null,
                tokenPreviewFile: tokenPreviewImg ? tokenPreviewImg.file : null,
                tokenPrice,
                investorRoyalty,
                creatorRoyalty,
            });
        });

        return res;
    }, [
        numbering,
        tokenImgValues,
        tokenPreviewValues,
        tokenCommonName,
        tokenPrice,
        investorRoyalty,
        creatorRoyalty,
        isTokenNameEqualFileName,
    ]);

    const onMakeTokenNameEqualToFileNameHandler = useCallback(() => {
        setIsTokenNameEqualFileName(p => !p);
    }, []);

    const onSelectTokenNameForPayment = useCallback(event => {
        console.log({ value: event.target.value });
    }, []);

    const onAuctionClickHandler = useCallback(() => {
        setIsAuction(p => !p);
    }, []);

    const onNoPriceClickHandler = useCallback(() => {
        setIsNoPrice(p => !p);
    }, []);

    const onPriceInputChange = useCallback(e => {
        setTokenPrice(e.target.value);
    }, []);

    // CREATOR ROYALTY
    const saveCreatotRoyaltyWalletHandler = useCallback(creatorRoyaltyInput => {
        setCreatorRoyaltyDestribution(p => [...p, creatorRoyaltyInput]);
    }, []);

    const deleteCreatorDestributionItem = useCallback(id => {
        setCreatorRoyaltyDestribution(p => p.filter(el => el.id !== id));
    }, []);

    // INCOME ROYALTY
    const saveIncomeRoyaltyWalletHandler = useCallback(incomeRoylaty => {
        setIncomeRoyaltyDestribution(p => [...p, incomeRoylaty]);
    }, []);

    const deleteIncomeDestributionItem = useCallback(id => {
        setIncomeRoyaltyDestribution(p => p.filter(el => el.id !== id));
    }, []);

    const onCollectionIdChangeHandler = useCallback(e => {
        setCollectionId(e.target.value);
    }, []);

    const setPropertiesHandler = useCallback(properties => {
        setProperties(properties);
    }, []);

    const setLevelsHandler = useCallback(levels => {
        setLevels(levels);
    }, []);

    const setStatsHandler = useCallback(stats => {
        setStats(stats);
    }, []);

    useEffect(() => {
        if (selectedBlockchain) {
            onGetBlockchainTokens({
                query: {
                    blockchain_id: selectedBlockchain.id,
                },
            });
        }
    }, [selectedBlockchain]);

    useEffect(() => {
        if (getBlockchainTokensState.result && getBlockchainTokensState.result.data) {
            setAvailablePaymentTokens(getBlockchainTokensState.result.data);
        }
    }, [getBlockchainTokensState.result]);

    console.log({
        availablePaymentTokens,
    });

    useEffect(() => {
        addNotification({
            type: NOTIFICATION_TYPES.ERROR,
            text: 'Something went wrong',
        });
    }, []);

    return (
        <>
            <div className="default__padding createpage">
                <div className="container">
                    <div className="createpage__inner">
                        <h2 className="title left">Create Pack</h2>

                        <p className="text left">Bulk token upload interface</p>

                        <div className="create__content">
                            <Input
                                title="Pack name"
                                placeholder="Enter Pack name"
                                required
                                value={name}
                                setValue={setName}
                            />

                            <div className="create__item">
                                <p className="create__item--title required">
                                    Add Images, Videos, Audios, or 3D Models
                                </p>

                                <p className="create__item--text">
                                    File types supported: JPG, PNG, GIF, SVG, Mp4, WEBM, MP3, WAV,
                                    OGG, GLB, GLTF. Max 1000 files. Files are sorted by file name.
                                </p>

                                <FileDropzone
                                    multiple
                                    availableFormats={['image/png', 'image/gif', 'image/jpeg']}
                                    values={tokenImgValues}
                                    onAdd={onAddTokenImg}
                                    id="createpackImgs"
                                    onDelete={onDeleteTokenImg}
                                />

                                <label htmlFor="createpackImgs" className="create__item--label img">
                                    <img
                                        src="/assets/img/img.png"
                                        alt="img"
                                        className="create__item--label--img"
                                    />
                                </label>
                            </div>

                            <div className="create__item">
                                <p className="create__item--title required">Preview Images</p>

                                <p className="create__item--text">
                                    Because you&rsquo;ve included multimedia, you&rsquo;ll need to
                                    provide an images (PNG, JPG, or GIF) for the card display of
                                    your item. Files are sorted by file name.
                                </p>

                                <FileDropzone
                                    multiple
                                    availableFormats={['image/png', 'image/gif', 'image/jpeg']}
                                    values={tokenPreviewValues}
                                    onAdd={onAddTokenPreview}
                                    id="createpackPreview"
                                    onDelete={onDeleteTokenPreview}
                                />

                                <label
                                    htmlFor="createpackPreview"
                                    className="create__item--label img"
                                >
                                    <img
                                        src="/assets/img/img.png"
                                        alt="img"
                                        className="create__item--label--img"
                                    />
                                </label>
                            </div>

                            <div className="create__item">
                                <p className="create__item--title required">Loading table</p>

                                <p className="create__item--text">
                                    The table shows which files with which name and price will be
                                    uploaded to the smart contract and readiness for uploading. All
                                    tokens will have the same characteristics (Link, Description,
                                    Collection name, Properties, Blockchain, etc.). But you can
                                    change the price of tokens in the table.
                                </p>

                                <div className="create__loading">
                                    <div className="create__loading--content">
                                        <div className="create__loading--item">
                                            <p className="create__loading--title"></p>

                                            <p className="create__loading--title">Token name</p>

                                            <p className="create__loading--title">Token Image</p>

                                            <p className="create__loading--title">Token Preview</p>

                                            <p className="create__loading--title">Price</p>

                                            <p className="create__loading--title">Fee</p>

                                            <p className="create__loading--title">Upload</p>
                                        </div>

                                        {genrateTablesRow.map((row, i) => (
                                            <div
                                                className="create__loading--item"
                                                key={row.numericIndicator}
                                            >
                                                <p className="create__loading--text">{i + 1}</p>

                                                <p className="create__loading--text">
                                                    {row.nameComponent}
                                                </p>

                                                <p className="create__loading--text">
                                                    {row.tokenImgName}
                                                </p>

                                                <p className="create__loading--text">
                                                    {row.tokenPreviewName}
                                                </p>

                                                <p className="create__loading--text">
                                                    Price{' '}
                                                    <span className="green__c">
                                                        {row.tokenPrice} ETH
                                                    </span>
                                                </p>

                                                <p className="create__loading--text">
                                                    Fee{' '}
                                                    <span className="green__c">
                                                        {row.investorRoyalty || 0}/
                                                        {row.creatorRoyalty || 0}
                                                    </span>
                                                </p>

                                                <p className="create__loading--text">100%</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="button create__loading--button">
                                        Submit Upload
                                    </button>
                                </div>
                            </div>

                            <div className="create__item half">
                                <Input
                                    title="Token name"
                                    text="Choose a “common name” so that all tokens have the same name."
                                    placeholder="Enter common name"
                                    required
                                    value={tokenCommonName}
                                    setValue={setTokenCommonName}
                                />
                                <p className="create__item--text">
                                    Token name = filename.ext - token name copies the token
                                    filename.
                                </p>
                                <button
                                    className={`button create__item--option ${
                                        isTokenNameEqualFileName ? 'active' : ''
                                    }`}
                                    onClick={onMakeTokenNameEqualToFileNameHandler}
                                >
                                    Token name = filename.ext
                                    {isTokenNameEqualFileName && (
                                        <img
                                            src="/assets/img/check.svg"
                                            alt="icon"
                                            className="create__item--icon"
                                        />
                                    )}
                                </button>
                            </div>

                            <div className="create__item half">
                                <Input
                                    title="Numbering"
                                    text=" When choosing a common name, enter from which number the numbering will start."
                                    placeholder="1"
                                    type={INPUT_TYPE.NUMERIC}
                                    maxValue={MAX_NUMERIC_INDICATOR_START}
                                    required
                                    value={numbering}
                                    setValue={setNumbering}
                                />
                            </div>

                            <div className="create__item">
                                <p className="create__item--title">Tokens price</p>

                                <p className="create__item--text">
                                    The price at which the tokens will be put up for sale. All
                                    tokens in the pack will have the same price.
                                </p>
                                <div className="createPack_priceItemContainer">
                                    <div className="createPack_priceItemContainer_priceInputWrapper">
                                        <input
                                            className={`input create__item--input createPack_priceItemContainer_priceInputWrapper_priceInput`}
                                            placeholder="0.01"
                                            value={tokenPrice}
                                            onChange={onPriceInputChange}
                                        />

                                        <div className="create__item--select--inner small">
                                            <select
                                                className="select create__item--select"
                                                onChange={onSelectTokenNameForPayment}
                                                disabled={!availablePaymentTokens.length}
                                            >
                                                {!availablePaymentTokens.length ? (
                                                    <option>Select collection</option>
                                                ) : (
                                                    availablePaymentTokens.map(t => (
                                                        <option key={t.id} value={t.id}>
                                                            {t.name}
                                                        </option>
                                                    ))
                                                )}
                                            </select>

                                            {!!availablePaymentTokens.length && (
                                                <img
                                                    src="/assets/img/arrow-select.png"
                                                    alt="arrow"
                                                    className="create__item--select--icon"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="create__item--select--prop half createPack_priceItemContainer_lastbuttonContainer">
                                        <button
                                            className={`button create__item--option ${
                                                isAuction ? 'active' : ''
                                            } createPack_priceItemContainer_button`}
                                            onClick={onAuctionClickHandler}
                                        >
                                            Auction
                                            {isAuction && (
                                                <img
                                                    src="/assets/img/check.svg"
                                                    alt="icon"
                                                    className="create__item--icon"
                                                />
                                            )}
                                        </button>
                                    </div>
                                    <div className="create__item--select--prop half createPack_priceItemContainer_lastbuttonContainer">
                                        <button
                                            className={`button create__item--option ${
                                                isNoPrice ? 'active' : ''
                                            } createPack_priceItemContainer_button
                                        `}
                                            onClick={onNoPriceClickHandler}
                                        >
                                            No price
                                            {isNoPrice && (
                                                <img
                                                    src="/assets/img/check.svg"
                                                    alt="icon"
                                                    className="create__item--icon"
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Input
                                title="Investor's royalty"
                                text="Enter the percentage that will be accrued to the first owner of the
                            token from the second and subsequent sales."
                                placeholder="4.5"
                                required
                                value={investorRoyalty}
                                setValue={setInvestorRoyalty}
                            />

                            <Input
                                title="Creator&rsquo;s royalty"
                                text="Enter the percentage that will be accrued to the team of token
                                creators from the first and subsequent sales."
                                placeholder="0.5"
                                required
                                value={creatorRoyalty}
                                setValue={setCreatorRoyalty}
                            />

                            <div className="create__item">
                                <p className="create__item--title">Creator royalty distribution:</p>
                                <RoyaltyDestribution
                                    royaltyDestribution={creatorRoyaltyDestribution}
                                    deleteDestributionItem={deleteCreatorDestributionItem}
                                    saveRoyaltyWalletHandler={saveCreatotRoyaltyWalletHandler}
                                />
                            </div>

                            <div className="create__item">
                                <p className="create__item--title">Income distribution</p>

                                <p className="create__item--text">
                                    Income is equal to the cost of selling the token minus
                                    royalties. Enter the percentage distribution of income from the
                                    sale of tokens.
                                </p>

                                <RoyaltyDestribution
                                    royaltyDestribution={incomeRoyaltyDestribution}
                                    deleteDestributionItem={deleteIncomeDestributionItem}
                                    saveRoyaltyWalletHandler={saveIncomeRoyaltyWalletHandler}
                                />
                            </div>

                            <div className="create__item">
                                <p className="create__item--title">External Link</p>

                                <p className="create__item--text">
                                    Item&rsquo;s page will include a link to this URL on this
                                    item&rsquo;s detail page, so that users can click to learn more
                                    about it. This link will be displayed on item&rsquo;s detail
                                    CheckBrand.com page:
                                </p>

                                <input
                                    type="text"
                                    className="input create__item--input"
                                    placeholder="https://OpenSea.io/collection/collectionname"
                                />
                            </div>

                            <div className="create__item">
                                <p className="create__item--text">
                                    This link will be displayed on item&rsquo;s detail OpenSea.io
                                    page:
                                </p>

                                <input
                                    type="text"
                                    className="input create__item--input"
                                    placeholder="https://CheckBrand.com/pagename"
                                />
                            </div>

                            <div className="create__item">
                                <p className="create__item--title">Description</p>

                                <p className="create__item--text">
                                    The description will be included on the item&rsquo;s detail page
                                    underneath its image.
                                </p>

                                <textarea
                                    type="text"
                                    className="input create__item--textarea"
                                    placeholder="Provide a detailed description of your item."
                                ></textarea>
                            </div>

                            <div className="create__item">
                                <p className="create__item--title">Collection</p>

                                <p className="create__item--text">
                                    This is the collection where your items Pack will appear.
                                </p>

                                {Boolean(collections && collections.collections) && (
                                    <div className="create__item--select--inner">
                                        <select
                                            className="select create__item--select"
                                            onChange={onCollectionIdChangeHandler}
                                        >
                                            {collections.collections.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className="create__item--select--icon"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="create__item">
                                <div className="create__item--checkbox--inner">
                                    <div className="create__item--checkbox--wrapper">
                                        <img
                                            src="/assets/img/menu2.svg"
                                            alt="prop"
                                            className="create__item--checkbox--wrapper--icon"
                                        />

                                        <div className="create__item--checkbox--text">
                                            <p className="create__item--checkbox--text--title">
                                                Properties
                                            </p>

                                            <p className="create__item--checkbox--text--text">
                                                Textual traits that show up as rectangles
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        className="button create__item--add"
                                        onClick={propertiesDialog.onShow}
                                    >
                                        <img
                                            src="/assets/img/plus.png"
                                            alt="add"
                                            className="create__item--add--icon"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="create__item">
                                <div className="create__item--checkbox--inner">
                                    <div className="create__item--checkbox--wrapper">
                                        <img
                                            src="/assets/img/star2.svg"
                                            alt="star"
                                            className="create__item--checkbox--wrapper--icon"
                                        />

                                        <div className="create__item--checkbox--text">
                                            <p className="create__item--checkbox--text--title">
                                                Levels
                                            </p>

                                            <p className="create__item--checkbox--text--text">
                                                Numerical traits that show as a progress bar
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        className="button create__item--add"
                                        onClick={levelsDialog.onShow}
                                    >
                                        <img
                                            src="/assets/img/plus.png"
                                            alt="add"
                                            className="create__item--add--icon"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="create__item">
                                <div className="create__item--checkbox--inner">
                                    <div className="create__item--checkbox--wrapper">
                                        <img
                                            src="/assets/img/stats.svg"
                                            alt="stat"
                                            className="create__item--checkbox--wrapper--icon"
                                        />

                                        <div className="create__item--checkbox--text">
                                            <p className="create__item--checkbox--text--title">
                                                Stats
                                            </p>

                                            <p className="create__item--checkbox--text--text">
                                                Numerical traits that just show as numbers
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        className="button create__item--add"
                                        onClick={statsDialog.onShow}
                                    >
                                        <img
                                            src="/assets/img/plus.png"
                                            alt="add"
                                            className="create__item--add--icon"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="create__item">
                                <div className="create__item--checkbox--inner">
                                    <div className="create__item--checkbox--wrapper">
                                        <img
                                            src="/assets/img/lock.png"
                                            alt="lock"
                                            className="create__item--checkbox--wrapper--icon"
                                        />

                                        <div className="create__item--checkbox--text">
                                            <p className="create__item--checkbox--text--title">
                                                Unlockable Content
                                            </p>

                                            <p className="create__item--checkbox--text--text">
                                                Include unlockable content that can only be revealed
                                                by the owner of the item.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="create__item--checkbox--box">
                                        <input
                                            type="checkbox"
                                            className="create__item--checkbox"
                                            id="lock"
                                            onClick={() => setUnlockable(p => !p)}
                                            value={unlockable}
                                        />

                                        <label
                                            htmlFor="lock"
                                            className="create__item--checkbox--label"
                                        ></label>
                                    </div>
                                </div>

                                <Input
                                    placeholder="Markdown syntax is supported. 0 of 1000 characters used."
                                    textarea
                                    value={unlockableContent}
                                    setValue={setUnlockableContent}
                                />
                            </div>
                            {/* Hidden properti does not exist in back request, so not implemented 22.11.2022 */}
                            <div className="create__item">
                                <div className="create__item--checkbox--inner">
                                    <div className="create__item--checkbox--wrapper">
                                        <img
                                            src="/assets/img/warn.png"
                                            alt="warn"
                                            className="create__item--checkbox--wrapper--icon"
                                        />

                                        <div className="create__item--checkbox--text">
                                            <p className="create__item--checkbox--text--title">
                                                Hidden Content
                                            </p>

                                            <p className="create__item--checkbox--text--text">
                                                Upload a cover that will be displayed on all tokens
                                                in the pack until you disable this feature.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="create__item--checkbox--box">
                                        <input
                                            type="checkbox"
                                            className="create__item--checkbox"
                                            id="hidden"
                                        />

                                        <label
                                            htmlFor="hidden"
                                            className="create__item--checkbox--label"
                                        ></label>
                                    </div>
                                </div>

                                <label
                                    htmlFor="createaccountBanner"
                                    className="create__item--label cover"
                                >
                                    <img
                                        src="/assets/img/img.png"
                                        alt="img"
                                        className="create__item--label--img"
                                    />
                                </label>
                            </div>
                            <div className="create__item">
                                <p className="create__item--title">Blockchain</p>

                                <div className="create__item--select--inner">
                                    {selectedBlockchain ? (
                                        <select className="select create__item--select" disabled>
                                            <option>{selectedBlockchain.name}</option>
                                        </select>
                                    ) : (
                                        <select className="select create__item--select" disabled>
                                            <option>Select collection</option>
                                        </select>
                                    )}
                                </div>
                            </div>

                            <div className="create__item">
                                <div className="create__item--checkbox--inner">
                                    <div className="create__item--checkbox--wrapper">
                                        <div className="create__item--checkbox--text">
                                            <p className="create__item--checkbox--text--title">
                                                Freeze metadata
                                            </p>

                                            <p className="create__item--checkbox--text--text">
                                                Freeze your metadata will allow you to permanently
                                                lock and store all of this item&rsquo;s content in
                                                decentralized file storage.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="create__item--checkbox--box">
                                        <input
                                            type="checkbox"
                                            className="create__item--checkbox"
                                            id="freze"
                                        />

                                        <label
                                            htmlFor="freze"
                                            className="create__item--checkbox--label"
                                        ></label>
                                    </div>
                                </div>

                                <button className="button create__item--def--button">Freeze</button>
                            </div>
                        </div>

                        <div className="create__button--content">
                            <div className="create__button--wrapper">
                                <button className="button create__button default__hover">
                                    Upload on site
                                </button>

                                <button className="button create__button filled">
                                    Upload in Blockchane
                                </button>

                                <button className="button create__button default__hover delete">
                                    Delete Pack
                                </button>
                            </div>

                            <div className="create__button--wrapper">
                                <button className="button create__button default__hover">
                                    Submit changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PropertiesDialog
                open={propertiesDialog.visible}
                onClose={propertiesDialog.onClose}
                properties={properties}
                setPropertiesHandler={setPropertiesHandler}
            />
            <LevelsDialog
                open={levelsDialog.visible}
                onClose={levelsDialog.onClose}
                levels={levels}
                setLevelsHandler={setLevelsHandler}
            />
            <StatsDialog
                open={statsDialog.visible}
                onClose={statsDialog.onClose}
                stats={stats}
                setLevelsHandler={setStatsHandler}
            />
        </>
    );
};

export default CreatePack;
