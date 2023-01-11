import axios from 'axios';
import { isArray } from 'lodash';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CenteredContainer from '../../common/CenteredContainer';
import { CustomSelect } from '../../common/CustomSelect';
import File from '../../common/File';
import Loader from '../../common/Loader';
import { TokenCommonFieldsForm } from '../../common/TokenCommonFieldsForm';
import { CONFIRME_UPLOAD_TOKEN, PATCH_TOKEN } from '../../const/http/API_URLS';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { NotificationContext } from '../../context/NotificationContext';
import {
    useGetPacksQuery,
    useGetTokenQuery,
    useUpdateTokenMutation,
} from '../../redux/api/dataService';
import { arrayBufferToBinary } from '../../utils/arrayBufferToBinary';
import { convertFileToBase64 } from '../../utils/convertFileToBase64';
import { normilizeError } from '../../utils/http/normilizeError';

// token
// {
//     "id": "8c012b18-51da-4c5a-86be-f58b9f3c8c09",
//     "wallet_owner": "0xea09d6d8cff17b11e45763d1025831de3e2ddaaf",
//     "hide": false,
//     "mint": false,
//     "upload_blockchain": false,
//     "freeze": false,
//     "profit": "0.00000000",
//     "creator_royalty_distribution": [
//         {
//             "id": "8eb6a51f-da89-4663-b54a-f9fcf997143f",
//             "percent": "100.00000000",
//             "wallet": "3456456"
//         }
//     ],
//     "income_distribution": [
//         {
//             "id": "b0a489cb-0918-4d0b-b5cb-8cbce8b55300",
//             "percent": "100.00000000",
//             "wallet": "34536"
//         }
//     ],
//     "properties": [],
//     "levels_stats": [],
//     "collection": {
//         "id": "7483fcea-de80-48e3-8411-f23dd7414fdc",
//         "name": "e21"
//     },
//     "pack": {
//         "id": "bb00c77e-9164-4009-af22-b22e33728445",
//         "name": "8656453456"
//     },
//     "price_in_usd": "176.89",
//     "type": "standard",
//     "name": "23242322 002",
//     "price": "0.14500000",
//     "status_price": "price",
//     "investor_royalty": "2.50000000",
//     "creator_royalty": "2.50000000",
//     "description": "435пкекуе",
//     "close": false,
//     "close_image": null,
//     "unlockable": false,
//     "unlockable_content": null,
//     "status": "stop",
//     "address": null,
//     "file_1": "https://gateway.storjshare.io/demo-bucket/collections/7483fcea-de80-48e3-8411-f23dd7414fdc/bb00c77e-9164-4009-af22-b22e33728445/tokens/fee10db849e3455f9e282649c6e71848.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221224%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221224T113444Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=99dd0013a45af4046509cb7b8988f42cccca9ed28759c11b0d03b138e7613ec8",
//     "file_2": "https://gateway.storjshare.io/demo-bucket/collections/7483fcea-de80-48e3-8411-f23dd7414fdc/bb00c77e-9164-4009-af22-b22e33728445/tokens/34bc6d1acc3d4882a47eb5e93bf5398e.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221224%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221224T113444Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=2dde629853246ab58a74aa310243fb55d8c74e7837a2d8ee3232d649c848e901",
//     "file_1_name_ext": "/collections/7483fcea-de80-48e3-8411-f23dd7414fdc/bb00c77e-9164-4009-af22-b22e33728445/tokens/fee10db849e3455f9e282649c6e71848.jpg",
//     "file_2_name_ext": "/collections/7483fcea-de80-48e3-8411-f23dd7414fdc/bb00c77e-9164-4009-af22-b22e33728445/tokens/34bc6d1acc3d4882a47eb5e93bf5398e.jpg",
//     "url_opensea": null,
//     "currency_token": "f56d23c1-5e64-4bf6-9a24-43bbf4c2b6ea"
// }

const EditOneToken = () => {
    const { id } = useParams();

    const authInfo = useSelector((state) => state.auth);

    const { data: token, isLoading: isTokenLoading } = useGetTokenQuery(
        { id },
        {
            skip: !id,
        },
    );

    const { data: packs, isLoading: isPacksLoading } = useGetPacksQuery({
        page: 1,
        pageSize: 1000,
    });

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const [tokenImage, setTokenImage] = useState('');
    const [tokenPreview, setTokenPreview] = useState('');

    const [isTokenUploadStarted, setIsTokenUploadStarted] = useState(false);

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

    const onPackIdChangeHandler = useCallback((value) => {
        setPackId(value);
    }, []);

    const onSubmitHandler = useCallback(async () => {
        setIsTokenUploadStarted(true);

        let status_price = 'price';

        if (isAuction) {
            status_price = 'auction';
        }

        if (isNoPrice) {
            status_price = 'no_price';
        }

        const data = {
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

        Object.keys(data).forEach((key) => {
            if (!data[key] || (isArray(data[key]) && !data[key].length)) {
                delete data[key];
            }
        });

        if (tokenImage) {
            data.file_2_name_ext = tokenImage.name;
        }
        if (tokenPreview) {
            data.file_1_name_ext = tokenPreview.name;
        }

        let res;

        try {
            res = await axios.request({
                method: HTTP_METHODS.PATCH,
                url: PATCH_TOKEN(id),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authInfo.accessToken}`,
                },
                data: {
                    ...data,
                    name: tokenCommonName,
                    price: tokenPrice,
                },
            });
        } catch (e) {
            console.log(e);
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'Token update failed',
            });
        }

        if (!res) {
            setIsTokenUploadStarted(false);
            return;
        }

        if (res.data.file_1_pre_signed_url_data || res.data.file_2_pre_signed_url_data) {
            try {
                let confirmData = {};

                if (res.data.file_1_pre_signed_url_data) {
                    const previewBuffer = await convertFileToBase64(tokenPreview);
                    const previewBlob = arrayBufferToBinary(previewBuffer, tokenPreview.type);

                    try {
                        await fetch(res.data.file_1_pre_signed_url_data, {
                            method: HTTP_METHODS.PUT,
                            body: previewBlob,
                        });

                        confirmData.file_1_name_ext = res.data.file_1_name_ext;
                    } catch (e) {
                        throw `Token ${token.name} image upload failed`;
                    }
                }

                if (res.data.file_2_pre_signed_url_data) {
                    const imageBuffer = await convertFileToBase64(tokenImage);
                    const imageBlob = arrayBufferToBinary(imageBuffer, tokenImage.type);

                    try {
                        await fetch(res.data.file_2_pre_signed_url_data, {
                            method: HTTP_METHODS.PUT,
                            body: imageBlob,
                        });

                        confirmData.file_2_name_ext = res.data.file_2_name_ext;
                    } catch (e) {
                        console.log({ e });
                        throw `Token ${token.name} image upload failed`;
                    }
                }

                if (Object.keys(confirmData).length > 0) {
                    try {
                        await axios.request({
                            method: HTTP_METHODS.PATCH,
                            url: CONFIRME_UPLOAD_TOKEN(res.data.id),
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authInfo.accessToken}`,
                            },
                            data: confirmData,
                        });
                    } catch (e) {
                        console.log(e);
                        throw `Token ${token.name} update failed`;
                    }
                }

                addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    text: 'Token updated successfuly',
                });
            } catch (e) {
                console.log({ e });
                addNotification({
                    type: NOTIFICATION_TYPES.ERROR,
                    text: e,
                });
            }
        } else {
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Token updated successfuly',
            });
        }

        setIsTokenUploadStarted(false);
    }, [
        id,
        tokenImage,
        tokenPreview,
        packId,
        tokenCommonName,
        numbering,
        tokenPrice,
        tokenIdForPayment,
        investorRoyalty,
        creatorRoyalty,
        isTokenNameEqualFileName,
        isAuction,
        isNoPrice,
        properties,
        description,
        levels,
        stats,
        opensea,
        checkbrandcom,
        creatorRoyaltyDestribution,
        incomeRoyaltyDestribution,
        collectionId,
        unlockable,
        unlockableContent,
    ]);

    useEffect(() => {
        if (token) {
            setPackId(token.pack.id);

            setTokenPrice(String(Number(token.price)));
            setTokenCommonName(token.name);
            setTokenIdForPayment(token.currency_token);
            setInvestorRoyalty(String(Number(token.investor_royalty)));
            setCreatorRoyalty(String(Number(token.creator_royalty)));
            setIsAuction(token.status_price === 'auction');
            setIsNoPrice(token.status_price === 'no_price');
            setDescriprion(token.description);
            setProperties(token.properties || []);
            setLevels(token.levels_stats || []);
            setStats(token.levels_stats || []);
            setCreatorRoyaltyDestribution(
                token.creator_royalty_distribution.map((rd) => ({
                    id: rd.id,
                    percentage: Number(rd.percent),
                    wallet: rd.wallet,
                })),
            );
            setIncomeRoyaltyDestribution(
                token.income_distribution.map((ind) => ({
                    id: ind.id,
                    percentage: Number(ind.percent),
                    wallet: ind.wallet,
                })),
            );

            setCollectionId(token.collection.id);

            setUnlockable(token.unlockable);
            setUnlockableContent(token.unlockable_content);
        }
    }, [token]);

    if (isTokenLoading || isPacksLoading || !token) {
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
                    <h2 className="title left">Update Token</h2>

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
                        <File
                            title="Add Images, Videos, Audios, or 3D Models"
                            text="File types supported: JPG, PNG, GIF, SVG, Mp4, WEBM, MP3, WAV, OGG, GLB, GLTF."
                            defaultValue={token && token.file_2}
                            required
                            accept="image/png, image/gif, image/jpeg, image/jpg, video/mp4, video/mpeg, video/webm,"
                            id="tokenImage"
                            type="cover"
                            value={tokenImage}
                            defaultFileName={token.file_2_name_ext}
                            setValue={setTokenImage}
                        />
                        <File
                            title="Preview Images"
                            text="This image will appear as token preview"
                            required
                            type="cover"
                            id="tokenPreview"
                            accept="image/png, image/gif, image/jpg, image/jpeg"
                            defaultValue={token && token.file_1}
                            defaultFileName={token.file_1_name_ext}
                            value={tokenPreview}
                            setValue={setTokenPreview}
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
                        withoutNumbering
                    />

                    <div className="create__button--content">
                        <div className="create__button--wrapper">
                            {isTokenUploadStarted ? (
                                <button className="button create__button default__hover">
                                    Loading...
                                </button>
                            ) : (
                                <button
                                    className="button create__button default__hover"
                                    onClick={onSubmitHandler}
                                >
                                    Save changes
                                </button>
                            )}
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
    );
};

export default React.memo(EditOneToken);
