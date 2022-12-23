import React, { useState, useMemo, useCallback, useContext } from 'react';
import _ from 'lodash';
import { useEffect } from 'react';
import Input from '../../common/Input';
import { NotificationContext } from '../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { useCreatePackMutation, useGetCollectionsQuery } from '../../redux/api/dataService';
import { normilizeError } from '../../utils/http/normilizeError';
import CenteredContainer from '../../common/CenteredContainer';
import Loader from '../../common/Loader';

import './index.css';
import UploadManyTokensForm from '../../common/UploadManyTokensForm/UploadManyTokensForm';
import { TokenCommonFieldsForm } from '../../common/TokenCommonFieldsForm';

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

const CreatePack = () => {
    const { data: collections, isLoading: isCollectionsLoading } = useGetCollectionsQuery({
        page: 1,
        pageSize: 1000,
    });

    const [
        onCreatePackRequest,
        { data: createdPackData, isLoading, error, isSuccess, reset },
    ] = useCreatePackMutation();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const [createdPack, setCreatedPack] = useState({});

    const [name, setName] = useState('');
    const [tokenCommonName, setTokenCommonName] = useState('Common name');
    const [numbering, setNumbering] = useState('1');
    const [tokenPrice, setTokenPrice] = useState(0.1);
    const [tokenIdForPayment, setTokenIdForPayment] = useState();
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

    const selectedCollection = useMemo(() => {
        if (!collectionId || !collections.results) {
            return null;
        }

        return collections.results.find((c) => c.id === collectionId);
    }, [collections, collectionId]);

    const onSavePackHandler = useCallback(() => {
        let status_price = 'price';

        if (isAuction) {
            status_price = 'auction';
        }

        if (isNoPrice) {
            status_price = 'no_price';
        }

        if (
            !collectionId ||
            !name ||
            !tokenPrice ||
            !tokenIdForPayment ||
            !description ||
            !investorRoyalty ||
            !creatorRoyalty
        ) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'Fill all required fields',
            });

            return;
        }

        if (
            Number(selectedCollection.percentage_fee) !==
            Number(investorRoyalty) + Number(creatorRoyalty)
        ) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text:
                    'The sum of investor and creator royalty should be equal to collection percentage fee',
            });
            return;
        }
        const incomeSumRoyaltyPerc = incomeRoyaltyDestribution.reduce(
            (a, c) => a + Number(c.percentage),
            0,
        );
        const creatorSumRoyaltyPerc = creatorRoyaltyDestribution.reduce(
            (a, c) => a + Number(c.percentage),
            0,
        );

        if (incomeSumRoyaltyPerc < 100) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'The total royalties of the income must be equal to 100%',
            });

            return;
        }

        if (creatorSumRoyaltyPerc < 100) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'The total royalties of the creators must be equal to 100%',
            });

            return;
        }

        const data = {
            collection: collectionId,
            name: name,
            price: Number(tokenPrice),
            currency_token: tokenIdForPayment,
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

        // const mockData = {
        //     checkbrandcom: 'eqwqeweqw',
        //     collection: '5dfbc65f-0275-48ab-b3aa-edbe2d02897b',
        //     creator_royalty: 0.5,
        //     investor_royalty: 0.5,
        //     creator_royalty_distribution: [
        //         {
        //             wallet: 'rwqeqweqw',
        //             percent: 100,
        //         },
        //     ],
        //     currency_token: 'f56d23c1-5e64-4bf6-9a24-43bbf4c2b6ea',
        //     description: 'eqweqweqw',
        //     income_distribution: [
        //         {
        //             wallet: 'eqwewewq',
        //             percent: 100,
        //         },
        //     ],
        //     name: 'eqweqw2',
        //     opensea: 'eqeeqwqewweq',
        //     price: 0.01,
        //     status_price: 'price',
        //     type: 'standard',
        //     unlockable: false,
        //     unlockable_content: '',
        //     close: false,
        // };

        onCreatePackRequest(data);
    }, [
        collectionId,
        name,
        tokenPrice,
        tokenIdForPayment,
        incomeRoyaltyDestribution,
        creatorRoyaltyDestribution,
        description,
        opensea,
        checkbrandcom,
        unlockable,
        unlockableContent,
        isAuction,
        isNoPrice,
        investorRoyalty,
        creatorRoyalty,
        properties,
        selectedCollection,
    ]);

    const isAbleToUpload = useMemo(() => createdPack && !isTokenUploadStarted, [
        createdPack,
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
            pack: createdPack.id,
            currency_token: tokenIdForPayment,
            investor_royalty: investorRoyalty,
            creator_royalty: creatorRoyalty,
        };
    }, [isAuction, isNoPrice, createdPack, tokenIdForPayment, investorRoyalty, creatorRoyalty]);

    useEffect(() => {
        if (isSuccess && createdPackData) {
            setCreatedPack(createdPackData);

            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Pack successfuly created, now you are able to upload pack tokens',
            });
        }
    }, [isSuccess, createdPackData]);

    useEffect(() => {
        if (error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(error),
            });
        }
    }, [error]);

    useEffect(
        () => () => {
            reset();
        },
        [],
    );

    if (isCollectionsLoading) {
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
                    />{' '}
                    <div className="create__button--content">
                        <div className="create__button--wrapper">
                            {isLoading ? (
                                <button className="button create__button">Loading...</button>
                            ) : (
                                <button
                                    className="button create__button default__hover"
                                    onClick={onSavePackHandler}
                                >
                                    Upload on site
                                </button>
                            )}

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
    );
};

export default React.memo(CreatePack);
