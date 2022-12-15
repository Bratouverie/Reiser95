import React, { useMemo } from 'react';
import { cnb } from 'cnbuilder';
import { Paginator } from '../Paginator';
import { Grid } from '@mui/material';
import TableRowComponent from './TableRowComponent';
import { Loader } from '../Loader';

import css from './Table.module.css';

// type Props = {
//   tableInfo: BodyRow[];
//   headerInfo: HeaderCell[];
//   tableHeight?: number;
//   rowsPerPageOptions?: number[];
//   count?: number;
//   rowsPerPage?: number;
//   page: number;
//   notFoundPlug: React.ReactNode;
//   isNoResultFound?: boolean;
//   isLoading?: boolean;
//   classes?: {
//     tableRowRoot?: string;
//   };
//   onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => void;
//   onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// };

const Table = props => {
    const {
        tableHeight,
        tableInfo,
        headerInfo,
        rowsPerPageOptions = [10, 25, 50],
        count = 0,
        rowsPerPage = 10,
        page,
        notFoundPlug,
        isNoResultFound,
        isLoading,
        classes,
        onPageChange,
        onRowsPerPageChange,
    } = props;

    const tableContent = useMemo(() => {
        if (isLoading) {
            return (
                <div className={css.centeredContainer}>
                    <Loader />
                </div>
            );
        }

        if (isNoResultFound) {
            return <div className={css.centeredContainer}>{notFoundPlug}</div>;
        }

        return (
            <>
                {tableInfo.map(row => (
                    <TableRowComponent
                        key={row.id}
                        row={row}
                        classes={{ tableRowRoot: classes?.tableRowRoot }}
                    />
                ))}
            </>
        );
    }, [isLoading, isNoResultFound, notFoundPlug, tableInfo, classes]);

    const isPaginationNeeded = useMemo(() => {
        const totalPages = count / rowsPerPage;

        return totalPages > 1;
    }, [count, rowsPerPage]);

    return (
        <div className={css.tablewWrapper}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                wrap="nowrap"
                style={{
                    height: `${tableHeight}px` || '100%',
                }}
                className={css.tableContainer}
            >
                <Grid container direction="column" wrap="nowrap" className={css.table}>
                    <Grid
                        item
                        container
                        direction="row"
                        wrap="nowrap"
                        justifyContent="space-between"
                        className={css.headerRow}
                    >
                        {headerInfo.map(info => (
                            <Grid
                                item
                                container
                                xs={info.xs}
                                className={cnb(css.header, info.cellStyles)}
                                key={info.label}
                            >
                                {info.labelComponent || info.label}
                            </Grid>
                        ))}
                    </Grid>
                    <Grid
                        item
                        container
                        direction="column"
                        wrap="nowrap"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        className={css.tableBody}
                    >
                        {tableContent}
                    </Grid>
                    {!isNoResultFound && isPaginationNeeded && (
                        <div className={css.paginatorWrapper}>
                            <Paginator
                                rowsPerPageOptions={rowsPerPageOptions}
                                count={count}
                                classes={{
                                    root: css.pagination,
                                    toolbar: css.paginationToolbar,
                                }}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={onPageChange}
                                onRowsPerPageChange={onRowsPerPageChange}
                            />
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default React.memo(Table);
