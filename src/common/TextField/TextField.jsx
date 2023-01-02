import React, { forwardRef, useMemo } from 'react';
import TextFieldMui from '@mui/material/TextField';
import { cnb } from 'cnbuilder';

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
        fullWidth = true,
        onChange,
        onClick,
        onBlur,
        onFocus,
    } = props;
    console.log({ error });
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
        <TextFieldMui
            name={name}
            type={type}
            placeholder={placeholder}
            variant={variant}
            fullWidth={fullWidth}
            value={value}
            classes={cls}
            disabled={disabled}
            InputProps={InputProps}
            inputProps={{ ...inputProps, maxLength }}
            InputLabelProps={{
                classes: inputLabelClasses,
            }}
            error={error ? Boolean(error.type) : undefined}
            onChange={onChange}
            onClick={onClick}
            onBlur={onBlur}
            onFocus={onFocus}
        />
    );
});

TextField.displayName = 'TextField';

export default React.memo(TextField);
