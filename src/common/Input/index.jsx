import React from "react";

const Input = ({
    title,
    text,
    placeholder,
    value,
    setValue,
    required = false,
    half = false,
    textarea = false,
    inputName,
}) => {
    const onInputChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className={`create__item${half ? " half" : ""}`}>
            <p className={`create__item--title${required ? " required" : ""}`}>
                {title}
            </p>

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
                    type="text"
                    className="input create__item--input"
                    placeholder={placeholder}
                    value={value}
                    onChange={onInputChange}
                />
            )}
        </div>
    );
};

export default Input;
