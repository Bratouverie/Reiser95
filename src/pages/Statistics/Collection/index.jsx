import React from 'react';
import WithImageCell from '../../../common/Table/cells/WithImageCell';
import { useDebounce } from '../../../hooks/useDebounce';
import ActionsComponent from '../ActionsComponent';
import { CommonCell, ActionsCell } from '../../../common/Table/cells';
import { Table } from '../../../common/Table';
import { normilizeError } from '../../../utils/http/normilizeError';
import CenteredContainer from '../../../common/CenteredContainer';
import Loader from '../../../common/Loader';
import { STATISTICS_COLLECTION_PACKS_LIST } from '../../../const/http/CLIENT_URLS';
import css from '../Statistics.module.css';
import { useGetFilteredCollectionQuery } from '../../../redux/api/dataService';

const HEDER_CELLS = {
    BRAND: 'Brand',
    COLLECTIONS: 'Collections',
    PROFITS: 'Profit',
    DESCRIPTION: 'Description',
    URL: 'Url',
    CATEGORY: 'Category',
    ADMINISTRATOR: 'Administrator',
    BIRTH: 'Birth',
    ACTION: 'Action',
};

const BODY_CELLS = {
    NAME: 'name',
    COLLECTIONS_COUNT: 'collections_count',
    PROFIT: 'profit',
    DESCRITPION: 'description',
    URL: 'url',
    CATEGORY: 'name',
    ADMINISTRATOR: 'name',
    BIRTH: 'name',
    ACTION: 'action',
};

const HEADER_CELLS_ARR = [
    { label: HEDER_CELLS.BRAND, xs: 3 },
    { label: HEDER_CELLS.COLLECTIONS, xs: 2 },
    { label: HEDER_CELLS.PROFITS, xs: 2 },
    { label: HEDER_CELLS.DESCRIPTION, xs: 2 },
    { label: HEDER_CELLS.URL, xs: 2 },
    { label: HEDER_CELLS.CATEGORY, xs: 2 },
    { label: HEDER_CELLS.ADMINISTRATOR, xs: 2 },
    { label: HEDER_CELLS.BIRTH, xs: 2 },
    { label: '', xs: 2, isAction: true },
];

const TABLE_BOTTOM_MARGIN = 20;

const CollectionsList = () => {
    const { accountId } = useParams();

    const beforeTableDiv = useRef(null);

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [tableHeight, setTableHeight] = useState(0);
    const { data: collections, error, isLoading, refetch } = useGetFilteredCollectionQuery({
        page,
        pageSize: rowsPerPage,
        accountId,
    });

    const onEditHandler = useCallback(id => {
        console.log({ id });
    }, []);

    const onDeleteHandler = useCallback(id => {
        console.log({ id });
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
                                    classes={{ cellRoot: css[`${name}Cell`] }}
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
                            horizontalPosition: 'center',
                            component: (
                                <ActionsCell
                                    classes={{ cellRoot: css.buttonsCell }}
                                    actionsComponent={
                                        <ActionsComponent
                                            id={c.id}
                                            onEdit={onEditHandler}
                                            onDelete={onDeleteHandler}
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
                                    classes={{ cellRoot: css[`${name}Cell`] }}
                                    value={String(a[name])}
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

    console.log({ error });

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
        <div className="statistics__inner">
            <h2 className="statistics__title">Collections</h2>
            <div ref={beforeTableDiv} className={css.beforeTableElement} />
            <Table
                tableHeight={tableHeight}
                tableInfo={bodyRowsArray}
                headerInfo={headerCellsArray}
                count={collections.count}
                page={page - 1}
                isLoading={isLoading}
                isNoResultFound={!collections.length}
                notFoundPlug={<div className={css.notFoundContainer}>No results found</div>}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default React.memo(CollectionsList);
