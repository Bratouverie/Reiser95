import { cnb } from 'cnbuilder';
import React from 'react';
import { OverflowTooltip } from '../../OverflowTooltip';

import css from '../Table.module.css';

const WithImageCell = (props) => {
    const { imageUrl, classes, value } = props;

    return (
        <div className={cnb(classes.cellRoot, css.withImgCell)}>
            <img src={imageUrl} className={classes.imageRoot} />
            <OverflowTooltip
                placement="bottom"
                classes={{
                    tooltip: css.tooltip,
                }}
                customClasses={{
                    childrenWrapper: css.nameOverflowWrapper,
                }}
                title={value}
                maxLines={1}
            >
                <span className={css.overflowWrapper}>{value || '-'}</span>
            </OverflowTooltip>
        </div>
    );
};

export default React.memo(WithImageCell);
