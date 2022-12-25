import React, { useContext, useRef, useCallback, useState, useMemo } from 'react';
import axios from 'axios';
import { isArray } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';
import { CONFIRME_UPLOAD_TOKEN, TOKEN_BY_PACK } from '../../const/http/API_URLS';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { NotificationContext } from '../../context/NotificationContext';
import { useFileDropzone } from '../../hooks/useFileDropzone';
import { arrayBufferToBinary } from '../../utils/arrayBufferToBinary';
import AsyncQueue from '../../utils/asyncQueue';
import { convertFileToBase64 } from '../../utils/convertFileToBase64';
import { generateNumericIndicator } from '../../utils/generateNumericIndicator';
import { getFileNameAndExt } from '../../utils/getFilenameAndExt';
import FileDropzone from '../FileDropzone';
import Loader from '../Loader';
import { useHideTokenMutation } from '../../redux/api/dataService';
import { onClose, onOpen } from '../../redux/dialogs/deleteEntityDialog';
import { normilizeError } from '../../utils/http/normilizeError';
import DeleteEntityDialog from '../../components/DeleteEntityDialog/DeleteEntityDialog';
import { EDIT_TOKEN_PAGE } from '../../const/http/CLIENT_URLS';

import css from './UploadManyTokensForm.module.css';

const UPLOAD_FILES_MAX_LIMIT = 1000;

// preload token
// {
//     "id": "d51360ee-4ba1-4205-a968-552df427ee64",
//     "wallet_owner": "0xea09d6d8cff17b11e45763d1025831de3e2ddaaf",
//     "hide": false,
//     "mint": false,
//     "upload_blockchain": false,
//     "freeze": false,
//     "profit": "0.00000000",
//     "creator_royalty_distribution": [
//         {
//             "id": "17962ede-a89f-4bea-9ce0-b6cd253d7fda",
//             "percent": "100.00000000",
//             "wallet": "3456456"
//         }
//     ],
//     "income_distribution": [
//         {
//             "id": "b4339214-fbed-474a-ac69-e3804aefa800",
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
//     "price_in_usd": "176.66",
//     "type": "standard",
//     "name": "23242322 001",
//     "price": "0.14500000",
//     "status_price": "price",
//     "investor_royalty": "0.50000000",
//     "creator_royalty": "4.50000000",
//     "description": "435пкекуе",
//     "close": false,
//     "close_image": null,
//     "unlockable": false,
//     "unlockable_content": null,
//     "status": "stop",
//     "address": null,
//     "file_1": "https://gateway.storjshare.io/demo-bucket/collections/7483fcea-de80-48e3-8411-f23dd7414fdc/bb00c77e-9164-4009-af22-b22e33728445/tokens/52e6b701dead4538be67ec1bae262f91.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221224%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221224T100537Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=db68e1a4fb8abc532ea73c8f8b815b622a412ff1625038a81aaa8d69972b6e51",
//     "file_2": "https://gateway.storjshare.io/demo-bucket/collections/7483fcea-de80-48e3-8411-f23dd7414fdc/bb00c77e-9164-4009-af22-b22e33728445/tokens/f0e220ea17df4fd7aec2381944f65b47.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221224%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221224T100537Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4bbaa07cd58bccd7f408b8a27b8ed9bfa7d9472f8cda008b4e56210d56e9b1b1",
//     "file_1_name_ext": "/collections/7483fcea-de80-48e3-8411-f23dd7414fdc/bb00c77e-9164-4009-af22-b22e33728445/tokens/52e6b701dead4538be67ec1bae262f91.jpg",
//     "file_2_name_ext": "/collections/7483fcea-de80-48e3-8411-f23dd7414fdc/bb00c77e-9164-4009-af22-b22e33728445/tokens/f0e220ea17df4fd7aec2381944f65b47.jpg",
//     "url_opensea": null,
//     "currency_token": "f56d23c1-5e64-4bf6-9a24-43bbf4c2b6ea"
// }

const UploadManyTokensForm = (props) => {
    const {
        numbering,
        tokenCommonName,
        tokenPrice,
        investorRoyalty,
        creatorRoyalty,
        isTokenNameEqualFileName,
        isAbleToUpload,
        isTokenUploadStarted,
        setIsTokenUploadStarted,
        tokensDataToUpload,
        preloadedTokens = [],
        requiredError,
    } = props;
    const authInfo = useSelector((state) => state.auth);

    const { isOpen, id: deletedTokenId } = useSelector((state) => state.deleteEntityDialog);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [
        hideToken,
        {
            isSuccess,
            isLoading: isDeletationProccessing,
            error: hideTokenError,
            reset: resetDeletationState,
        },
    ] = useHideTokenMutation();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const requestsQueueRef = useRef(new AsyncQueue({ maxParallelTasks: 2 }));

    const [numericIndicatorInProccess, setNumericIndicatorInProccess] = useState([]);
    const [numericIndicatorDone, setNumericIndicatorDone] = useState([]);
    const [numericIndicatorFailed, setNumericIndicatorFailed] = useState([]);

    const [preloadedTokensList, setPreloadedTokensList] = useState(
        preloadedTokens.map((pt, i) => {
            const numericIndicator = generateNumericIndicator(Number(numbering) + i);
            return {
                isPreloaded: true,
                id: pt.id,
                nameComponent: <>{pt.name}</>,
                name: pt.name,
                numericIndicator,
                tokenImgName: null,
                tokenImgFile: null,
                tokenPreviewName: null,
                tokenPreviewFile: null,
                tokenPrice: Number(pt.price),
                investorRoyalty: Number(pt.investor_royalty),
                creatorRoyalty: Number(pt.creator_royalty),
            };
        }) || [],
    );

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

            if (res.some((r) => r.tokenImgName === fileNameAndExt.fileName)) {
                return null;
            }

            const tokenPreviewImg = tokenPreviewValues.find((tpv) =>
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
                tokenImgFile: tiv,
                tokenPreviewName: tokenPreviewImg ? tokenPreviewImg.file.name : null,
                tokenPreviewFile: tokenPreviewImg,
                tokenPrice,
                investorRoyalty,
                creatorRoyalty,
            });
        });

        return res;
    }, [
        tokenImgValues,
        tokenPreviewValues,
        numbering,
        tokenCommonName,
        tokenPrice,
        investorRoyalty,
        creatorRoyalty,
        isTokenNameEqualFileName,
    ]);

    const onDeleteHandler = useCallback((id) => {
        hideToken({ id, isHide: true });
    }, []);

    const removeTokenHandler = useCallback(
        ({ isPreloaded, id, fileImg, filePreview, numericIndicator }) => {
            if (numericIndicator) {
                setNumericIndicatorInProccess((p) => p.filter((n) => n !== numericIndicator));
                setNumericIndicatorDone((p) => p.filter((n) => n !== numericIndicator));
                setNumericIndicatorFailed((p) => p.filter((n) => n !== numericIndicator));
            }

            if (isPreloaded && id) {
                dispatch(onOpen(id));
            }

            if (fileImg) {
                onDeleteTokenImg(fileImg);
            }

            if (filePreview) {
                onDeleteTokenPreview(filePreview);
            }
        },
        [],
    );

    const closeDialogHandler = useCallback(() => {
        dispatch(onClose());
    }, []);

    const onEditUserHandler = useCallback(({ id }) => {
        if (id) {
            navigate(EDIT_TOKEN_PAGE({ id }));
        }
    }, []);

    const onUploadTokensHandler = useCallback(async () => {
        if (!genrateTablesRow.length || !isAbleToUpload) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: requiredError,
            });
            return;
        }

        setIsTokenUploadStarted(true);

        // const data = {
        //     pack: 'fe5cb80b-5bd2-4efe-8a7a-94316ff7e2e2',
        //     currency_token: 'f56d23c1-5e64-4bf6-9a24-43bbf4c2b6ea',
        //     investor_royalty: 2.5,
        //     creator_royalty: 2.5,
        //     status_price: 'price',
        //     description: 'ewqwqew',
        //     income_distribution: [
        //         {
        //             wallet: 'wqeqw',
        //             percent: 100,
        //         },
        //     ],
        //     creator_royalty_distribution: [
        //         {
        //             wallet: 'ewqeqwe',
        //             percent: 100,
        //         },
        //     ],
        // };

        Object.keys(tokensDataToUpload).forEach((key) => {
            if (
                !tokensDataToUpload[key] ||
                (isArray(tokensDataToUpload[key]) && !tokensDataToUpload[key].length)
            ) {
                delete tokensDataToUpload[key];
            }
        });

        await Promise.all(
            genrateTablesRow
                .filter((t) => !numericIndicatorDone.includes(t.numericIndicator))
                .map((token) => {
                    return new Promise((resolve) => {
                        const task = async () => {
                            setNumericIndicatorInProccess((p) => [...p, token.numericIndicator]);
                            setNumericIndicatorFailed((p) =>
                                p.filter((num) => num !== token.numericIndicator),
                            );

                            const res = await axios.request({
                                method: HTTP_METHODS.POST,
                                url: TOKEN_BY_PACK,
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${authInfo.accessToken}`,
                                },
                                data: {
                                    ...tokensDataToUpload,
                                    name: token.name,
                                    price: token.tokenPrice,
                                    file_1_name_ext: token.tokenPreviewName,
                                    file_2_name_ext: token.tokenImgName,
                                },
                            });

                            if (!res.data.file_1_pre_signed_url_data) {
                                throw 'Bad request';
                            }

                            const imageBuffer = await convertFileToBase64(token.tokenImgFile.file);
                            const imageBlob = arrayBufferToBinary(
                                imageBuffer,
                                token.tokenImgFile.type,
                            );
                            try {
                                await fetch(res.data.file_2_pre_signed_url_data, {
                                    method: HTTP_METHODS.PUT,
                                    body: imageBlob,
                                }).catch((e) => {
                                    console.log('fetcErr', { e });
                                });
                            } catch (e) {
                                console.log({ e });
                                throw `Token ${token.name} image upload failed`;
                            }

                            const previewBuffer = await convertFileToBase64(
                                token.tokenPreviewFile.file,
                            );
                            const previewBlob = arrayBufferToBinary(
                                previewBuffer,
                                token.tokenPreviewFile.type,
                            );
                            try {
                                await fetch(res.data.file_1_pre_signed_url_data, {
                                    method: HTTP_METHODS.PUT,
                                    body: previewBlob,
                                }).catch((e) => {
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
                                        file_1_name_ext: res.data.file_1_name_ext,
                                        file_2_name_ext: res.data.file_2_name_ext,
                                    },
                                });
                            } catch (e) {
                                console.log(e);
                                throw `Token ${token.name} update failed`;
                            }

                            return updateToken;
                        };

                        const getUploadsUrls = (urgently) => {
                            requestsQueueRef.current
                                .addTask(
                                    {
                                        key: token.numericIndicator,
                                        task,
                                    },
                                    urgently,
                                )
                                .then((res) => {
                                    setNumericIndicatorInProccess((p) => {
                                        return p.filter((el) => el !== token.numericIndicator);
                                    });
                                    setNumericIndicatorDone((p) => [...p, token.numericIndicator]);
                                    return resolve({
                                        numericId: token.numericIndicator,
                                    });
                                })
                                .catch((e) => {
                                    setNumericIndicatorFailed((p) => [
                                        ...p,
                                        token.numericIndicator,
                                    ]);
                                    setNumericIndicatorInProccess((p) => {
                                        return p.filter((el) => el !== token.numericIndicator);
                                    });

                                    setIsTokenUploadStarted(false);

                                    if (!e.response) {
                                        return;
                                    }

                                    const errorKeys = Object.keys(e.response.data);

                                    let error = `${e}`;

                                    if (typeof e.response.data === 'object') {
                                        error = `${errorKeys
                                            .map((k) => `${k} - ${e.response.data[k]}`)
                                            .join(', ')}`;
                                    }

                                    addNotification({
                                        type: NOTIFICATION_TYPES.ERROR,
                                        text: error,
                                    });
                                    // setTimeout(() => getUploadsUrls(true), 5000);
                                });
                        };

                        getUploadsUrls(true);
                    });
                }),
        );

        setIsTokenUploadStarted(false);
    }, [genrateTablesRow, tokensDataToUpload, isAbleToUpload]);

    useEffect(() => {
        if (hideTokenError) {
            closeDialogHandler();
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(hideTokenError),
            });
        }
    }, [hideTokenError]);

    useEffect(() => {
        if (isSuccess && deletedTokenId) {
            setPreloadedTokensList((p) => p.filter((t) => t.id !== deletedTokenId));

            resetDeletationState();
            closeDialogHandler();
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Token deleted successfuly',
            });
        }
    }, [isSuccess, deletedTokenId]);

    return (
        <>
            <div className="create__item">
                <p className="create__item--title required">
                    Add Images, Videos, Audios, or 3D Models
                </p>

                <p className="create__item--text">
                    File types supported: JPG, PNG, GIF, SVG, Mp4, WEBM, MP3, WAV, OGG, GLB, GLTF.
                    Max 1000 files. Files are sorted by file name.
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
                    disabled={isTokenUploadStarted}
                    onAdd={onAddTokenImg}
                    id="createpackImgs"
                    onDelete={onDeleteTokenImg}
                />

                <label htmlFor="createpackImgs" className="create__item--label img">
                    <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                </label>
            </div>

            <div className="create__item">
                <p className="create__item--title required">Preview Images</p>

                <p className="create__item--text">
                    Because you&rsquo;ve included multimedia, you&rsquo;ll need to provide an images
                    (PNG, JPG, or GIF) for the card display of your item. Files are sorted by file
                    name.
                </p>

                <FileDropzone
                    multiple
                    availableFormats={['image/png', 'image/gif', 'image/jpg', 'image/jpeg']}
                    values={tokenPreviewValues}
                    disabled={isTokenUploadStarted}
                    onAdd={onAddTokenPreview}
                    id="createpackPreview"
                    onDelete={onDeleteTokenPreview}
                />

                <label htmlFor="createpackPreview" className="create__item--label img">
                    <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                </label>
            </div>

            <div className="create__item">
                <p className="create__item--title required">Loading table</p>

                <p className="create__item--text">
                    The table shows which files with which name and price will be uploaded to the
                    smart contract and readiness for uploading. All tokens will have the same
                    characteristics (Link, Description, Collection name, Properties, Blockchain,
                    etc.). But you can change the price of tokens in the table.
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

                            <p className="create__loading--title"> Actions</p>
                        </div>

                        {[...genrateTablesRow, ...preloadedTokensList].map((row, i) => (
                            <div className="create__loading--item" key={row.numericIndicator + i}>
                                <p className="create__loading--text">{i + 1}</p>

                                <p className="create__loading--text">{row.nameComponent}</p>

                                <p className="create__loading--text hide-overflow-ellipsis">
                                    {row.tokenImgName}
                                </p>

                                <p className="create__loading--text hide-overflow-ellipsis">
                                    {row.tokenPreviewName}
                                </p>

                                <p className="create__loading--text">
                                    Price <span className="green__c">{row.tokenPrice} ETH</span>
                                </p>

                                <p className="create__loading--text">
                                    Fee{' '}
                                    <span className="green__c">
                                        {row.investorRoyalty || 0}/{row.creatorRoyalty || 0}
                                    </span>
                                </p>

                                <p className="create_pack_proccess_status_container">
                                    {numericIndicatorInProccess.includes(row.numericIndicator) && (
                                        <Loader className="create_pack_table_loader" />
                                    )}

                                    {(numericIndicatorDone.includes(row.numericIndicator) ||
                                        row.isPreloaded) && <span className="green__c">Done</span>}

                                    {numericIndicatorFailed.includes(row.numericIndicator) && (
                                        <span className="red__c">Failed</span>
                                    )}
                                </p>

                                <p className="create__loading--actions">
                                    <IconButton
                                        disableRipple
                                        sx={{ padding: 0 }}
                                        onClick={() =>
                                            removeTokenHandler({
                                                isPreloaded: row.isPreloaded,
                                                id: row.id,
                                                numericIndicator: row.numericIndicator,
                                                fileImg: row.tokenImgFile,
                                                filePreview: row.tokenPreviewFile,
                                            })
                                        }
                                    >
                                        <div className={css.trashIconBox}>
                                            <DeleteIcon classes={{ root: css.trashIcon }} />
                                        </div>
                                    </IconButton>
                                    {row.isPreloaded && (
                                        <IconButton
                                            disableRipple
                                            sx={{ padding: 0 }}
                                            onClick={() => onEditUserHandler({ id: row.id })}
                                        >
                                            <div className={css.editIconBox}>
                                                <ModeEditOutlineIcon
                                                    classes={{ root: css.editIcon }}
                                                />
                                            </div>
                                        </IconButton>
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>

                    <button
                        className="button create__loading--button"
                        onClick={onUploadTokensHandler}
                        disabled={isTokenUploadStarted}
                    >
                        Submit Upload
                    </button>
                </div>
            </div>
            {isOpen && (
                <DeleteEntityDialog
                    open={isOpen}
                    isDeletationProccessing={isDeletationProccessing}
                    onClose={closeDialogHandler}
                    onDelete={onDeleteHandler}
                    title={'Are you sure you want to delete token?'}
                />
            )}
        </>
    );
};

export default React.memo(UploadManyTokensForm);
