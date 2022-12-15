import React from 'react';

const WithImageCell = props => {
    const { imageUrl, classes, value } = props;

    return (
        <div className={classes.cellRoot}>
            <img src={imageUrl} className={classes.image} />
            <span className={css.bodyCellText}>{value || '-'}</span>
        </div>
    );
};

export default React.memo(WithImageCell);
