import React from 'react';

import css from '../Table.module.css';

// type Props = {
//   value?: string;
//   classes?: {
//     cellRoot?: string;
//   };
// };

const CommonCell = props => {
    const { value, classes } = props;

    return (
        <div className={classes.cellRoot}>
            <span className={css.bodyCellText}>{value || '-'}</span>
        </div>
    );
};

export default React.memo(CommonCell);
