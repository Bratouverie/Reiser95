import React, {
    useMemo,
    useRef,
    useState,
    useLayoutEffect,
    useCallback,
    useEffect,
    useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cnb } from 'cnbuilder';
import DeleteEntityDialog from '../../../components/DeleteEntityDialog/DeleteEntityDialog';
import { onOpen, onClose } from '../../../redux/dialogs/deleteEntityDialog';
import { useParams } from 'react-router-dom';
import {
    WithImageCell,
    WithOverflowWrapperCell,
    CommonCell,
    ActionsCell,
} from '../../../common/Table/cells';
import { useDebounce } from '../../../hooks/useDebounce';
import { useGetFilteredTokensQuery, useHideTokenMutation } from '../../../redux/api/dataService';
import ActionsComponent from '../ActionsComponent';
import { Table } from '../../../common/Table';
import { normilizeError } from '../../../utils/http/normilizeError';
import CenteredContainer from '../../../common/CenteredContainer';
import Loader from '../../../common/Loader';
import { NotificationContext } from '../../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../../const/notifications/NOTIFICATION_TYPES';

import css from '../Statistics.module.css';

const HEDER_CELLS = {
    STATUS: 'Status',
    NAME: 'Name',
    ITEMS: 'Items',
    PROFIT: 'Profit',
    DESCRIPTION: 'Description',
    PROPERTIES: 'Properties',
    BLOCKCHAIN: 'Blockchain',
    ACTION: 'Action',
};

const BODY_CELLS = {
    STATUS: 'status',
    NAME: 'name',
    ITEMS: 'items_count',
    PROFIT: 'profit',
    DESCRIPTION: 'description',
    PROPERTIES: 'properties',
    BLOCKCHAIN: 'blockchain',
    ACTION: 'action',
};

const HEADER_CELLS_ARR = [
    { label: HEDER_CELLS.STATUS, xs: 2 },
    { label: HEDER_CELLS.NAME, xs: 3 },
    { label: HEDER_CELLS.ITEMS, xs: 2 },
    { label: HEDER_CELLS.PROFIT, xs: 2 },
    { label: HEDER_CELLS.DESCRIPTION, xs: 2 },
    { label: HEDER_CELLS.PROPERTIES, xs: 2 },
    { label: HEDER_CELLS.BLOCKCHAIN, xs: 2 },
    { label: '', xs: 2, isAction: true },
];

const TABLE_BOTTOM_MARGIN = 20;

const TokensList = () => {
    const { packId } = useParams();

    const { isOpen, id: deletedTokenId } = useSelector(state => state.deleteEntityDialog);

    const dispatch = useDispatch();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const beforeTableDiv = useRef(null);

    const [tokens, setTokens] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [tableHeight, setTableHeight] = useState(0);

    const { data, error, isLoading, isFetching, refetch } = useGetFilteredTokensQuery(
        {
            page,
            pageSize: rowsPerPage,
            packId,
        },
        { pollingInterval: 300 },
    );

    const [
        hideToken,
        {
            isSuccess,
            isLoading: isDeletationProccessing,
            error: hideTokenError,
            reset: resetDeletationState,
        },
    ] = useHideTokenMutation();

    const onEditHandler = useCallback(id => {
        console.log({ id });
    }, []);

    const onDeleteHandler = useCallback(id => {
        hideToken({ id, isHide: true });
    }, []);

    const onDeleteToken = useCallback(id => {
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
        if (!tokens || !tokens.length) {
            return [];
        }
        const columns = Object.values(BODY_CELLS);

        const bodyRows = tokens.map(t => {
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
                                    imageUrl={t.file_1}
                                    value={t.name}
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
                                            id={t.id}
                                            onEdit={onEditHandler}
                                            onDelete={onDeleteToken}
                                        />
                                    }
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.PROPERTIES:
                        const propertiesStr = t.properties
                            .map(t => (t.type ? `${t.type}/${t.name}` : t))
                            .join(', ');
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <WithOverflowWrapperCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    value={propertiesStr}
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.DESCRIPTION:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <WithOverflowWrapperCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    value={t.description}
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
                                    value={String(t.blockchain && t.blockchain.name)}
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
                                    value={`${Number(t.profit)} ${
                                        t.payment_tokens && t.payment_tokens.length
                                            ? t.payment_tokens[0].name
                                            : '---'
                                    }`}
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
                                    value={t[name]}
                                />
                            ),
                        });
                }
            });

            return {
                id: t.id,
                items: cellsArray,
            };
        });

        return bodyRows;
    }, [tokens]);

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
    }, [tokens]);

    useEffect(() => {
        if (data && data.results) {
            setTokens(data.results);
            setCount(data.count);
        }
    }, [data]);

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
            setTokens(p => p.filter(t => t.id !== deletedTokenId));

            resetDeletationState();
            closeDialogHandler();
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Token deleted successfuly',
            });
        }
    }, [isSuccess, deletedTokenId]);

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
                <h2 className="statistics__title">Tokens</h2>
                <div ref={beforeTableDiv} className={css.beforeTableElement} />
                <Table
                    tableHeight={tableHeight}
                    tableInfo={bodyRowsArray}
                    headerInfo={headerCellsArray}
                    count={count}
                    page={page - 1}
                    isLoading={isFetching}
                    isNoResultFound={!tokens.length}
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
                    title={'Are you sure you want to delete token?'}
                />
            )}
        </>
    );
};

export default React.memo(TokensList);
