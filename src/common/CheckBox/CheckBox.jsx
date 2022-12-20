import React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import CropSquareIcon from '@mui/icons-material/CropSquare';

import styles from './CheckBox.module.css';

const CheckBox = props => {
    const {
        className,
        checked,
        defaultChecked,
        disableRipple,
        required,
        disabled,
        ariaLabel,
        classes = {},
    } = props;

    return (
        <MuiCheckbox
            className={className}
            checked={checked}
            required={required}
            disabled={disabled}
            disableRipple={disableRipple}
            defaultChecked={defaultChecked}
            icon={<CropSquareIcon className={classes.unCheckedIcon} />}
            checkedIcon={<CheckIcon />}
            classes={{
                root: styles.root,
                ...classes,
            }}
            inputProps={{ 'aria-label': `${ariaLabel}` }}
        />
    );
};

export default React.memo(CheckBox);
