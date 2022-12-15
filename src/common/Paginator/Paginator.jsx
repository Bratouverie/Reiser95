import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { cnb } from 'cnbuilder';

import { TablePaginationActions } from './TablePaginationActions';

import css from './Paginator.module.scss';

// type Props = {
//   classes?: {
//     root?: string;
//     toolbar?: string;
//     selectLabel?: string;
//     select?: string;
//     spacer?: string;
//     displayedRows?: string;
//   };
//   SelectProps?: {
//     className?: string;
//   };
//   rowsPerPageOptions?: number[];
//   count: number;
//   rowsPerPage: number;
//   page: number;
//   onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
//   onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// };

const Paginator = props => {
    const {
        count,
        classes,
        rowsPerPageOptions,
        SelectProps,
        rowsPerPage,
        page,
        onPageChange,
        onRowsPerPageChange,
    } = props;

    return (
        <TablePagination
            classes={{
                root: cnb(css.paginationRoot, classes.root),
                toolbar: cnb(css.paginationToolbar, classes.toolbar),
                selectLabel: cnb(css.paginationSelectLabel, classes.selectLabel),
                select: cnb(css.paginationSelect, classes.select),
                spacer: cnb(css.paginationSpacer, classes.spacer),
                displayedRows: cnb(css.paginationDisplayedRows, classes.displayedRows),
            }}
            SelectProps={{
                className: cnb(css.paginationSelectRoot, SelectProps.className),
            }}
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            ActionsComponent={TablePaginationActions}
        />
    );
};

export default React.memo(Paginator);
