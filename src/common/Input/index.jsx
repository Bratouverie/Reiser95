import React, { useCallback, forwardRef } from 'react';
import { ONLY_NUMBERS_REGEX_ONLY_G } from '../../const/regExp';

export const INPUT_TYPE = {
    NUMERIC: 'numeric',
};

const Input = forwardRef((props, _ref) => {
    const {
        title,
        text,
        placeholder,
        value,
        setValue,
        required = false,
        half = false,
        textarea = false,
        isLink = false,
        type,
        maxValue,
        name,
        className,
        inputProps,
    } = props;

    const onInputChange = useCallback(
        (e) => {
            if (!setValue) {
                return;
            }
            if (type !== INPUT_TYPE.NUMERIC) {
                setValue(e.target.value);
                return;
            }

            const value = e.currentTarget.value.match(ONLY_NUMBERS_REGEX_ONLY_G);

            const valueStr = value && value.join('');

            if (Number(valueStr) < maxValue) {
                setValue(valueStr);
            }
        },
        [type],
    );

    console.log({ inputProps });

    return (
        <div className={className || `create__item${half ? ' half' : ''}`}>
            {title && (
                <p className={`create__item--title${required ? ' required' : ''}`}>{title}</p>
            )}

            {text && <p className="create__item--text">{text}</p>}

            {textarea ? (
                <textarea
                    {...inputProps}
                    name={name}
                    type="text"
                    className="input create__item--textarea"
                    placeholder={placeholder}
                    value={value}
                    onChange={onInputChange}
                />
            ) : (
                <input
                    {...inputProps}
                    name={name}
                    type={isLink ? '' : 'text'}
                    className={`input create__item${isLink ? '--link' : ''}--input`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onInputChange}
                />
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default React.memo(Input);
