import React from 'react';

import css from '../Table.module.css';

const WithImageCell = props => {
    const { imageUrl, classes, value } = props;

    return (
        <div className={classes.cellRoot}>
            <img src={imageUrl} className={classes.imageRoot} />
            <span className={css.bodyCellText}>{value || '-'}</span>
        </div>
    );
};

export default React.memo(WithImageCell);
