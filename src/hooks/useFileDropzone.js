import { useCallback, useState, useRef, useEffect } from 'react';
import _ from 'lodash';

export const useFileDropzone = ({
    defaultValues = [],
    multiple,
    limit,
    onAdd: onAddP = () => {},
    withExceeded,
    onChange: onChangeP = () => {},
}) => {
    const [values, setValues] = useState(defaultValues);
    const [changed, setChanged] = useState(false);

    const addFileTimerRef = useRef(0);

    const prepareFile = useCallback(file => {
        const preview = URL.createObjectURL(file);

        return {
            file,
            id: _.uniqueId('file_'),
            preview,
            fileType: file.type,
        };
    }, []);

    const onAdd = useCallback(
        ({ files }) => {
            setValues(prev => {
                const preparedFiles = files.map(prepareFile);

                if (!multiple) {
                    prev.map(p => {
                        if (p && p.preview) {
                            URL.revokeObjectURL(p.preview);
                        }
                    });

                    return preparedFiles;
                }

                const newValues = [...prev, ...preparedFiles];

                if (limit && newValues.length > limit) {
                    const availableSpace = limit - prev.length;

                    addFileTimerRef.current = window.setTimeout(
                        () =>
                            onAddP({
                                files:
                                    preparedFiles.length < availableSpace
                                        ? preparedFiles
                                        : preparedFiles.slice(0, availableSpace),
                            }),
                        0,
                    );

                    return withExceeded ? prev : newValues.slice(0, limit - newValues.length);
                }

                addFileTimerRef.current = window.setTimeout(
                    () => onAddP({ files: preparedFiles }),
                    0,
                );

                return newValues;
            });
            setChanged(true);
        },
        [multiple],
    );

    const onDelete = useCallback(file => {
        setValues(prev => {
            const index = prev.findIndex(f => f.id === file.fileId);
            if (index === -1) {
                return prev;
            }
            if (prev[index].preview) {
                URL.revokeObjectURL(prev[index].preview);
            }
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
        setChanged(true);
    }, []);

    const onChange = useCallback(({ files }) => {
        setValues(files);
        onChangeP({ files });
        setChanged(true);
    }, []);

    const onResetChanged = useCallback(() => {
        setChanged(false);
    }, []);

    useEffect(
        () => () => {
            clearTimeout(addFileTimerRef.current);
        },
        [],
    );

    return {
        values,
        multiple,
        limit,
        changed,
        onAdd,
        onChange,
        onDelete,
        onResetChanged,
    };
};
