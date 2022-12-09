import React, { useState, useCallback, useMemo } from 'react';
import MuiAutocomplete from '@mui/material/Autocomplete';
import MuiChip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { cnb } from 'cnbuilder';
import CloseIcon from '@mui/icons-material/Close';
import CheckBox from '../CheckBox/CheckBox';

import { useToggle } from '../../hooks/useToggle';
import css from './Autocomplite.module.css';

const Autocomplite = props => {
    const {
        onChange: handleChange,
        name,
        defaultValue,
        error,
        defaultTextInputValue,
        className,
        multiple,
        options,
        fullWidth,
        disableCloseOnSelect,
        label,
        placeholder,
        getOptionLabel,
        renderOption,
        disableDropdownArrow,
        classes,
        optionsFieldsFilteringWhiteList,
        disabled = false,
        inputValue,
        disableLabelAnimation = false,
        isOptionEqualToValue = option => {
            return JSON.stringify(option.value) === JSON.stringify(value);
        },
        selectAllLabel,
        disableClearable = true,
        clearIcon,
    } = props;

    const initialValue = multiple ? defaultValue || [] : defaultValue;
    const dropDownStateToggle = useToggle({ initial: false });

    const [value, setValue] = useState(initialValue);
    const [textInputValue, setTextInputValue] = useState(defaultTextInputValue || '');

    const multipleValue = useMemo(() => {
        return inputValue || value;
    }, [inputValue, value]);

    const SelectIcon = () => {
        return (
            <IconButton
                className={css.selectIconWrapper}
                onClick={() => dropDownStateToggle.onToggle()}
            >
                <ChevronRightIcon className={css.roundedTriangleSelectIcon} />
            </IconButton>
        );
    };

    const onTagDelete = useCallback(
        index => () => {
            let result;

            setValue(prev => {
                if (Array.isArray(prev)) {
                    result = prev.filter((prevItem, i) => index !== i);
                } else {
                    result = prev;
                }
                return result;
            });

            setTimeout(() => {
                if (JSON.stringify(result) === '[]') {
                    handleChange([]);
                } else {
                    handleChange(JSON.stringify(result));
                }
            }, 0);
        },
        [handleChange, value],
    );

    const changeHandler = useCallback(
        (event, value) => {
            setValue(value);
            handleChange(value);

            if (!multiple) {
                const label = getOptionLabel(value);
                setTextInputValue(label);
                dropDownStateToggle.onSetValue({ value: false });
            }
        },
        [handleChange, options, multiple],
    );

    const handleRenderAutocomplete = useCallback(
        (props, option, { selected }) => {
            return (
                <li
                    key={option.id}
                    {...props}
                    className={cnb(css.autocompleteItem, {
                        [css.autocompleteNoMultipleItem]: !multiple,
                    })}
                >
                    {multiple && (
                        <CheckBox
                            classes={{
                                unCheckedIcon: css.autocompleteCheckBox,
                            }}
                            disableRipple
                            checked={selected}
                        />
                    )}
                    {option.label}
                </li>
            );
        },
        [selectAllLabel, multiple],
    );

    const filterOptionsHandler = useCallback(
        options => {
            const filteredOptions = options.filter(o => {
                const textInputLowerCased = textInputValue.toLowerCase();
                const compareWithLabelCondition = getOptionLabel(o)
                    .toLowerCase()
                    .includes(textInputLowerCased);

                if (
                    optionsFieldsFilteringWhiteList &&
                    optionsFieldsFilteringWhiteList.length > 0 &&
                    typeof o !== 'string'
                ) {
                    return (
                        optionsFieldsFilteringWhiteList.some(key =>
                            String(o[key])
                                .toLowerCase()
                                .includes(textInputLowerCased),
                        ) || compareWithLabelCondition
                    );
                }
                return compareWithLabelCondition;
            });

            return [...filteredOptions];
        },
        [selectAllLabel, getOptionLabel, textInputValue, optionsFieldsFilteringWhiteList],
    );

    return (
        <>
            <MuiAutocomplete
                open={dropDownStateToggle.state}
                disabled={disabled}
                isOptionEqualToValue={isOptionEqualToValue}
                value={multipleValue}
                onChange={changeHandler}
                className={cnb(css.autocomplete, className)}
                fullWidth={fullWidth}
                multiple={multiple}
                options={options}
                disableClearable={disableClearable}
                popupIcon={<SelectIcon />}
                getOptionLabel={getOptionLabel}
                filterOptions={filterOptionsHandler}
                disableCloseOnSelect={disableCloseOnSelect}
                renderOption={renderOption || handleRenderAutocomplete}
                classes={{
                    listbox: css.listBox,
                    input: css.input,
                    root: classes ? classes.root : '',
                    paper: css.paper,
                    noOptions: css.noOptions,
                }}
                sx={{
                    '& .MuiFormControl-root.MuiTextField-root': {
                        border: 'none',
                    },
                    '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment': {
                        top: '5px',
                        right: '5px',
                    },
                    '& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment .MuiAutocomplete-popupIndicator': {
                        transform: 'rotate(0)',
                        display: !disableDropdownArrow ? undefined : 'none',
                    },
                    '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
                        paddingLeft: '4px',
                    },
                    '&.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-root .MuiOutlinedInput-root': {
                        padding: '5px 47px 5px 12px',
                        justifyContent: 'flex-start',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        fontSize: '16px',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    },
                    '& .MuiButtonBase-root .MuiChip-root .MuiChip-deleteIcon': {
                        color: 'white',
                    },
                    ...(error && {
                        '&:hover .MuiTextField-root .MuiOutlinedInput-notchedOutline': {
                            border: '2px solid rgba(255, 74, 49, 1)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '2px solid rgba(255, 74, 49, 1)',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '1px solid rgba(255, 74, 49, 1)',
                        },
                    }),
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        name={name}
                        label={label}
                        className={css.textField}
                        placeholder={placeholder}
                        classes={{
                            root: css.textFieldRoot,
                        }}
                        InputLabelProps={{
                            ...params.InputLabelProps,
                            classes: {
                                focused: cnb({
                                    [css.focusedDisableLabel]: disableLabelAnimation,
                                }),
                                disabled: css.disabled,
                            },
                        }}
                        InputProps={{
                            ...params.InputProps,
                            classes: {
                                focused: cnb(css.focused, {
                                    [css.inputDisableFocused]: disableLabelAnimation,
                                }),
                                disabled: css.disabled,
                                root: css.inputRoot,
                            },
                        }}
                        inputProps={{
                            ...params.inputProps,
                            value: textInputValue,
                            onChange: event => {
                                setTextInputValue(event.currentTarget.value);

                                params.inputProps.onChange(event);

                                return event.currentTarget.value;
                            },
                            onFocus: event => {
                                dropDownStateToggle.onSetValue({ value: true });
                                if (params.inputProps.onFocus) {
                                    params.inputProps.onFocus(event);
                                }
                            },
                            onBlur: event => {
                                dropDownStateToggle.onSetValue({ value: false });
                                if (!multipleValue && !multiple) {
                                    setTextInputValue('');
                                }
                                if (multipleValue && !multiple) {
                                    setTextInputValue(getOptionLabel(multipleValue));
                                }
                                if (params.inputProps.onBlur) {
                                    params.inputProps.onBlur(event);
                                }
                            },
                        }}
                        onKeyDown={event => {
                            if (event.key === 'Backspace') {
                                event.stopPropagation();
                            }
                        }}
                        sx={{
                            '& label': {
                                fontFamily: '"League Spartan", sans-serif',
                                color: 'white',
                                fontSize: '16px',
                                paddingLeft: '2px',
                            },
                            '& label.Mui-focused': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '8px',
                                border: '1px solid #ebedf1',
                            },
                        }}
                    />
                )}
                renderTags={() => null}
                clearIcon={clearIcon}
            />
            {multiple && Array.isArray(multipleValue) && multipleValue.length > 0 && (
                <div className={cnb(css.chipsBox, classes ? classes.chipBox : '')}>
                    {multipleValue.map((option, index) => {
                        return (
                            <MuiChip
                                key={`${getOptionLabel(option)}__${index}`}
                                className={css.chip}
                                label={getOptionLabel(option)}
                                onDelete={onTagDelete(index)}
                                deleteIcon={
                                    <div className={css.closeIconBox}>
                                        <CloseIcon className={css.closeIcon} />
                                    </div>
                                }
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default React.memo(Autocomplite);
