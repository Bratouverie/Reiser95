import React, { useCallback } from 'react';
import { ONLY_NUMBERS_REGEX_ONLY_G } from '../../const /regExp';

export const INPUT_TYPE = {
    NUMERIC: 'numeric',
};

const Input = ({
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
    inputName,
    className,
}) => {
    const onInputChange = useCallback(
        e => {
            if (type !== INPUT_TYPE.NUMERIC) {
                setValue(e.target.value);
                return;
            }

            const value = e.currentTarget.value.match(ONLY_NUMBERS_REGEX_ONLY_G);

            const valueStr = value && value.join('');
            console.log({ valueStr });
            if (Number(valueStr) < maxValue) {
                setValue(valueStr);
            }
        },
        [type],
    );

    return (
        <div className={className || `create__item${half ? ' half' : ''}`}>
            <p className={`create__item--title${required ? ' required' : ''}`}>{title}</p>

            {text && <p className="create__item--text">{text}</p>}

            {textarea ? (
                <textarea
                    name={inputName}
                    type="text"
                    className="input create__item--textarea"
                    placeholder={placeholder}
                    value={value}
                    onChange={onInputChange}
                ></textarea>
            ) : (
                <input
                    name={inputName}
                    type={isLink ? '' : 'text'}
                    className={`input create__item${isLink ? '--link' : ''}--input`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onInputChange}
                />
            )}
        </div>
    );
};

export default Input;
