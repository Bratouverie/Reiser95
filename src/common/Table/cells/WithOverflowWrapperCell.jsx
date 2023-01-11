import React from 'react';
import { OverflowTooltip } from '../../OverflowTooltip';

import css from '../Table.module.css';

const WithOverflowWrapperCell = (props) => {
    const { value, classes } = props;

    return (
        <OverflowTooltip
            placement="bottom"
            classes={{
                tooltip: css.tooltip,
            }}
            customClasses={{
                childrenWrapper: classes.cellRoot,
            }}
            title={value}
            maxLines={1}
        >
            <span className={css.overflowWrapper}>{value || '---'}</span>
        </OverflowTooltip>
    );
};

export default React.memo(WithOverflowWrapperCell);
