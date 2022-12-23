import React, { useEffect, useCallback } from 'react';

const File = ({
    title,
    text,
    id,
    value,
    setValue,
    required = false,
    multiple = false,
    half = false,
    defaultValue,
    type = 'banner',
}) => {
    const [img, setImg] = React.useState(defaultValue);

    const onInputChange = useCallback((e) => {
        setValue(e.target.files[0]);
        let fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.onloadend = () => {
            setImg(fileReader.result);
        };
    }, []);

    return (
        <div className={`create__item${half ? ' half' : ''}`}>
            <p className={`create__item--title${required ? ' required' : ''}`}>{title}</p>

            {text && <p className="create__item--text">{text}</p>}

            <input
                id={id}
                type="file"
                className="file"
                multiple={multiple}
                accept="image/png, image/gif, image/jpeg"
                onChange={onInputChange}
            />

            <label htmlFor={id} className={`create__item--label ${type}`}>
                {value || defaultValue ? (
                    <img src={img} alt="preview" className="create__item--label--preview" />
                ) : (
                    <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                )}
            </label>
        </div>
    );
};

export default File;
