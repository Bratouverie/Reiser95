import React from 'react';

import css from '../Table.module.css';

const CustomCell = (props) => {
    const { children, classes } = props;

    return <div className={classes.cellRoot}>{children}</div>;
};

export default React.memo(CustomCell);
