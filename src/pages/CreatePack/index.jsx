import React, { useState, useMemo, useCallback, useContext, useRef } from 'react';
import axios from 'axios';
import _, { uniqueId } from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FileDropzone from '../../common/FileDropzone';
import Input, { INPUT_TYPE } from '../../common/Input';
import RoyaltyDestribution from '../../common/RoyaltyDestribution';
import LevelsDialog from '../../components/LevelsDialog';
import PropertiesDialog from '../../components/PropertiesDialog';
import StatsDialog from '../../components/StatsDialog';
import { NotificationContext } from '../../context/NotificationContext';
import { useDialog } from '../../hooks/useDialog';
import { useFileDropzone } from '../../hooks/useFileDropzone';
import { generateNumericIndicator } from '../../utils/generateNumericIndicator';
import { getFileNameAndExt } from '../../utils/getFilenameAndExt';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import { CustomSelect } from '../../common/CustomSelect';
import AsyncQueue from '../../utils/asyncQueue';
import { TOKEN_BY_PACK, CONFIRME_UPLOAD_TOKEN } from '../../const/http/API_URLS';
import { convertFileToBase64 } from '../../utils/convertFileToBase64';
import { arrayBufferToBinary } from '../../utils/arrayBufferToBinary';
import { useCreatePackMutation } from '../../redux/api/dataService';
import { normilizeError } from '../../utils/http/normilizeError';
import CenteredContainer from '../../common/CenteredContainer';
import Loader from '../../common/Loader';

import './index.css';

const UPLOAD_FILES_MAX_LIMIT = 1000;
const MAX_NUMERIC_INDICATOR_START = 1000;

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

const FAKE_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MDEzNTA2NCwianRpIjoiNGIxZTE5NDQtNjk3MS00ZGUxLWE3OTAtYzJlNmE4YzcyNmNmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjB4NDViY2Q5YTljNGM4ZWJkMmQ4YzdkOWRiYTgxMDdhNmRkNDc3NjhmYSIsIm5iZiI6MTY3MDEzNTA2NCwiZXhwIjoxNjcwMTM4NjY0fQ.5XUx3RJxjG-1zTQrGsHRE4ydRAP2W7JmO12HE-TJx-I';

const CreatePack = () => {
    const authInfo = useSelector(state => state.auth);

    const { data: blockchains, isLoading: isBlockchainsLoading } = useGetBlockchainsQuery();
    const { data: collections, isLoading: isCollectionsLoading } = useGetCollectionsQuery(0, 1000);

    const {
        data: availablePaymentTokens,
        refetch: refetchCurrencyTokens,
    } = useGetCurrencyTokensQuery({}, { skip: true });

    const [
        onCreatePackRequest,
        { data: createdPackData, isLoading, error, isSuccess, reset },
    ] = useCreatePackMutation();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const requestsQueueRef = useRef(new AsyncQueue({ maxParallelTasks: 2 }));

    const propertiesDialog = useDialog();
    const levelsDialog = useDialog();
    const statsDialog = useDialog();

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

    const [numericIndicatorInProccess, setNumericIndicatorInProccess] = useState([]);
    const [numericIndicatorDone, setNumericIndicatorDone] = useState([]);
    const [numericIndicatorFailed, setNumericIndicatorFailed] = useState([]);

    const [isTokenUploadInProcessing, setIsTokenUploadInProcessing] = useState(false);

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

        return collections.collections.results.find(c => c.id === collectionId);
    }, [collections.collections, collectionId]);

    const selectedBlockchain = useMemo(() => {
        if (!selectedCollection || !blockchains || !blockchains) {
            return null;
        }

        return blockchains.find(b => b.id === selectedCollection.blockchain.id);
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

            const tokenPreviewImg = tokenPreviewValues.find(tpv =>
                getFileNameAndExt(tpv.file.name).fileName.includes(fileNameAndExt.fileName),
            );
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
                name: isTokenNameEqualFileName
                    ? fileNameAndExt.fileName
                    : `${tokenCommonName} ${numericIndicator}`,
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

    const onSelectTokenNameForPayment = useCallback(value => {
        setTokenIdForPayment(value);
    }, []);

    const onAuctionClickHandler = useCallback(() => {
        setIsAuction(p => {
            if (!p) {
                setIsNoPrice(false);
            }
            return !p;
        });
    }, []);

    const onNoPriceClickHandler = useCallback(() => {
        setIsNoPrice(p => {
            if (!p) {
                setIsAuction(false);
            }
            return !p;
        });
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

    const onCollectionIdChangeHandler = useCallback(value => {
        setCollectionId(value);
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
            income_distribution: incomeRoyaltyDestribution.map(el => ({
                wallet: el.wallet,
                percent: Number(el.percentage),
            })),
            creator_royalty_distribution: creatorRoyaltyDestribution.map(el => ({
                wallet: el.wallet,
                percent: Number(el.percentage),
            })),
            opensea: opensea,
            checkbrandcom: checkbrandcom,
            properties: properties.map(p => {
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

    const onUploadTokensHandler = useCallback(async () => {
        if (!genrateTablesRow.length || !createdPack || isTokenUploadInProcessing) {
            return;
        }

        setIsTokenUploadInProcessing(true);

        await Promise.all(
            genrateTablesRow
                .filter(t => !numericIndicatorDone.includes(t.numericIndicator))
                .map(token => {
                    return new Promise(resolve => {
                        const task = async () => {
                            setNumericIndicatorInProccess(p => [...p, token.numericIndicator]);
                            setNumericIndicatorFailed(p =>
                                p.filter(num => num !== token.numericIndicator),
                            );

                            const res = await axios.request({
                                method: HTTP_METHODS.POST,
                                url: TOKEN_BY_PACK,
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${authInfo.accessToken}`,
                                },
                                data: {
                                    pack: createdPack.id,
                                    name: token.name,
                                    price: token.tokenPrice,
                                    currency_token: tokenIdForPayment,
                                    investor_royalty: investorRoyalty,
                                    creator_royalty: creatorRoyalty,
                                    file_2_name_ext: token.tokenImgName,
                                    file_1_name_ext: token.tokenPreviewName,
                                },
                            });

                            if (!res.data.file_1_pre_signed_url_data) {
                                throw 'Bad request';
                            }

                            const imageBuffer = await convertFileToBase64(token.tokenImgFile);
                            const imageBlob = arrayBufferToBinary(
                                imageBuffer,
                                token.tokenImgFile.type,
                            );

                            try {
                                await fetch(res.data.file_1_pre_signed_url_data, {
                                    method: HTTP_METHODS.PUT,
                                    body: imageBlob,
                                }).catch(e => {
                                    console.log('fetcErr', { e });
                                });
                            } catch (e) {
                                console.log({ e });
                                throw `Token ${token.name} image upload failed`;
                            }

                            const previewBuffer = await convertFileToBase64(token.tokenPreviewFile);
                            const previewBlob = arrayBufferToBinary(
                                previewBuffer,
                                token.tokenPreviewFile.type,
                            );

                            try {
                                await fetch(res.data.file_2_pre_signed_url_data, {
                                    method: HTTP_METHODS.PUT,
                                    body: previewBlob,
                                }).catch(e => {
                                    console.log('fetcErr', { e });
                                });
                            } catch (e) {
                                console.log({ e });
                                throw `Token ${token.name} preview upload failed`;
                            }

                            let updateToken;
                            try {
                                updateToken = await axios.request({
                                    method: HTTP_METHODS.PATCH,
                                    url: CONFIRME_UPLOAD_TOKEN(res.data.id),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${authInfo.accessToken}`,
                                    },
                                    data: {
                                        file_1_name_ext: res.file_1_name_ext,
                                        file_2_name_ext: res.data.file_2_name_ext,
                                    },
                                });
                            } catch (e) {
                                console.log(e);
                                throw `Token ${token.name} update failed`;
                            }

                            return updateToken;
                        };

                        const getUploadsUrls = urgently => {
                            requestsQueueRef.current
                                .addTask(
                                    {
                                        key: token.numericIndicator,
                                        task,
                                    },
                                    urgently,
                                )
                                .then(res => {
                                    setNumericIndicatorInProccess(p => {
                                        return p.filter(el => el !== token.numericIndicator);
                                    });
                                    setNumericIndicatorDone(p => [...p, token.numericIndicator]);
                                    return resolve({
                                        numericId: token.numericIndicator,
                                    });
                                })
                                .catch(e => {
                                    console.log({ e });
                                    setNumericIndicatorFailed(p => [...p, token.numericIndicator]);
                                    setNumericIndicatorInProccess(p => {
                                        return p.filter(el => el !== token.numericIndicator);
                                    });

                                    const errorKeys = Object.keys(e.response.data);

                                    let error = `${e}`;

                                    if (typeof e.response.data === 'object') {
                                        error = `${errorKeys
                                            .map(k => `${k} - ${e.response.data[k]}`)
                                            .join(', ')}`;
                                    }

                                    addNotification({
                                        type: NOTIFICATION_TYPES.ERROR,
                                        text: error,
                                    });

                                    addNotification({
                                        type: NOTIFICATION_TYPES.ERROR,
                                        text: error.slice(0, 200),
                                    });
                                    // setTimeout(() => getUploadsUrls(true), 5000);
                                });
                        };

                        getUploadsUrls(true);
                    });
                }),
        );

        setIsTokenUploadInProcessing(false);
    }, [
        genrateTablesRow,
        authInfo.accessToken,
        createdPack,
        numericIndicatorDone,
        tokenIdForPayment,
        isTokenUploadInProcessing,
    ]);

    useEffect(() => {
        if (selectedBlockchain) {
            refetchCurrencyTokens(selectedBlockchain.id);
        }
    }, [selectedBlockchain]);

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

    if (isBlockchainsLoading || isCollectionsLoading) {
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
                                    availableFormats={[
                                        'image/png',
                                        'image/gif',
                                        'image/jpeg',
                                        'image/jpg',
                                        'video/mp4',
                                        'video/mpeg',
                                        'video/webm',
                                    ]}
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
                                    availableFormats={[
                                        'image/png',
                                        'image/gif',
                                        'image/jpg',
                                        'image/jpeg',
                                    ]}
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

                                                <p className="create__loading--text hide-overflow-ellipsis">
                                                    {row.tokenImgName}
                                                </p>

                                                <p className="create__loading--text hide-overflow-ellipsis">
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

                                                <p className="create_pack_proccess_status_container">
                                                    {numericIndicatorInProccess.includes(
                                                        row.numericIndicator,
                                                    ) ? (
                                                        <Loader className="create_pack_table_loader" />
                                                    ) : (
                                                        <>
                                                            {numericIndicatorDone.includes(
                                                                row.numericIndicator,
                                                            ) && (
                                                                <span className="green__c">
                                                                    Done
                                                                </span>
                                                            )}

                                                            {numericIndicatorFailed.includes(
                                                                row.numericIndicator,
                                                            ) && (
                                                                <span className="red__c">
                                                                    Failed
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className="button create__loading--button"
                                        onClick={onUploadTokensHandler}
                                    >
                                        Submit Upload
                                    </button>
                                </div>
                            </div>
                            <div className="create__item">
                                <p className="create__item--title">Collection</p>

                                <p className="create__item--text">
                                    This is the collection where your items Pack will appear.
                                </p>

                                {Boolean(
                                    collections &&
                                        collections.collections &&
                                        collections.collections.results,
                                ) && (
                                    <div className="create__item--select--inner">
                                        <CustomSelect
                                            optionsList={collections.collections.results.map(c => ({
                                                value: c.id,
                                                name: c.name,
                                            }))}
                                            value={collectionId}
                                            placeholder="Select Collection"
                                            onChange={onCollectionIdChangeHandler}
                                        />
                                    </div>
                                )}
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
                                    <div className="createPack_priceItemContainer_priceInputWrapper createPack_priceItemContainer_wrapper">
                                        <input
                                            className={`input create__item--input createPack_priceItemContainer_priceInputWrapper_priceInput`}
                                            placeholder="0.01"
                                            value={tokenPrice}
                                            onChange={onPriceInputChange}
                                        />

                                        <div className="create__item--select--inner small createPack_priceItemContainer_priceInputWrapper_select_currency">
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
                            <Input
                                title="External Link"
                                text="Item&rsquo;s page will include a link to this URL on this
                                item&rsquo;s detail page, so that users can click to learn more
                                about it. This link will be displayed on item&rsquo;s detail
                                CheckBrand.com page:"
                                placeholder="https://OpenSea.io/collection/collectionname"
                                value={opensea}
                                setValue={setOpensea}
                            />
                            <Input
                                text="This link will be displayed on item&rsquo;s detail OpenSea.io page:"
                                placeholder="https://checkbrand.com/collection/custom URL"
                                value={checkbrandcom}
                                setValue={setCheckbrandcom}
                            />
                            <Input
                                title="Description"
                                text="The description will be included on the item&rsquo;s detail page underneath its image."
                                placeholder="Provide a detailed description of your item."
                                textarea
                                required
                                value={description}
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

export default React.memo(CreatePack);
