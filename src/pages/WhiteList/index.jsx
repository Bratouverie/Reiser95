import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { cnb } from 'cnbuilder';
import { IconButton, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import {
    usePatchApplicationMutation,
    useGetWhiteListFilteredQuery,
} from '../../redux/api/ugcService';
import {
    CommonCell,
    StatusCell,
    WithImageCell,
    WalletCell,
    CustomCell,
    ActionsCell,
} from '../../common/Table/cells';
import { Table } from '../../common/Table';
import CenteredContainer from '../../common/CenteredContainer';
import Loader from '../../common/Loader';
import { normilizeError } from '../../utils/http/normilizeError';
import { STATUSES_COLOR } from '../../const/collection/STATUSES_COLOR';
import { useGetCollectionsQuery } from '../../redux/api/dataService';
import { WHITE_LIST_APPLICATION_STATUSES } from '../../const/collection/WHITE_LIST_APPLICATION_STATUSES';
import { OverflowTooltip } from '../../common/OverflowTooltip';
import { Tooltip } from '../../common/Tooltip';
import { getAgoTimeFormat } from '../../utils/getAgoTimeFormat';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { NotificationContext } from '../../context/NotificationContext';
import ActionComponent from './ActionComponent';
import DeleteEntityDialog from '../../components/DeleteEntityDialog/DeleteEntityDialog';
import {
    onClose as onConfirmDialogClose,
    onOpen as onConfirmDialogOpen,
} from '../../redux/dialogs/confirmAplicationDialog';
import {
    onClose as onRejectDialogClose,
    onOpen as onRejectDialogOpen,
} from '../../redux/dialogs/deleteEntityDialog';

import './index.css';
import css from './WhiteList.module.css';
import { ConfirmDialog } from '../../components/ConfirmDialog';

const HEDER_CELLS = {
    STATUS: 'Status',
    COLLECTION: 'Collection',
    USER: 'User',
    META_DATA: 'Meta Data',
    WALLET_ADDRESS: 'Wallet address/balance',
    TIME: 'Time',
    IN_WORK: 'In work',
    ACTION: 'Action',
};

const BODY_CELLS = {
    STATUS: 'status',
    NAME: 'collection.name',
    USER: 'user',
    META_DATA: 'meta_data',
    WALLET: 'wallet',
    TIME: 'time',
    IN_WORK: 'inWork',
    ACTION: 'action',
};

const HEADER_CELLS_ARR = [
    { label: HEDER_CELLS.STATUS, xs: 2 },
    { label: HEDER_CELLS.COLLECTION, xs: 3 },
    { label: HEDER_CELLS.USER, xs: 2 },
    { label: HEDER_CELLS.META_DATA, xs: 2 },
    { label: HEDER_CELLS.WALLET_ADDRESS, xs: 2 },
    { label: HEDER_CELLS.TIME, xs: 2 },
    { label: HEDER_CELLS.IN_WORK, xs: 1 },
    { label: '', xs: 2, isAction: true },
];

const META_DATA_FIELDS_ARR = [
    'field_1',
    'field_2',
    'field_3',
    'field_4',
    'field_5',
    'field_6',
    'field_7',
    'field_8',
    'field_9',
    'field_10',
];

const TABLE_BOTTOM_MARGIN = 20;
const META_DATA_FIELDS_TO_SHOW_COUNT = 3;

const WhiteList = () => {
    const { isOpen: isDeleteEntityOpen, id: rejectedAplicationId } = useSelector(
        (state) => state.deleteEntityDialog,
    );
    const { isOpen: isConfirmeApplicationOpen, id: confimedAplicationId } = useSelector(
        (state) => state.confirmAplicationDialog,
    );

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const dispatch = useDispatch();

    const [applications, setApplications] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [tableHeight, setTableHeight] = useState(0);

    const [isChangeInWorkProccessing, setIsChangeInWorkProccessing] = useState(false);

    const [collectionMap, setCollectionMap] = useState(new Map());

    const { data: collectionsData, isLoading: isCollectionsLoading } = useGetCollectionsQuery({
        page: 1,
        pageSize: 1000,
    });

    const { data, error, isLoading, isFetching, refetch } = useGetWhiteListFilteredQuery(
        {
            page,
            pageSize: rowsPerPage,
            sort: 'created_at',
        },
        {
            pollingInterval: 300,
        },
    );

    const [
        patchApplication,
        {
            isSuccess: isPatchApplicationSuccess,
            isLoading: isPatchApplicationLoading,
            error: patchApplicationError,
            reset: patchApplicationReset,
        },
    ] = usePatchApplicationMutation();

    const [
        confirmApplication,
        {
            isSuccess: isConfirmApplicationSuccess,
            isLoading: isconfirmApplicationLoading,
            error: confirmApplicationError,
            reset: confirmApplicationReset,
        },
    ] = usePatchApplicationMutation();

    const [
        rejectApplication,
        {
            isSuccess: isRejectApplicationSuccess,
            isLoading: isrejectApplicationLoading,
            error: rejectApplicationError,
            reset: rejectApplicationReset,
        },
    ] = usePatchApplicationMutation();

    const beforeTableDiv = useRef(null);

    const headerCellsArray = useMemo(() => {
        return HEADER_CELLS_ARR.map((cell) => ({
            label: cell.label,
            labelComponent: (
                <div className={css.headingCellBox}>
                    <p className={css.headerText}>{cell.label}</p>
                </div>
            ),
            xs: cell.xs,
        }));
    }, []);

    const takeInWorkHandler = useCallback(
        ({ isInWork, applicationId }) => {
            if (isPatchApplicationLoading || isChangeInWorkProccessing) {
                return;
            }
            setIsChangeInWorkProccessing(true);

            patchApplication({ id: applicationId, data: { in_work: !isInWork } });
        },
        [isPatchApplicationLoading, isChangeInWorkProccessing],
    );

    const onConfirmHandler = useCallback((id) => {
        dispatch(onConfirmDialogOpen(id));
    }, []);

    const onRejectHandler = useCallback((id) => {
        dispatch(onRejectDialogOpen(id));
    }, []);

    const onReject = useCallback((id) => {
        rejectApplication({
            id,
            data: { status: WHITE_LIST_APPLICATION_STATUSES.RED },
        });
    }, []);

    const onConfirm = useCallback((id) => {
        confirmApplication({
            id,
            data: { status: WHITE_LIST_APPLICATION_STATUSES.WHITE },
        });
    }, []);

    const closeRejectDialogHandler = useCallback(() => {
        dispatch(onRejectDialogClose());
    }, []);

    const closeConfirmDialogHandler = useCallback(() => {
        dispatch(onConfirmDialogClose());
    }, []);

    const bodyRowsArray = useMemo(() => {
        if (!applications || !applications.length) {
            return [];
        }

        const columns = Object.values(BODY_CELLS);

        const bodyRows = applications.map((a) => {
            const cellsArray = [];

            columns.forEach((name) => {
                const collection = collectionMap.get(a.collection_id);

                const metaData = META_DATA_FIELDS_ARR.map((key) => a[key]).filter((data) => data);
                // const metaData = META_DATA_FIELDS_ARR;

                switch (name) {
                    case BODY_CELLS.STATUS:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <StatusCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    circleColor={
                                        a.hide
                                            ? STATUSES_COLOR[
                                                  WHITE_LIST_APPLICATION_STATUSES.DELETED
                                              ]
                                            : STATUSES_COLOR[a.status]
                                    }
                                    value={a.hide ? 'deleted' : a.status}
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.NAME:
                        cellsArray.push({
                            label: name,
                            xs: 3,
                            component: (
                                <WithImageCell
                                    classes={{
                                        cellRoot: cnb(css[`${name}Cell`], css.cellRoot),
                                        imageRoot: css.imageRoot,
                                    }}
                                    imageUrl={collection && collection.logo}
                                    value={collection && collection.name}
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.USER:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <CustomCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                >
                                    <div className={css.userNameWrapper}>
                                        <OverflowTooltip
                                            placement="bottom"
                                            classes={{
                                                tooltip: css.tooltip,
                                            }}
                                            customClasses={{
                                                childrenWrapper: css.overflowedTextContainer,
                                            }}
                                            title={a.email}
                                            maxLines={1}
                                        >
                                            <span className={css.overflowedText}>{a.email}</span>
                                        </OverflowTooltip>
                                        <OverflowTooltip
                                            placement="bottom"
                                            classes={{
                                                tooltip: css.tooltip,
                                            }}
                                            customClasses={{
                                                childrenWrapper: css.overflowedTextContainer,
                                            }}
                                            title={a.discord_name}
                                            maxLines={1}
                                        >
                                            <span className={css.overflowedText}>
                                                {a.discord_name}
                                            </span>
                                        </OverflowTooltip>
                                    </div>
                                </CustomCell>
                            ),
                        });
                        return;
                    case BODY_CELLS.META_DATA:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <CustomCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                >
                                    {metaData.length > 0 ? (
                                        <Tooltip
                                            title={
                                                <div className={css.metaDataTooltip}>
                                                    <span className={css.tooltipContainer}>
                                                        {metaData.join(',\n')}
                                                    </span>
                                                </div>
                                            }
                                            disableFocusListener={
                                                metaData.length <= META_DATA_FIELDS_TO_SHOW_COUNT
                                            }
                                            disableHoverListener={
                                                metaData.length <= META_DATA_FIELDS_TO_SHOW_COUNT
                                            }
                                            placement="bottom"
                                        >
                                            <div className={css.firtsMetaDataElems}>
                                                {metaData
                                                    .slice(
                                                        0,
                                                        metaData.length >
                                                            META_DATA_FIELDS_TO_SHOW_COUNT
                                                            ? META_DATA_FIELDS_TO_SHOW_COUNT - 1
                                                            : META_DATA_FIELDS_TO_SHOW_COUNT,
                                                    )
                                                    .map((dataEl) => (
                                                        <span
                                                            key={`${a.id}_${dataEl}`}
                                                            className={css.overflowedEllipsis}
                                                        >
                                                            {dataEl}
                                                        </span>
                                                    ))}
                                                {metaData.length >
                                                    META_DATA_FIELDS_TO_SHOW_COUNT && (
                                                    <span className={css.extraMetadataCounter}>
                                                        +
                                                        {metaData.length -
                                                            META_DATA_FIELDS_TO_SHOW_COUNT}
                                                    </span>
                                                )}
                                            </div>
                                        </Tooltip>
                                    ) : (
                                        <span className={css.overflowedEllipsis}>No meta data</span>
                                    )}
                                </CustomCell>
                            ),
                        });
                        return;
                    case BODY_CELLS.WALLET:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <WalletCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    wallet={String(a.user_wallet)}
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.TIME:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <CommonCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    value={getAgoTimeFormat(
                                        new Date().getTime() - new Date(a.created_at).getTime(),
                                    )}
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.IN_WORK:
                        cellsArray.push({
                            label: name,
                            xs: 1,
                            horizontalPosition: 'center',
                            component: (
                                <CustomCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                >
                                    <IconButton
                                        onClick={() => {
                                            takeInWorkHandler({
                                                isInWork: a.in_work,
                                                applicationId: a.id,
                                            });
                                        }}
                                    >
                                        <Radio
                                            checked={a.in_work}
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 28,
                                                },
                                            }}
                                            classes={{
                                                root: css.radioRoot,
                                                checked: css.radioChecked,
                                            }}
                                        />
                                    </IconButton>
                                </CustomCell>
                            ),
                        });
                        return;
                    case BODY_CELLS.ACTION:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            horizontalPosition: 'center',
                            component: (
                                <ActionsCell
                                    classes={{ cellRoot: css.buttonsCell }}
                                    actionsComponent={
                                        <ActionComponent
                                            id={a.id}
                                            status={a.status}
                                            onConfirm={onConfirmHandler}
                                            onReject={onRejectHandler}
                                        />
                                    }
                                />
                            ),
                        });
                        return;
                    default:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <CommonCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    value={String(a[name])}
                                />
                            ),
                        });
                }
            });

            return {
                id: a.id,
                items: cellsArray,
            };
        });

        return bodyRows;
    }, [applications, collectionMap]);

    const handleChangePage = useCallback((_, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(1);
    }, []);

    useDebounce(
        () => {
            refetch({
                page,
                pageSize: rowsPerPage,
                sort: 'created_at',
            });
        },
        [page, rowsPerPage],
        500,
    );

    useLayoutEffect(() => {
        if (beforeTableDiv.current) {
            const offset = beforeTableDiv.current.getBoundingClientRect();
            setTableHeight(
                Number(window.innerHeight || 0) -
                    (Number(offset.bottom || 0) + TABLE_BOTTOM_MARGIN),
            );
        }
    }, [applications, collectionMap]);

    useEffect(() => {
        if (data && data.items) {
            setApplications(data.items);
            setCount(data.total);
            setIsChangeInWorkProccessing(false);
            patchApplicationReset();
        }
    }, [data]);

    useEffect(() => {
        if (collectionsData && collectionsData.results) {
            setCollectionMap(new Map(collectionsData.results.map((c) => [c.id, c])));
        }
    }, [collectionsData]);

    useEffect(() => {
        if (isPatchApplicationSuccess) {
            refetch({
                page,
                pageSize: rowsPerPage,
                sort: 'created_at',
            });
            setIsChangeInWorkProccessing(false);

            if (rejectedAplicationId) {
                addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    text: 'Account add to red successfuly',
                });
                closeRejectDialogHandler();
            }
        }
    }, [isPatchApplicationSuccess, rowsPerPage, page, rejectedAplicationId, confimedAplicationId]);

    useEffect(() => {
        if (patchApplicationError) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(patchApplicationError),
            });
            setIsChangeInWorkProccessing(false);
        }
    }, [patchApplicationError, rejectedAplicationId, confimedAplicationId]);

    // CONFIRM
    useEffect(() => {
        if (isConfirmApplicationSuccess && confimedAplicationId) {
            refetch({
                page,
                pageSize: rowsPerPage,
                sort: 'created_at',
            });
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Application confirmed successfuly',
            });
            closeConfirmDialogHandler();
            confirmApplicationReset();
        }
    }, [isConfirmApplicationSuccess, confimedAplicationId, page, rowsPerPage]);

    useEffect(() => {
        if (confirmApplicationError && confimedAplicationId) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(confirmApplicationError),
            });
            closeConfirmDialogHandler();
        }
    }, [confirmApplicationError, confimedAplicationId]);

    // REJECT
    useEffect(() => {
        if (isRejectApplicationSuccess && rejectedAplicationId) {
            refetch({
                page,
                pageSize: rowsPerPage,
                sort: 'created_at',
            });
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Application added to Red',
            });
            closeRejectDialogHandler();
            rejectApplicationReset();
        }
    }, [isRejectApplicationSuccess, rejectedAplicationId, page, rowsPerPage]);

    useEffect(() => {
        if (rejectApplicationError && rejectedAplicationId) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(rejectApplicationError),
            });
            closeRejectDialogHandler();
        }
    }, [rejectApplicationError, rejectApplicationError]);

    if (isLoading || isCollectionsLoading) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    }

    if (error) {
        return (
            <div>
                <span style={{ color: 'white' }}>{normilizeError(error)}</span>
            </div>
        );
    }

    return (
        <>
            <div className="whitelist__inner">
                <h2 className="statistics__title">Whitelist</h2>
                <div ref={beforeTableDiv} className={css.beforeTableElement} />
                <Table
                    tableHeight={tableHeight}
                    tableInfo={bodyRowsArray}
                    headerInfo={headerCellsArray}
                    count={count}
                    page={page - 1}
                    isLoading={isFetching}
                    isNoResultFound={!applications.length}
                    notFoundPlug={<div className={css.notFoundContainer}>No results found</div>}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            {isConfirmeApplicationOpen && (
                <ConfirmDialog
                    open={isConfirmeApplicationOpen}
                    isConfimationProccessing={isconfirmApplicationLoading}
                    onClose={closeConfirmDialogHandler}
                    onConfirm={onConfirm}
                    title={'Are you sure you want to approve application?'}
                />
            )}
            {isDeleteEntityOpen && (
                <DeleteEntityDialog
                    open={isDeleteEntityOpen}
                    isDeletationProccessing={isrejectApplicationLoading}
                    onClose={closeRejectDialogHandler}
                    onDelete={onReject}
                    deleteBtnText="Add to Red"
                    title={'Are you sure you want to add aplication to Red?'}
                />
            )}
        </>
    );
};

export default React.memo(WhiteList);

// {
//     "id": "275253ef-5b1b-4f91-b870-621f96d1f14c",
//     "collection_id": "5dfbc65f-0275-48ab-b3aa-edbe2d02897b",
//     "token_id": null,
//     "status": "white",
//     "user_wallet": "0x45bcd9a9c4c8ebd2d8c7d9dba8107a6dd47768fa",
//     "discord_name": "string",
//     "email": "user@example.com",
//     "field_1": null,
//     "field_2": null,
//     "field_3": null,
//     "field_4": null,
//     "field_5": null,
//     "field_6": null,
//     "field_7": null,
//     "field_8": null,
//     "field_9": null,
//     "field_10": null,
//     "description": null,
//     "number": 0,
//     "moderator_wallet": "0x45bcd9a9c4c8ebd2d8c7d9dba8107a6dd47768fa",
//     "in_work": true,
//     "hide": false,
//     "created_at": "2022-11-29T23:02:52.823617",
//     "updated_at": "2022-11-29T23:02:52.823655"
// }
