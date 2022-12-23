import React, { useState, useMemo, useCallback, useContext } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { NotificationContext } from '../../context/NotificationContext';
import { CustomSelect } from '../../common/CustomSelect';
import CenteredContainer from '../../common/CenteredContainer';
import Loader from '../../common/Loader';
import { TokenCommonFieldsForm } from '../../common/TokenCommonFieldsForm';
import { useGetPacksQuery } from '../../redux/api/dataService';
import UploadManyTokensForm from '../../common/UploadManyTokensForm/UploadManyTokensForm';

import './index.css';

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

const CreateItem = () => {
    const { data: packs, isLoading: isPacksLoading } = useGetPacksQuery({
        page: 1,
        pageSize: 1000,
    });

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const [packId, setPackId] = useState('');
    const [tokenCommonName, setTokenCommonName] = useState('Common name');
    const [numbering, setNumbering] = useState('1');
    const [tokenPrice, setTokenPrice] = useState(0.1);
    const [tokenIdForPayment, setTokenIdForPayment] = useState('');
    const [investorRoyalty, setInvestorRoyalty] = useState(0.5);
    const [creatorRoyalty, setCreatorRoyalty] = useState(0.5);
    const [isTokenNameEqualFileName, setIsTokenNameEqualFileName] = useState(false);
    const [isAuction, setIsAuction] = useState(false);
    const [isNoPrice, setIsNoPrice] = useState(false);
    const [properties, setProperties] = useState([]);
    const [description, setDescriprion] = useState('');
    const [levels, setLevels] = useState([]);
    const [stats, setStats] = useState([]);
    const [opensea, setOpensea] = useState('');
    const [checkbrandcom, setCheckbrandcom] = useState('');
    const [creatorRoyaltyDestribution, setCreatorRoyaltyDestribution] = useState([]);
    const [incomeRoyaltyDestribution, setIncomeRoyaltyDestribution] = useState([]);
    const [collectionId, setCollectionId] = useState('');
    const [unlockable, setUnlockable] = useState(false);
    const [unlockableContent, setUnlockableContent] = useState('');

    const [isTokenUploadStarted, setIsTokenUploadStarted] = useState(false);

    const isAbleToUpload = useMemo(() => packId && !isTokenUploadStarted, [
        packId,
        isTokenUploadStarted,
    ]);

    const tokensDataToUpload = useMemo(() => {
        let status_price = 'price';

        if (isAuction) {
            status_price = 'auction';
        }

        if (isNoPrice) {
            status_price = 'no_price';
        }

        return {
            pack: packId,
            currency_token: tokenIdForPayment,
            investor_royalty: investorRoyalty,
            creator_royalty: creatorRoyalty,
            status_price,
            investor_royalty: Number(investorRoyalty),
            creator_royalty: Number(creatorRoyalty),
            description,
            unlockable: unlockable,
            unlockable_content: unlockableContent,
            income_distribution: incomeRoyaltyDestribution.map((el) => ({
                wallet: el.wallet,
                percent: Number(el.percentage),
            })),
            creator_royalty_distribution: creatorRoyaltyDestribution.map((el) => ({
                wallet: el.wallet,
                percent: Number(el.percentage),
            })),
            opensea: opensea,
            checkbrandcom: checkbrandcom,
            properties: properties.map((p) => {
                return {
                    name: p.name,
                    type: p.type,
                };
            }),
        };
    }, [
        isAuction,
        isNoPrice,
        packId,
        tokenIdForPayment,
        investorRoyalty,
        creatorRoyalty,
        description,
        unlockable,
        unlockableContent,
        incomeRoyaltyDestribution,
        creatorRoyaltyDestribution,
        opensea,
        checkbrandcom,
        properties,
    ]);

    const onPackIdChangeHandler = useCallback((value) => {
        setPackId(value);
    }, []);

    if (isPacksLoading) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    }

    return (
        <>
            <div className="default__padding createpage">
                <div className="container">
                    <div className="createpage__inner">
                        <h2 className="title left">Create Item</h2>

                        <p className="text left">Item upload interface</p>

                        <div className="create__content">
                            <div className="create__item half">
                                <p className="create__item--title required">Pack</p>

                                <p className="create__item--text">
                                    This is the Pack where your item will appear.
                                </p>

                                {Boolean(packs && packs.results) && (
                                    <div className="create__item--select--inner">
                                        <CustomSelect
                                            optionsList={packs.results.map((c) => ({
                                                value: c.id,
                                                name: c.name,
                                            }))}
                                            disabled={isTokenUploadStarted}
                                            value={packId}
                                            placeholder="Select Pack"
                                            onChange={onPackIdChangeHandler}
                                        />
                                    </div>
                                )}
                            </div>
                            <UploadManyTokensForm
                                numbering={numbering}
                                tokenCommonName={tokenCommonName}
                                tokenPrice={tokenPrice}
                                investorRoyalty={investorRoyalty}
                                creatorRoyalty={creatorRoyalty}
                                isTokenNameEqualFileName={isTokenNameEqualFileName}
                                setIsTokenUploadStarted={setIsTokenUploadStarted}
                                isAbleToUpload={isAbleToUpload}
                                tokensDataToUpload={tokensDataToUpload}
                                isTokenUploadStarted={isTokenUploadStarted}
                            />
                        </div>

                        <TokenCommonFieldsForm
                            isTokenUploadStarted={isTokenUploadStarted}
                            tokenCommonName={tokenCommonName}
                            setTokenCommonName={setTokenCommonName}
                            numbering={numbering}
                            setNumbering={setNumbering}
                            tokenPrice={tokenPrice}
                            setTokenPrice={setTokenPrice}
                            tokenIdForPayment={tokenIdForPayment}
                            setTokenIdForPayment={setTokenIdForPayment}
                            investorRoyalty={investorRoyalty}
                            setInvestorRoyalty={setInvestorRoyalty}
                            creatorRoyalty={creatorRoyalty}
                            setCreatorRoyalty={setCreatorRoyalty}
                            isTokenNameEqualFileName={isTokenNameEqualFileName}
                            setIsTokenNameEqualFileName={setIsTokenNameEqualFileName}
                            isAuction={isAuction}
                            setIsAuction={setIsAuction}
                            isNoPrice={isNoPrice}
                            setIsNoPrice={setIsNoPrice}
                            properties={properties}
                            setProperties={setProperties}
                            description={description}
                            setDescriprion={setDescriprion}
                            levels={levels}
                            setLevels={setLevels}
                            stats={stats}
                            setStats={setStats}
                            opensea={opensea}
                            setOpensea={setOpensea}
                            checkbrandcom={checkbrandcom}
                            setCheckbrandcom={setCheckbrandcom}
                            creatorRoyaltyDestribution={creatorRoyaltyDestribution}
                            setCreatorRoyaltyDestribution={setCreatorRoyaltyDestribution}
                            incomeRoyaltyDestribution={incomeRoyaltyDestribution}
                            setIncomeRoyaltyDestribution={setIncomeRoyaltyDestribution}
                            collectionId={collectionId}
                            setCollectionId={setCollectionId}
                            unlockable={unlockable}
                            setUnlockable={setUnlockable}
                            unlockableContent={unlockableContent}
                            setUnlockableContent={setUnlockableContent}
                        />

                        <div className="create__button--content">
                            <div className="create__button--wrapper">
                                {/* <button
                                    className="button create__button default__hover"
                                    onClick={onSavePackHandler}
                                    disabled={createPackState.isProcessing}
                                >
                                    Upload on site
                                </button> */}

                                {/* <button className="button create__button filled">
                                    Upload in Blockchane
                                </button>

                                <button className="button create__button default__hover delete">
                                    Delete Pack
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
        </>
    );
};

export default CreateItem;
