import React, {
    useMemo,
    useRef,
    useState,
    useLayoutEffect,
    useCallback,
    useEffect,
    useContext,
} from 'react';
import { cnb } from 'cnbuilder';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DeleteEntityDialog from '../../../components/DeleteEntityDialog/DeleteEntityDialog';
import { onOpen, onClose } from '../../../redux/dialogs/deleteEntityDialog';
import WithImageCell from '../../../common/Table/cells/WithImageCell';
import { useDebounce } from '../../../hooks/useDebounce';
import { useGetFilteredPacksQuery, useHidePackMutation } from '../../../redux/api/dataService';
import ActionsComponent from '../ActionsComponent';
import { CommonCell, ActionsCell, WithOverflowWrapperCell } from '../../../common/Table/cells';
import { Table } from '../../../common/Table';
import { normilizeError } from '../../../utils/http/normilizeError';
import CenteredContainer from '../../../common/CenteredContainer';
import Loader from '../../../common/Loader';
import { EDIT_PACK_PAGE, STATISTICS_PACK_TOKENS_LIST } from '../../../const/http/CLIENT_URLS';
import { NotificationContext } from '../../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../../const/notifications/NOTIFICATION_TYPES';

import css from '../Statistics.module.css';

const HEDER_CELLS = {
    STATUS: 'Status',
    NAME: 'Name',
    ITEMS: 'Items',
    PROFIT: 'Profit',
    PROPERTIES: 'Properties',
    BLOCKCHAIN: 'Blockchain',
    ACTION: 'Action',
};

const BODY_CELLS = {
    STATUS: 'status',
    NAME: 'name',
    ITEMS: 'items_count',
    PROFIT: 'profit',
    PROPERTIES: 'properties',
    BLOCKCHAIN: 'blockchain',
    ACTION: 'action',
};

const HEADER_CELLS_ARR = [
    { label: HEDER_CELLS.STATUS, xs: 2 },
    { label: HEDER_CELLS.NAME, xs: 3 },
    { label: HEDER_CELLS.ITEMS, xs: 2 },
    { label: HEDER_CELLS.PROFIT, xs: 2 },
    { label: HEDER_CELLS.PROPERTIES, xs: 2 },
    { label: HEDER_CELLS.BLOCKCHAIN, xs: 2 },
    { label: '', xs: 2, isAction: true },
];

const TABLE_BOTTOM_MARGIN = 20;

const PacksList = () => {
    const { accountId, collectionId } = useParams();

    const { isOpen, id: deletedPackId } = useSelector(state => state.deleteEntityDialog);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const beforeTableDiv = useRef(null);

    const [packs, setPacks] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [tableHeight, setTableHeight] = useState(0);

    const { data, error, isLoading, isFetching, refetch } = useGetFilteredPacksQuery(
        {
            page,
            pageSize: rowsPerPage,
            collectionId,
        },
        { pollingInterval: 300 },
    );

    const [
        hidePack,
        {
            isSuccess,
            isLoading: isDeletationProccessing,
            error: hidePackError,
            reset: resetDeletationState,
        },
    ] = useHidePackMutation();

    const onEditHandler = useCallback(id => {
        navigate(EDIT_PACK_PAGE({ id }));
    }, []);

    const onDeleteHandler = useCallback(id => {
        hidePack({ id, isHide: true });
    }, []);

    const onDeletePack = useCallback(id => {
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
        if (!packs || !packs.length) {
            return [];
        }
        const columns = Object.values(BODY_CELLS);

        const bodyRows = packs.map(p => {
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
                                    imageUrl={p.logo}
                                    value={p.name}
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
                                            id={p.id}
                                            onEdit={onEditHandler}
                                            onDelete={onDeletePack}
                                        />
                                    }
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.PROPERTIES:
                        const propertiesStr = p.properties
                            .map(prop => (prop.type ? `${prop.type}/${prop.name}` : prop))
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
                    case BODY_CELLS.BLOCKCHAIN:
                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <CommonCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    value={String(p.blockchain && p.blockchain.name)}
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
                                    value={`${Number(p.profit)} ${
                                        p.payment_tokens && p.payment_tokens.length
                                            ? p.payment_tokens[0].name
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
                                    value={p[name]}
                                />
                            ),
                        });
                }
            });

            return {
                id: p.id,
                linkUrl: STATISTICS_PACK_TOKENS_LIST({
                    accountId,
                    collectionId,
                    packId: p.id,
                }),
                items: cellsArray,
            };
        });

        return bodyRows;
    }, [packs, accountId, collectionId]);

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
    }, [packs]);

    useEffect(() => {
        if (hidePackError) {
            closeDialogHandler();
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(hidePackError),
            });
        }
    }, [hidePackError]);

    useEffect(() => {
        if (isSuccess && deletedPackId) {
            setPacks(p => p.filter(pack => pack.id !== deletedPackId));

            closeDialogHandler();
            resetDeletationState();
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Pack deleted successfuly',
            });
        }
    }, [isSuccess, deletedPackId]);

    useEffect(() => {
        if (data && data.results) {
            setPacks(data.results);
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
                <h2 className="statistics__title">Packs</h2>
                <div ref={beforeTableDiv} className={css.beforeTableElement} />
                <Table
                    tableHeight={tableHeight}
                    tableInfo={bodyRowsArray}
                    headerInfo={headerCellsArray}
                    count={count}
                    page={page - 1}
                    isLoading={isFetching}
                    isNoResultFound={!packs.length}
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
                    title={'Are you sure you want to delete pack?'}
                />
            )}
        </>
    );
};

export default React.memo(PacksList);
