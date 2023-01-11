import React, { forwardRef, useMemo } from 'react';
import { cnb } from 'cnbuilder';
import TextFieldMui from '@mui/material/TextField';
import { MenuItem } from '@mui/material';

import css from './TextField.module.css';

const TextField = forwardRef((props, _ref) => {
    const {
        name,
        label,
        placeholder,
        value,
        type = 'text',
        variant = 'outlined',
        disabled,
        error = false,
        inputProps,
        maxLength,
        classes = {},
        inputClassesProps = {},
        inputLabelClassesProps = {},
        disableOptionKey,
        fullWidth = true,
        onChange,
        onClick,
        onBlur,
        onFocus,
        rowsMax,
        multiline,
        select,
        selectOptions,
    } = props;

    const cls = useMemo(
        () => ({
            ...classes,
            root: cnb(
                css.root,
                { [css.error]: Boolean(error) },
                { [css.hidden]: type === 'hidden' },
                classes.root,
            ),
        }),
        [classes, type, error],
    );

    const inputClasses = useMemo(
        () => ({
            root: cnb(css.inputRoot, inputClassesProps.root),
            input: cnb(css.inputBase, css.styledPlaceholder, inputClassesProps.input),
            focused: cnb(css.inputFocused, inputClassesProps.focused),
            multiline: cnb(css.multiline),
            underline: cnb(css.inputUnderline, inputClassesProps.underline),
            disabled: css.labelDisabled,
            ...inputClassesProps,
        }),
        [inputClassesProps],
    );

    const InputProps = useMemo(() => {
        const pr = {
            classes: inputClasses,
        };
        return pr;
    }, [variant, type, inputClasses]);

    const inputLabelClasses = useMemo(
        () => ({
            ...inputLabelClassesProps,
            root: cnb(css.inputLabelRoot, {
                [inputLabelClassesProps.root]: inputLabelClassesProps.root,
            }),
            focused: css.inputLabelFocused,
            disabled: css.labelDisabled,
        }),
        [inputLabelClassesProps],
    );

    return (
        <div className={`create__item${fullWidth ? '' : ' half'}`}>
            {label && (
                <p className={`create__item--title ${cnb({ [css.errorLabel]: Boolean(error) })}`}>
                    {label}
                </p>
            )}
            <TextFieldMui
                name={name}
                type={type}
                placeholder={placeholder}
                variant={variant}
                fullWidth={fullWidth}
                classes={cls}
                disabled={disabled}
                InputProps={InputProps}
                inputProps={{ ...inputProps, maxLength }}
                rowsMax={multiline ? 6 : rowsMax}
                multiline={multiline}
                InputLabelProps={{
                    classes: inputLabelClasses,
                }}
                value={select ? value || 'placeholder' : value}
                error={error ? Boolean(error.type) : undefined}
                onChange={onChange}
                onClick={onClick}
                onBlur={onBlur}
                onFocus={onFocus}
                select={select}
                SelectProps={{
                    MenuProps: {
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
                    },
                    classes: {
                        root: `CustomSelect_root_label ${cnb({
                            [css.placeholder]: select && value === 'placeholder',
                        })}`,
                        focused: 'CustomSelect_root_label_focused',
                        shrink: 'CustomSelect_root_label_shrink',
                        select: css.CustomSelectRoot,
                        icon: 'CustomSelect_root_icon',
                    },
                }}
            >
                {select &&
                    selectOptions &&
                    selectOptions.map((o) => (
                        <MenuItem
                            classes={{
                                root: cnb({
                                    [css.disable]:
                                        o.value === 'placeholder' ||
                                        (disableOptionKey && o[disableOptionKey] === value) ||
                                        o.disabled,
                                }),
                                selected: css.menuItemRootSelected,
                            }}
                            key={o.value}
                            value={o.value}
                        >
                            {o.name}
                        </MenuItem>
                    ))}
            </TextFieldMui>
        </div>
    );
});

TextField.displayName = 'TextField';

export default React.memo(TextField);
