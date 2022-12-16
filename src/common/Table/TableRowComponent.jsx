import React, { useCallback } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { cnb } from 'cnbuilder';

import css from './Table.module.css';

// type Props = {
//   row: BodyRow;
//   classes?: {
//     tableRowRoot?: string;
//   };
// };

const TableRowComponent = props => {
    const { row, classes = {} } = props;

    const navigate = useNavigate();

    const mouseDownHandler = useCallback(
        event => {
            if (!row.linkUrl) {
                return;
            }
            const link = `${row.linkUrl}`;
            if (event.button === 1) {
                event.preventDefault();
                if (window.open(link, '_blank')) {
                    window.open(link, '_blank').focus();
                }
            }
            if (event.button == 2) {
                event.preventDefault();
                if (window.open(link, '_blank')) {
                    window.open(link, '_blank').focus();
                }
            }
        },
        [row.linkUrl],
    );

    const onTableRowClick = useCallback(() => {
        if (row.linkUrl) {
            navigate(row.linkUrl);
        }
    }, [row.linkUrl]);

    return (
        <Grid
            item
            container
            direction="row"
            wrap="nowrap"
            justifyContent="space-between"
            alignItems="flex-start"
            className={cnb(css.tableRow, classes.tableRowRoot, {
                [css.rowHoverEffect]: row.linkUrl,
            })}
            onMouseDown={mouseDownHandler}
            onClick={onTableRowClick}
        >
            {row.items.map(item => (
                <Grid
                    key={`${row.id}_${item.label}`}
                    item
                    container
                    alignItems={item.verticalPosition || 'center'}
                    justifyContent={item.horizontalPosition || 'flex-start'}
                    xs={item.xs}
                    className={css.cellWrapper}
                >
                    {item.component}
                </Grid>
            ))}
        </Grid>
    );
};

export default React.memo(TableRowComponent);
