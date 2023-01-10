import React from 'react';

import css from '../Table.module.css';

// type Props = {
//   value?: string;
//   classes?: {
//     cellRoot?: string;
//   };
// };

const StatusCell = (props) => {
    const { value, circleColor, classes } = props;

    return (
        <div className={classes.cellRoot}>
            <div className={css.statusCircle} style={{ background: circleColor }} />
            <span className={css.bodyCellText}>{value || '---'}</span>
        </div>
    );
};

export default React.memo(StatusCell);
