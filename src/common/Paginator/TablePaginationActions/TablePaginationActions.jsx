import React, { useCallback, useMemo } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import css from './TablePaginationActions.module.css';

// interface Props {
//   count: number;
//   page: number;
//   rowsPerPage: number;
//   onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
// }

const TablePaginationActions = props => {
    const { count, page, rowsPerPage, onPageChange } = props;

    const pageCount = useMemo(() => {
        return Math.ceil(count / rowsPerPage);
    }, [count, rowsPerPage]);

    const handleChange = useCallback(
        (_, value) => {
            onPageChange(null, value);
        },
        [onPageChange],
    );

    return (
        <Pagination
            className={css.container}
            classes={{
                ul: css.navList,
            }}
            count={pageCount}
            page={page + 1}
            siblingCount={0}
            onChange={handleChange}
            renderItem={item => (
                <PaginationItem
                    {...item}
                    classes={{
                        page: css.page,
                        previousNext: css.button,
                        selected: css.selected,
                        root: css.root,
                    }}
                />
            )}
        />
    );
};

export default React.memo(TablePaginationActions);
