import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash';

const FileDropzone = ({
    multiple,
    disabled = false,
    values,
    availableFormats,
    maxFiles = 1000,
    onAdd = () => {},
    onDelete = () => {},
    id,
}) => {
    const [filesError, setFilesError] = useState([]);
    const [isFilesLimitReached, setIsFileLimitReached] = useState(false);
    const dropTimer = useRef();

    const onDrop = useCallback(files => {
        if (files.length) {
            onAdd({ files });
        }
    }, []);

    const onDropRejected = useCallback(
        ([{ file, errors }]) => {
            setFilesError(prev => {
                return [
                    ...(prev || []),
                    { file: { name: file.name, id: _.uniqueId('Error_file_') }, errors },
                ];
            });
            if (dropTimer.current) {
                clearTimeout(dropTimer.current);
            }
        },
        [dropTimer],
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDropRejected,
        multiple,
        disabled: disabled || isFilesLimitReached,
        accept: availableFormats ? availableFormats.join(',') : '',
        maxFiles,
        maxSize: 20971520, // 20mb
    });

    useEffect(() => {
        if (values.length >= Number(maxFiles)) {
            setIsFileLimitReached(true);
        } else {
            setIsFileLimitReached(false);
        }
    }, [maxFiles, values]);

    return (
        <div {...getRootProps()}>
            <input
                className="file"
                id={id}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...getInputProps()}
            />
        </div>
    );
};

export default React.memo(FileDropzone);
