import React, { useState, useMemo, useCallback } from 'react';
import { isVideo as isVideoCheck } from '../../utils/isVideo';
import { VideoPlayer } from '../VideoPlayer';

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
    accept,
    defaultFileName,
}) => {
    const [img, setImg] = useState(defaultValue);
    const [isVideo, setIsVideo] = useState(false);

    const onInputChange = useCallback((e) => {
        setValue(e.target.files[0]);
        let fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.onloadend = () => {
            setImg(fileReader.result);
        };
    }, []);

    const preview = useMemo(() => {
        if (value && isVideoCheck(value.name)) {
            setIsVideo(true);

            let blobURL = URL.createObjectURL(value);
            return <VideoPlayer src={blobURL} />;
        }

        if (defaultFileName && defaultValue && isVideoCheck(defaultFileName) && !value) {
            setIsVideo(true);
            return <VideoPlayer src={defaultValue} />;
        }

        setIsVideo(false);

        if (img) {
            return <img src={img} alt="preview" className="create__item--label--preview" />;
        }

        return <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />;
    }, [value, img]);

    const changeVideoHandler = useCallback(() => {
        const input = document.getElementById(id);

        if (input) {
            input.click();
        }
    }, []);

    return (
        <div className={`create__item${half ? ' half' : ''}`}>
            <p className={`create__item--title${required ? ' required' : ''}`}>{title}</p>

            {text && <p className="create__item--text">{text}</p>}
            {isVideo && (
                <button
                    onClick={changeVideoHandler}
                    className="button create__button default__hover"
                >
                    Change file
                </button>
            )}
            <input
                id={id}
                type="file"
                className="file"
                multiple={multiple}
                accept={accept || 'image/png, image/gif, image/jpeg'}
                onChange={onInputChange}
            />

            <label htmlFor={id} className={`create__item--label ${type}`}>
                {preview}
            </label>
        </div>
    );
};

export default React.memo(File);
