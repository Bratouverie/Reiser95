import React, {
    useMemo,
    useRef,
    useState,
    useLayoutEffect,
    useCallback,
    useEffect,
    useContext,
} from 'react';
import { format } from 'date-fns';
import { cnb } from 'cnbuilder';
import { useDispatch, useSelector } from 'react-redux';
import DeleteEntityDialog from '../../../components/DeleteEntityDialog/DeleteEntityDialog';
import { onOpen, onClose } from '../../../redux/dialogs/deleteEntityDialog';
import WithImageCell from '../../../common/Table/cells/WithImageCell';
import { useDebounce } from '../../../hooks/useDebounce';
import {
    useGetFilteredCollectionQuery,
    useHideCollectionMutation,
} from '../../../redux/api/dataService';
import ActionsComponent from '../ActionsComponent';
import { CommonCell, ActionsCell } from '../../../common/Table/cells';
import { Table } from '../../../common/Table';
import { normilizeError } from '../../../utils/http/normilizeError';
import CenteredContainer from '../../../common/CenteredContainer';
import Loader from '../../../common/Loader';
import { useParams } from 'react-router-dom';
import { STATISTICS_COLLECTION_PACKS_LIST } from '../../../const/http/CLIENT_URLS';
import { NotificationContext } from '../../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../../const/notifications/NOTIFICATION_TYPES';

import css from '../Statistics.module.css';

const HEDER_CELLS = {
    STATUS: 'Status',
    NAME: 'Name',
    ITEMS: 'Items',
    PROFIT: 'Profit',
    BLOCKCHAIN: 'Blockchain',
    CREATOR_FEE: 'Creator fee',
    LISTED: 'Listed',
    ACTION: 'Action',
};

const BODY_CELLS = {
    STATUS: 'status',
    NAME: 'name',
    ITEMS: 'items_count',
    PROFIT: 'profit',
    BLOCKCHAIN: 'blockchain',
    CREATOR_FEE: 'creator_fee',
    LISTED: 'created_at',
    ACTION: 'action',
};

const HEADER_CELLS_ARR = [
    { label: HEDER_CELLS.STATUS, xs: 2 },
    { label: HEDER_CELLS.NAME, xs: 3 },
    { label: HEDER_CELLS.ITEMS, xs: 2 },
    { label: HEDER_CELLS.PROFIT, xs: 2 },
    { label: HEDER_CELLS.BLOCKCHAIN, xs: 2 },
    { label: HEDER_CELLS.CREATOR_FEE, xs: 2 },
    { label: HEDER_CELLS.LISTED, xs: 2 },
    { label: '', xs: 2, isAction: true },
];

const TABLE_BOTTOM_MARGIN = 20;

const CollectionsList = () => {
    const { accountId } = useParams();

    const { isOpen, id: deletedCollectionId } = useSelector(state => state.deleteEntityDialog);

    const dispatch = useDispatch();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const beforeTableDiv = useRef(null);

    const [collections, setCollections] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [tableHeight, setTableHeight] = useState(0);

    const { data, error, isLoading, isFetching, refetch } = useGetFilteredCollectionQuery({
        page,
        pageSize: rowsPerPage,
        accountId,
    });

    const [
        hideCollection,
        {
            isSuccess,
            isLoading: isDeletationProccessing,
            error: hideCollectionError,
            reset: resetDeletationState,
        },
    ] = useHideCollectionMutation();

    const onEditHandler = useCallback(id => {
        console.log({ id });
    }, []);

    const onDeleteHandler = useCallback(id => {
        console.log({ id });
        hideCollection({ id, isHide: true });
    }, []);

    const onDeleteCollection = useCallback(id => {
        console.log({ id });
        dispatch(onOpen(id));
    }, []);

    const closeDialogHandler = useCallback(() => {
        dispatch(onClose());
    }, []);

    const headerCellsArray = useMemo(() => {
        return HEADER_CELLS_ARR.map(cell => ({
            label: cell.label,
            labelComponent: (
                <div className={css.headingCellBox}>
                    <span className={css.headerText}>{cell.label}</span>
                </div>
            ),
            xs: cell.xs,
        }));
    }, []);

    const bodyRowsArray = useMemo(() => {
        if (!collections || !collections.length) {
            return [];
        }
        const columns = Object.values(BODY_CELLS);

        const bodyRows = collections.map(c => {
            const cellsArray = [];

            columns.forEach(name => {
                switch (name) {
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
                                    imageUrl={c.logo}
                                    value={c.name}
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.ACTION:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            disableRowClickEvent: true,
                            horizontalPosition: 'flex-end',
                            component: (
                                <ActionsCell
                                    classes={{ cellRoot: css.buttonsCell }}
                                    actionsComponent={
                                        <ActionsComponent
                                            id={c.id}
                                            onEdit={onEditHandler}
                                            onDelete={onDeleteCollection}
                                        />
                                    }
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.BLOCKCHAIN:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <CommonCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    value={String(c.blockchain.name)}
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.PROFIT:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <CommonCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    value={`${Number(c.profit)} ${
                                        c.payment_tokens.length ? c.payment_tokens[0].name : '---'
                                    }`}
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.LISTED:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <CommonCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    value={format(new Date(c.created_at), 'dd MMM yyyy')}
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
                                    value={c[name]}
                                />
                            ),
                        });
                }
            });

            return {
                id: c.id,
                linkUrl: STATISTICS_COLLECTION_PACKS_LIST({ accountId, collectionId: c.id }),
                items: cellsArray,
            };
        });

        return bodyRows;
    }, [collections, accountId]);

    const handleChangePage = useCallback((_, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(Number(event.target.value));
        setPage(1);
    };

    useDebounce(
        () => {
            refetch({
                page,
                pageSize: rowsPerPage,
                accountId,
            });
        },
        [page, rowsPerPage, accountId],
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
    }, [collections]);

    useEffect(() => {
        if (hideCollectionError) {
            console.log({ hideCollectionError });
            closeDialogHandler();
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(hideCollectionError),
            });
        }
    }, [hideCollectionError]);

    useEffect(() => {
        if (isSuccess && deletedCollectionId) {
            setCollections(p => p.filter(c => c.id !== deletedCollectionId));

            closeDialogHandler();
            resetDeletationState();
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Collection deleted successfuly',
            });
        }
    }, [isSuccess, deletedCollectionId]);

    useEffect(() => {
        if (data && data.results) {
            setCollections(data.results);
            setCount(data.count);
        }
    }, [data]);

    if (isLoading) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    }

    if (error || isLoading) {
        return (
            <div>
                <span style={{ color: 'white' }}>{normilizeError(error)}</span>
            </div>
        );
    }

    return (
        <>
            <div className="statistics__inner">
                <h2 className="statistics__title">Collections</h2>
                <div ref={beforeTableDiv} className={css.beforeTableElement} />
                <Table
                    tableHeight={tableHeight}
                    tableInfo={bodyRowsArray}
                    headerInfo={headerCellsArray}
                    count={count}
                    page={page - 1}
                    isLoading={isFetching}
                    isNoResultFound={!collections.length}
                    notFoundPlug={<div className={css.notFoundContainer}>No results found</div>}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            {isOpen && (
                <DeleteEntityDialog
                    open={isOpen}
                    isDeletationProccessing={isDeletationProccessing}
                    onClose={closeDialogHandler}
                    onDelete={onDeleteHandler}
                    title={'Are you sure you want to delete collection?'}
                />
            )}
        </>
    );
};

export default React.memo(CollectionsList);
