import React, { useState, useMemo, useCallback, useContext, useRef, useEffect } from 'react';
import Input, { INPUT_TYPE } from '../Input';
import RoyaltyDestribution from '../RoyaltyDestribution';
import LevelsDialog from '../../components/LevelsDialog';
import PropertiesDialog from '../../components/PropertiesDialog';
import StatsDialog from '../../components/StatsDialog';
import { useDialog } from '../../hooks/useDialog';
import {
    useGetBlockchainsQuery,
    useGetCollectionsQuery,
    useGetCurrencyTokensQuery,
} from '../../redux/api/dataService';
import CenteredContainer from '../CenteredContainer';
import Loader from '../Loader';
import { CustomSelect } from '../CustomSelect';

import css from './TokenCommonFieldsForm.module.css';

const MAX_NUMERIC_INDICATOR_START = 1000;

const TokenCommonFieldsForm = (props) => {
    const {
        tokenCommonName,
        setTokenCommonName,
        numbering,
        setNumbering,
        tokenPrice,
        setTokenPrice,
        tokenIdForPayment,
        setTokenIdForPayment,
        investorRoyalty,
        setInvestorRoyalty,
        creatorRoyalty,
        setCreatorRoyalty,
        isTokenNameEqualFileName,
        setIsTokenNameEqualFileName,
        isAuction,
        setIsAuction,
        isNoPrice,
        setIsNoPrice,
        properties,
        setProperties,
        description,
        setDescriprion,
        levels,
        setLevels,
        stats,
        setStats,
        opensea,
        setOpensea,
        checkbrandcom,
        setCheckbrandcom,
        creatorRoyaltyDestribution,
        setCreatorRoyaltyDestribution,
        incomeRoyaltyDestribution,
        setIncomeRoyaltyDestribution,
        collectionId,
        setCollectionId,
        unlockable,
        setUnlockable,
        unlockableContent,
        setUnlockableContent,
        isTokenUploadStarted,
        withoutNumbering = false,
    } = props;

    const { data: blockchains, isLoading: isBlockchainsLoading } = useGetBlockchainsQuery();
    const { data: collections, isLoading: isCollectionsLoading } = useGetCollectionsQuery({
        page: 1,
        pageSize: 1000,
    });

    const propertiesDialog = useDialog();
    const levelsDialog = useDialog();
    const statsDialog = useDialog();

    const selectedCollection = useMemo(() => {
        if (!collectionId || !collections || !collections.results) {
            return null;
        }

        return collections.results.find((c) => c.id === collectionId);
    }, [collections, collectionId]);

    const selectedBlockchain = useMemo(() => {
        if (!selectedCollection || !blockchains) {
            return null;
        }

        return blockchains.find((b) => b.id === selectedCollection.blockchain.id);
    }, [selectedCollection, blockchains]);

    const { data: availablePaymentTokens } = useGetCurrencyTokensQuery(
        { blockchainId: selectedBlockchain ? selectedBlockchain.id : '' },
        { skip: !selectedBlockchain || !selectedBlockchain.id, pollingInterval: 300 },
    );

    const onMakeTokenNameEqualToFileNameHandler = useCallback(() => {
        setIsTokenNameEqualFileName((p) => !p);
    }, []);

    const onSelectTokenNameForPayment = useCallback((value) => {
        setTokenIdForPayment(value);
    }, []);

    const onAuctionClickHandler = useCallback(() => {
        setIsAuction((p) => {
            if (!p) {
                setIsNoPrice(false);
            }
            return !p;
        });
    }, []);

    const onNoPriceClickHandler = useCallback(() => {
        setIsNoPrice((p) => {
            if (!p) {
                setIsAuction(false);
            }
            return !p;
        });
    }, []);

    const onPriceInputChange = useCallback((e) => {
        setTokenPrice(e.target.value);
    }, []);

    // CREATOR ROYALTY
    const saveCreatotRoyaltyWalletHandler = useCallback((creatorRoyaltyInput) => {
        setCreatorRoyaltyDestribution((p) => [...p, creatorRoyaltyInput]);
    }, []);

    const deleteCreatorDestributionItem = useCallback((id) => {
        setCreatorRoyaltyDestribution((p) => p.filter((el) => el.id !== id));
    }, []);

    // INCOME ROYALTY
    const saveIncomeRoyaltyWalletHandler = useCallback((incomeRoylaty) => {
        setIncomeRoyaltyDestribution((p) => [...p, incomeRoylaty]);
    }, []);

    const deleteIncomeDestributionItem = useCallback((id) => {
        setIncomeRoyaltyDestribution((p) => p.filter((el) => el.id !== id));
    }, []);

    const onCollectionIdChangeHandler = useCallback((value) => {
        setCollectionId(value);
    }, []);

    const setPropertiesHandler = useCallback((propertiesA) => {
        setProperties(propertiesA);
    }, []);

    const setLevelsHandler = useCallback((levelsA) => {
        setLevels(levelsA);
    }, []);

    const setStatsHandler = useCallback((statsA) => {
        setStats(statsA);
    }, []);

    if (isBlockchainsLoading || isCollectionsLoading) {
        return (
            <div className={css.loadingContainer}>
                <CenteredContainer>
                    <Loader />
                </CenteredContainer>
            </div>
        );
    }

    return (
        <>
            <div className="create__item">
                <p className="create__item--title">Collection</p>

                <p className="create__item--text">
                    This is the collection where your items Pack will appear.
                </p>

                {Boolean(collections && collections.results) && (
                    <div className="create__item--select--inner">
                        <CustomSelect
                            optionsList={collections.results.map((c) => ({
                                value: c.id,
                                name: c.name,
                            }))}
                            disabled={isTokenUploadStarted}
                            value={collectionId}
                            placeholder="Select Collection"
                            onChange={onCollectionIdChangeHandler}
                        />
                    </div>
                )}
            </div>
            <div className={`create__item ${withoutNumbering ? '' : 'half'}`}>
                <Input
                    title="Token name"
                    text="Choose a “common name” so that all tokens have the same name."
                    placeholder="Enter common name"
                    required
                    disabled={isTokenUploadStarted}
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

            {!withoutNumbering && (
                <div className="create__item half">
                    <Input
                        title="Numbering"
                        text=" When choosing a common name, enter from which number the numbering will start."
                        placeholder="1"
                        type={INPUT_TYPE.NUMERIC}
                        maxValue={MAX_NUMERIC_INDICATOR_START}
                        required
                        disabled={isTokenUploadStarted}
                        value={numbering}
                        setValue={setNumbering}
                    />
                </div>
            )}

            <div className="create__item">
                <p className="create__item--title">Tokens price</p>

                <p className="create__item--text">
                    The price at which the tokens will be put up for sale. All tokens in the pack
                    will have the same price.
                </p>
                <div className="createPack_priceItemContainer">
                    <div className="createPack_priceItemContainer_priceInputWrapper createPack_priceItemContainer_wrapper">
                        <input
                            className={`input create__item--input createPack_priceItemContainer_priceInputWrapper_priceInput`}
                            placeholder="0.01"
                            value={tokenPrice}
                            onChange={onPriceInputChange}
                        />

                        <div className="create__item--select--inner small createPack_priceItemContainer_priceInputWrapper_select_currency">
                            {!availablePaymentTokens || !availablePaymentTokens.length ? (
                                <select className="select create__item--select" disabled>
                                    <option>Select collection</option>
                                </select>
                            ) : (
                                <CustomSelect
                                    optionsList={availablePaymentTokens.map((c) => ({
                                        value: c.id,
                                        name: c.name,
                                    }))}
                                    disabled={isTokenUploadStarted}
                                    value={tokenIdForPayment}
                                    placeholder="Select Collection"
                                    onChange={onSelectTokenNameForPayment}
                                />
                            )}
                        </div>
                    </div>
                    <div className="create__item--select--prop half createPack_priceItemContainer_lastbuttonContainer createPack_priceItemContainer_wrapper">
                        <button
                            className={`button create__item--option ${
                                isAuction ? 'active' : ''
                            } createPack_priceItemContainer_button`}
                            onClick={onAuctionClickHandler}
                            disabled={isTokenUploadStarted}
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
                    <div className="create__item--select--prop half createPack_priceItemContainer_lastbuttonContainer createPack_priceItemContainer_wrapper">
                        <button
                            className={`button create__item--option ${
                                isNoPrice ? 'active' : ''
                            } createPack_priceItemContainer_button
                                        `}
                            disabled={isTokenUploadStarted}
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
                disabled={isTokenUploadStarted}
                required
                value={investorRoyalty}
                setValue={setInvestorRoyalty}
            />

            <Input
                title="Creator&rsquo;s royalty"
                text="Enter the percentage that will be accrued to the team of token
                                creators from the first and subsequent sales."
                placeholder="0.5"
                disabled={isTokenUploadStarted}
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
                    Income is equal to the cost of selling the token minus royalties. Enter the
                    percentage distribution of income from the sale of tokens.
                </p>

                <RoyaltyDestribution
                    royaltyDestribution={incomeRoyaltyDestribution}
                    deleteDestributionItem={deleteIncomeDestributionItem}
                    saveRoyaltyWalletHandler={saveIncomeRoyaltyWalletHandler}
                />
            </div>
            <Input
                title="External Link"
                text="Item&rsquo;s page will include a link to this URL on this
                                item&rsquo;s detail page, so that users can click to learn more
                                about it. This link will be displayed on item&rsquo;s detail
                                CheckBrand.com page:"
                placeholder="https://OpenSea.io/collection/collectionname"
                value={opensea}
                disabled={isTokenUploadStarted}
                setValue={setOpensea}
            />
            <Input
                text="This link will be displayed on item&rsquo;s detail OpenSea.io page:"
                placeholder="https://checkbrand.com/collection/custom URL"
                value={checkbrandcom}
                disabled={isTokenUploadStarted}
                setValue={setCheckbrandcom}
            />
            <Input
                title="Description"
                text="The description will be included on the item&rsquo;s detail page underneath its image."
                placeholder="Provide a detailed description of your item."
                textarea
                required
                value={description}
                disabled={isTokenUploadStarted}
                setValue={setDescriprion}
            />
            <div className="create__item">
                <div className="create__item--checkbox--inner">
                    <div className="create__item--checkbox--wrapper">
                        <img
                            src="/assets/img/menu2.svg"
                            alt="prop"
                            className="create__item--checkbox--wrapper--icon"
                        />

                        <div className="create__item--checkbox--text">
                            <p className="create__item--checkbox--text--title">Properties</p>

                            <p className="create__item--checkbox--text--text">
                                Textual traits that show up as rectangles
                            </p>
                        </div>
                    </div>

                    <button
                        className="button create__item--add"
                        onClick={propertiesDialog.onShow}
                        disabled={isTokenUploadStarted}
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
                            <p className="create__item--checkbox--text--title">Levels</p>

                            <p className="create__item--checkbox--text--text">
                                Numerical traits that show as a progress bar
                            </p>
                        </div>
                    </div>

                    <button
                        className="button create__item--add"
                        onClick={levelsDialog.onShow}
                        disabled={isTokenUploadStarted}
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
                            <p className="create__item--checkbox--text--title">Stats</p>

                            <p className="create__item--checkbox--text--text">
                                Numerical traits that just show as numbers
                            </p>
                        </div>
                    </div>

                    <button
                        className="button create__item--add"
                        onClick={statsDialog.onShow}
                        disabled={isTokenUploadStarted}
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
                                Include unlockable content that can only be revealed by the owner of
                                the item.
                            </p>
                        </div>
                    </div>

                    <div className="create__item--checkbox--box">
                        <input
                            type="checkbox"
                            className="create__item--checkbox"
                            id="lock"
                            onClick={() => setUnlockable((p) => !p)}
                            disabled={isTokenUploadStarted}
                            value={unlockable}
                        />

                        <label htmlFor="lock" className="create__item--checkbox--label"></label>
                    </div>
                </div>

                <Input
                    placeholder="Markdown syntax is supported. 0 of 1000 characters used."
                    textarea
                    value={unlockableContent}
                    disabled={isTokenUploadStarted}
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
                            <p className="create__item--checkbox--text--title">Hidden Content</p>

                            <p className="create__item--checkbox--text--text">
                                Upload a cover that will be displayed on all tokens in the pack
                                until you disable this feature.
                            </p>
                        </div>
                    </div>

                    <div className="create__item--checkbox--box">
                        <input type="checkbox" className="create__item--checkbox" id="hidden" />

                        <label htmlFor="hidden" className="create__item--checkbox--label"></label>
                    </div>
                </div>

                <label htmlFor="createaccountBanner" className="create__item--label cover">
                    <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
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
                            <p className="create__item--checkbox--text--title">Freeze metadata</p>

                            <p className="create__item--checkbox--text--text">
                                Freeze your metadata will allow you to permanently lock and store
                                all of this item&rsquo;s content in decentralized file storage.
                            </p>
                        </div>
                    </div>

                    <div className="create__item--checkbox--box">
                        <input type="checkbox" className="create__item--checkbox" id="freze" />

                        <label htmlFor="freze" className="create__item--checkbox--label"></label>
                    </div>
                </div>

                <button className="button create__item--def--button">Freeze</button>
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

export default React.memo(TokenCommonFieldsForm);
