import _, { uniqueId } from 'lodash';
import React, { useState, useMemo, useCallback } from 'react';
import FileDropzone from '../../common/FileDropzone';
import Input, { INPUT_TYPE } from '../../common/Input';
import { ONLY_NUMBERS_REGEX_ONLY_G } from '../../const /regExp';
import { useFileDropzone } from '../../hooks/useFileDropzone';
import { generateNumericIndicator } from '../../utils/generateNumericIndicator';
import { getFileNameAndExt } from '../../utils/getFilenameAndExt';

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

const ROYALTY_DESTRIBIUTION = {
    percentage: '',
    wallet: '',
};

const CreatePack = () => {
    const [name, setName] = useState('');
    const [tokenCommonName, setTokenCommonName] = useState('Common name');
    const [numbering, setNumbering] = useState('1');
    const [tokenPrice, setTokenPrice] = useState('');
    const [investorRoyalty, setInvestorRoyalty] = useState('');
    const [creatorRoyalty, setCreatorRoyalty] = useState('');
    const [isTokenNameEqualFileName, setIsTokenNameEqualFileName] = useState(false);
    const [isAuction, setIsAuction] = useState(false);
    const [isNoPrice, setIsNoPrice] = useState(false);
    const [creatorRoyaltyDestribution, setCreatorRoyaltyDestribution] = useState([]);
    const [creatorRoyaltyInput, setCreatorRoyaltyInput] = useState(null);
    const [incomeRoyaltyDestribution, setIncomeRoyaltyDestribution] = useState([]);
    const [incomeRoyaltyInput, setIncomeRoyaltyInput] = useState(null);

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

    const onCreatorRoyaltyInputPercentageChange = useCallback(
        e => {
            if (creatorRoyaltyInput) {
                const value = e.currentTarget.value.match(ONLY_NUMBERS_REGEX_ONLY_G);

                const valueStr = value && value.join('');

                if (Number(valueStr) <= ONE_HUNDRED) {
                    setCreatorRoyaltyInput(p => ({
                        ...p,
                        percentage: valueStr,
                    }));
                }
            }
        },
        [creatorRoyaltyInput],
    );

    const onCreatorRoyaltyInputWalletChange = useCallback(
        e => {
            if (creatorRoyaltyInput) {
                setCreatorRoyaltyInput(p => ({
                    ...p,
                    wallet: e.target.value,
                }));
            }
        },
        [creatorRoyaltyInput],
    );

    const addCreatorRoyaltyWallet = useCallback(() => {
        if (!creatorRoyaltyInput) {
            setCreatorRoyaltyInput(ROYALTY_DESTRIBIUTION);
        }
    }, [creatorRoyaltyInput]);

    const saveRoyaltyWalletHandler = useCallback(() => {
        const sumRoyaltyPerc = creatorRoyaltyDestribution.reduce(
            (a, c) => a + Number(c.percentage),
            0,
        );
        if (
            creatorRoyaltyInput &&
            creatorRoyaltyInput.percentage &&
            creatorRoyaltyInput.wallet &&
            sumRoyaltyPerc + Number(creatorRoyaltyInput.percentage) <= ONE_HUNDRED
        ) {
            setCreatorRoyaltyDestribution(p => [
                ...p,
                { id: _.uniqueId('creatorRoyalty_'), ...creatorRoyaltyInput },
            ]);

            setCreatorRoyaltyInput(null);
        }
    }, [creatorRoyaltyInput, creatorRoyaltyDestribution]);

    const deleteCreatorDestributionItem = useCallback(id => {
        setCreatorRoyaltyDestribution(p => p.filter(el => el.id !== id));
    }, []);

    // INCOME

    const onIncomeRoyaltyInputPercentageChange = useCallback(
        e => {
            if (incomeRoyaltyInput) {
                const value = e.currentTarget.value.match(ONLY_NUMBERS_REGEX_ONLY_G);

                const valueStr = value && value.join('');

                if (Number(valueStr) <= ONE_HUNDRED) {
                    setIncomeRoyaltyInput(p => ({
                        ...p,
                        percentage: valueStr,
                    }));
                }
            }
        },
        [incomeRoyaltyInput],
    );

    const onIncomeRoyaltyInputWalletChange = useCallback(
        e => {
            if (incomeRoyaltyInput) {
                setIncomeRoyaltyInput(p => ({
                    ...p,
                    wallet: e.target.value,
                }));
            }
        },
        [incomeRoyaltyInput],
    );

    const addIncomeRoyaltyWallet = useCallback(() => {
        if (!incomeRoyaltyInput) {
            setIncomeRoyaltyInput(ROYALTY_DESTRIBIUTION);
        }
    }, [incomeRoyaltyInput]);

    const saveIncomeRoyaltyWalletHandler = useCallback(() => {
        const sumRoyaltyPerc = incomeRoyaltyDestribution.reduce(
            (a, c) => a + Number(c.percentage),
            0,
        );
        if (
            incomeRoyaltyInput &&
            incomeRoyaltyInput.percentage &&
            incomeRoyaltyInput.wallet &&
            sumRoyaltyPerc + Number(incomeRoyaltyInput.percentage) <= ONE_HUNDRED
        ) {
            setIncomeRoyaltyDestribution(p => [
                ...p,
                { id: _.uniqueId('incomeRoyalty_'), ...incomeRoyaltyInput },
            ]);

            setIncomeRoyaltyInput(null);
        }
    }, [incomeRoyaltyInput, incomeRoyaltyDestribution]);

    const deleteIncomeDestributionItem = useCallback(id => {
        setIncomeRoyaltyDestribution(p => p.filter(el => el.id !== id));
    }, []);

    return (
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
                                File types supported: JPG, PNG, GIF, SVG, Mp4, WEBM, MP3, WAV, OGG,
                                GLB, GLTF. Max 1000 files. Files are sorted by file name.
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
                                provide an images (PNG, JPG, or GIF) for the card display of your
                                item. Files are sorted by file name.
                            </p>

                            <FileDropzone
                                multiple
                                availableFormats={['image/png', 'image/gif', 'image/jpeg']}
                                values={tokenPreviewValues}
                                onAdd={onAddTokenPreview}
                                id="createpackPreview"
                                onDelete={onDeleteTokenPreview}
                            />

                            <label htmlFor="createpackPreview" className="create__item--label img">
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
                                Collection name, Properties, Blockchain, etc.). But you can change
                                the price of tokens in the table.
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
                                Token name = filename.ext - token name copies the token filename.
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
                                The price at which the tokens will be put up for sale. All tokens in
                                the pack will have the same price.
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
                                        >
                                            <option>Eth</option>
                                            <option>Btc</option>
                                            <option>Eur</option>
                                            <option>Usd</option>
                                        </select>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className="create__item--select--icon"
                                        />
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

                        <div className="create__item">
                            <Input
                                title="Investor's royalty"
                                text="Enter the percentage that will be accrued to the first owner of the
                            token from the second and subsequent sales."
                                placeholder="4.5"
                                required
                                value={investorRoyalty}
                                setValue={setInvestorRoyalty}
                            />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">Creator&rsquo;s royalty</p>

                            <p className="create__item--text">
                                Enter the percentage that will be accrued to the team of token
                                creators from the first and subsequent sales.
                            </p>

                            <input
                                type="text"
                                className="input create__item--input"
                                placeholder="0.5"
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
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">Creator royalty distribution:</p>

                            {Boolean(
                                creatorRoyaltyDestribution && creatorRoyaltyDestribution.length,
                            ) &&
                                creatorRoyaltyDestribution.map(wallet => (
                                    <div className="control__item" key={wallet.id}>
                                        <input
                                            type="text"
                                            className="input control__input control__input--mini"
                                            disabled
                                            value={wallet.percentage}
                                        />

                                        <input
                                            type="text"
                                            className="input control__input"
                                            value={wallet.wallet}
                                            disabled
                                        />

                                        <button className="button control__item--settings default__hover">
                                            <img
                                                src="/assets/img/settings-white.svg"
                                                alt="settings"
                                                className="control__item--settings--icon"
                                            />
                                        </button>

                                        <button
                                            className="button control__item--confirm default__hover delete"
                                            onClick={() => deleteCreatorDestributionItem(wallet.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            {creatorRoyaltyInput && (
                                <div className="control__item">
                                    <input
                                        type="text"
                                        className="input control__input control__input--mini"
                                        value={creatorRoyaltyInput.percentage}
                                        onChange={onCreatorRoyaltyInputPercentageChange}
                                    />

                                    <input
                                        type="text"
                                        className="input control__input"
                                        placeholder="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF"
                                        value={creatorRoyaltyInput.wallet}
                                        onChange={onCreatorRoyaltyInputWalletChange}
                                    />

                                    <button className="button control__item--settings default__hover">
                                        <img
                                            src="/assets/img/settings-white.svg"
                                            alt="settings"
                                            className="control__item--settings--icon"
                                        />
                                    </button>

                                    <button
                                        className="button control__item--confirm default__hover save"
                                        onClick={saveRoyaltyWalletHandler}
                                    >
                                        Save
                                    </button>
                                </div>
                            )}

                            <button
                                className="button control__add default__hover"
                                onClick={addCreatorRoyaltyWallet}
                            >
                                + Add Wallet address
                            </button>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">Income distribution</p>

                            <p className="create__item--text">
                                Income is equal to the cost of selling the token minus royalties.
                                Enter the percentage distribution of income from the sale of tokens.
                            </p>

                            {Boolean(
                                incomeRoyaltyDestribution && incomeRoyaltyDestribution.length,
                            ) &&
                                incomeRoyaltyDestribution.map(wallet => (
                                    <div className="control__item" key={wallet.id}>
                                        <input
                                            type="text"
                                            className="input control__input control__input--mini"
                                            disabled
                                            value={wallet.percentage}
                                        />

                                        <input
                                            type="text"
                                            className="input control__input"
                                            value={wallet.wallet}
                                            disabled
                                        />

                                        <button className="button control__item--settings default__hover">
                                            <img
                                                src="/assets/img/settings-white.svg"
                                                alt="settings"
                                                className="control__item--settings--icon"
                                            />
                                        </button>

                                        <button
                                            className="button control__item--confirm default__hover delete"
                                            onClick={() => deleteIncomeDestributionItem(wallet.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            {incomeRoyaltyInput && (
                                <div className="control__item">
                                    <input
                                        type="text"
                                        className="input control__input control__input--mini"
                                        value={incomeRoyaltyInput.percentage}
                                        onChange={onIncomeRoyaltyInputPercentageChange}
                                    />

                                    <input
                                        type="text"
                                        className="input control__input"
                                        placeholder="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF"
                                        value={incomeRoyaltyInput.wallet}
                                        onChange={onIncomeRoyaltyInputWalletChange}
                                    />

                                    <button className="button control__item--settings default__hover">
                                        <img
                                            src="/assets/img/settings-white.svg"
                                            alt="settings"
                                            className="control__item--settings--icon"
                                        />
                                    </button>

                                    <button
                                        className="button control__item--confirm default__hover save"
                                        onClick={saveIncomeRoyaltyWalletHandler}
                                    >
                                        Save
                                    </button>
                                </div>
                            )}

                            <button
                                className="button control__add default__hover"
                                onClick={addIncomeRoyaltyWallet}
                            >
                                + Add Wallet address
                            </button>
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
                                This link will be displayed on item&rsquo;s detail OpenSea.io page:
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

                            <div className="create__item--select--inner">
                                <select className="select create__item--select">
                                    <option>Collection name</option>
                                    <option>Collection name 2</option>
                                    <option>Collection name 3</option>
                                    <option>Collection name 4</option>
                                    <option>Collection name 5</option>
                                </select>

                                <img
                                    src="/assets/img/arrow-select.png"
                                    alt="arrow"
                                    className="create__item--select--icon"
                                />
                            </div>
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

                                <button className="button create__item--add">
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

                                <button className="button create__item--add">
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
                                        <p className="create__item--checkbox--text--title">Stats</p>

                                        <p className="create__item--checkbox--text--text">
                                            Numerical traits that just show as numbers
                                        </p>
                                    </div>
                                </div>

                                <button className="button create__item--add">
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
                                            Include unlockable content that can only be revealed by
                                            the owner of the item.
                                        </p>
                                    </div>
                                </div>

                                <div className="create__item--checkbox--box">
                                    <input
                                        type="checkbox"
                                        className="create__item--checkbox"
                                        id="lock"
                                    />

                                    <label
                                        htmlFor="lock"
                                        className="create__item--checkbox--label"
                                    ></label>
                                </div>
                            </div>

                            <textarea
                                type="text"
                                className="input create__item--textarea"
                                placeholder="Enter content (access key, code to redeem, link to a file, etc.)"
                            ></textarea>
                        </div>

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
                                            Upload a cover that will be displayed on all tokens in
                                            the pack until you disable this feature.
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
                                <select className="select create__item--select">
                                    <option>Ethereum</option>
                                    <option>Ethereum 2</option>
                                    <option>Ethereum 3</option>
                                    <option>Ethereum 4</option>
                                    <option>Ethereum 5</option>
                                </select>

                                <img
                                    src="/assets/img/arrow-select.png"
                                    alt="arrow"
                                    className="create__item--select--icon"
                                />
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
                                            Freeze your metadata will allow you to permanently lock
                                            and store all of this item&rsquo;s content in
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
    );
};

export default CreatePack;
