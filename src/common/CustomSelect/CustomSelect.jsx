import React, { useCallback } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './index.css';

const CustomSelect = props => {
    const { optionsList, value, placeholder, onChange } = props;
    console.log({ optionsList });
    const onChangeHandler = useCallback(e => {
        console.log({ value: e.target.value });
        onChange(e.target.value);
    }, []);

    const menuProps = {
        classes: {
            paper: 'CustomSelect_paper',
            list: 'CustomSelect_list',
        },
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
        getContentAnchorEl: null,
    };

    return (
        <FormControl fullWidth>
            <InputLabel
                classes={{
                    root: 'CustomSelect_root_label',
                    focused: 'CustomSelect_root_label_focused',
                    shrink: 'CustomSelect_root_label_shrink',
                }}
                id={placeholder}
            >
                {placeholder}
            </InputLabel>
            <Select
                classes={{
                    select: 'CustomSelect_root',
                    icon: 'CustomSelect_root_icon',
                }}
                MenuProps={menuProps}
                labelId={placeholder}
                id={`${placeholder}_select`}
                value={value}
                label={placeholder}
                onChange={onChangeHandler}
            >
                {optionsList.map(o => (
                    <MenuItem key={o.value} value={o.value}>
                        {o.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default React.memo(CustomSelect);
