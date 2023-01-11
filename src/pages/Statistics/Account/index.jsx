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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteEntityDialog from '../../../components/DeleteEntityDialog/DeleteEntityDialog';
import { pagesSelectors } from '../../../redux/slices/pages';
import { onOpen, onClose } from '../../../redux/dialogs/deleteEntityDialog';
import WithImageCell from '../../../common/Table/cells/WithImageCell';
import { useDebounce } from '../../../hooks/useDebounce';
import { useGetAccountsQuery, useHideAccountMutation } from '../../../redux/api/dataService';
import ActionsComponent from '../ActionsComponent';
import { CommonCell, ActionsCell } from '../../../common/Table/cells';
import { Table } from '../../../common/Table';
import { normilizeError } from '../../../utils/http/normilizeError';
import CenteredContainer from '../../../common/CenteredContainer';
import Loader from '../../../common/Loader';
import {
    EDIT_ACCOUNT_PAGE,
    STATISTICS_ACCOUNT_COLLECTIONS_LIST,
} from '../../../const/http/CLIENT_URLS';
import { NotificationContext } from '../../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../../const/notifications/NOTIFICATION_TYPES';

import css from '../Statistics.module.css';

const HEDER_CELLS = {
    BRAND: 'Brand',
    COLLECTIONS: 'Collections',
    PROFITS: 'Profit',
    DESCRIPTION: 'Description',
    URL: 'Url',
    CATEGORY: 'Category',
    ACTION: 'Action',
};

const BODY_CELLS = {
    NAME: 'name',
    COLLECTIONS_COUNT: 'collections_count',
    PROFIT: 'profit',
    DESCRITPION: 'description',
    URL: 'url',
    CATEGORY: 'category',
    ACTION: 'action',
};

const HEADER_CELLS_ARR = [
    { label: HEDER_CELLS.BRAND, xs: 3 },
    { label: HEDER_CELLS.COLLECTIONS, xs: 2 },
    { label: HEDER_CELLS.PROFITS, xs: 2 },
    { label: HEDER_CELLS.DESCRIPTION, xs: 2 },
    { label: HEDER_CELLS.URL, xs: 2 },
    { label: HEDER_CELLS.CATEGORY, xs: 2 },
    { label: '', xs: 2, isAction: true },
];

const TABLE_BOTTOM_MARGIN = 20;

const AccountsList = () => {
    const { isOpen, id: deletedAccountId } = useSelector(state => state.deleteEntityDialog);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const beforeTableDiv = useRef(null);

    const pages = useSelector(pagesSelectors.selectAll);

    const [accounts, setAccounts] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [tableHeight, setTableHeight] = useState(0);

    const { data, error, isLoading, isFetching, refetch } = useGetAccountsQuery(
        {
            page,
            pageSize: rowsPerPage,
        },
        {
            pollingInterval: 300,
        },
    );

    const [
        hideAccount,
        {
            isSuccess,
            isLoading: isDeletationProccessing,
            error: hideAccountError,
            reset: resetDeletationState,
        },
    ] = useHideAccountMutation();

    const onEditHandler = useCallback(id => {
        navigate(EDIT_ACCOUNT_PAGE({ id }));
    }, []);

    const onDeleteHandler = useCallback(id => {
        hideAccount({ id, isHide: true });
    }, []);

    const onDeleteAccount = useCallback(id => {
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
        if (!accounts || !accounts.length) {
            return [];
        }

        const columns = Object.values(BODY_CELLS);

        const bodyRows = accounts.map(a => {
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
                                    imageUrl={a.logo}
                                    value={a.name}
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
                                            id={a.id}
                                            onEdit={onEditHandler}
                                            onDelete={onDeleteAccount}
                                        />
                                    }
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
                                    value={Number(a.profit)}
                                />
                            ),
                        });
                        return;
                    case BODY_CELLS.CATEGORY:
                        const currentPage = pages.find(p => p.id === a.page);

                        cellsArray.push({
                            label: name,
                            xs: 2,
                            component: (
                                <CommonCell
                                    classes={{ cellRoot: cnb(css[`${name}Cell`], css.cellRoot) }}
                                    value={String(currentPage ? currentPage.name : '-')}
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
                linkUrl: STATISTICS_ACCOUNT_COLLECTIONS_LIST({ accountId: a.id }),
                items: cellsArray,
            };
        });

        return bodyRows;
    }, [accounts, pages]);

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
    }, [accounts]);

    useEffect(() => {
        if (hideAccountError) {
            closeDialogHandler();
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(hideAccountError),
            });
        }
    }, [hideAccountError]);

    useEffect(() => {
        if (isSuccess && deletedAccountId) {
            setAccounts(p => p.filter(a => a.id !== deletedAccountId));

            closeDialogHandler();
            resetDeletationState();
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Account deleted successfuly',
            });
        }
    }, [isSuccess, deletedAccountId]);

    useEffect(() => {
        if (data && data.results) {
            setAccounts(data.results);
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
                <h2 className="statistics__title">Accounts</h2>
                <div ref={beforeTableDiv} className={css.beforeTableElement} />
                <Table
                    tableHeight={tableHeight}
                    tableInfo={bodyRowsArray}
                    headerInfo={headerCellsArray}
                    count={count}
                    page={page - 1}
                    isLoading={isFetching}
                    isNoResultFound={!accounts.length}
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
                    title={'Are you sure you want to delete acсount?'}
                />
            )}
        </>
    );
};

export default React.memo(AccountsList);
// [
//     {
//         "id": "be2d2b80-1e84-4778-832b-793be9c28c0f",
//         "payment_tokens": [
//             {
//                 "id": "f56d23c1-5e64-4bf6-9a24-43bbf4c2b6ea",
//                 "name": "ETH1",
//                 "smart_contract_address": "1111111111111111111",
//                 "blockchain": "11643bd9-183e-48bc-bad8-07e54c810bc1"
//             }
//         ],
//         "blockchain": {
//             "id": "11643bd9-183e-48bc-bad8-07e54c810bc1",
//             "name": "Ethereum"
//         },
//         "hide": false,
//         "created_at": "2022-12-13T13:14:16.845565Z",
//         "link_opensea": "",
//         "link_discord": "",
//         "link_instagram": "",
//         "link_medium": null,
//         "link_twitter": "",
//         "type": "standard",
//         "logo": "https://gateway.storjshare.io/demo-bucket/collections/004.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221217%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221217T154257Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=f2ebee5fb85a66a448c87791bd96e658279a7717173c2e559391cae05a1998c1",
//         "featured": "https://gateway.storjshare.io/demo-bucket/collections/001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221217%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221217T154257Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=06bc19f28eb1cdd55c08cf6af8dc41e4e45189446c50bdae1b22656b0f464087",
//         "banner": "https://gateway.storjshare.io/demo-bucket/collections/005.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221217%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221217T154257Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=bf47fae583179e7e833400dc268daddcf9c72e6e5035286ca54185012c78099b",
//         "name": "e2222222eeee2222",
//         "url": "weq",
//         "url_opensea": "ewqe",
//         "category_opensea": "Art",
//         "percentage_fee": "5.00000000",
//         "display_theme": "padded",
//         "description": "ewq",
//         "upload_blockchain": false,
//         "smart_contract_address": "wqewq",
//         "items_count": 2,
//         "owners_count": 0,
//         "floor_price_count": "0.10000000",
//         "volume_troded_count": "0.00000000",
//         "profit": "0.20000000",
//         "creator_profit": "0.00000000",
//         "creator_fee": "0.00000000",
//         "page": "b0a17740-2c89-4973-8b7d-32b23f41c8c4",
//         "account": "0f10c95d-7a70-42d7-ae8b-ef1c8b9968f6"
//     }
// ]
