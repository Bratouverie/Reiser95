import React, { useCallback, useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { cnb } from 'cnbuilder';

import css from './PropertiesDialog.module.css';

const PropertyRow = ({ id, name: nameP, type: typeP, onChangePropery, onDeleteRowHandler }) => {
    const [type, setType] = useState(typeP);
    const [name, setName] = useState(nameP);

    const onChangeType = useCallback(e => {
        setType(e.target.value);
    }, []);

    const onChangeName = useCallback(e => {
        setName(e.target.value);
    }, []);

    const onNameBlurHandler = useCallback(() => {
        onChangePropery(id, 'name', name);
    }, [id, name]);

    const onTypeBlurHandler = useCallback(() => {
        onChangePropery(id, 'type', type);
    }, [id, type]);

    const deleteHandler = useCallback(() => {
        onDeleteRowHandler(id);
    }, [id]);

    return (
        <div className={css.inputsContainer}>
            <button className={css.PropertiesDialog_dialog_removeBtn} onClick={deleteHandler}>
                <CloseIcon className={css.PropertiesDialog_dialog_crossIcon} />
            </button>
            <div className={css.PropertiesDialog_dialog_inputContainer}>
                <span className={css.PropertiesDialog_dialog_label}>Type</span>
                <input
                    type="text"
                    className={`input create__item--input ${css.PropertiesDialog_dialog_input}`}
                    placeholder="Characters"
                    aria-label="Type"
                    value={type}
                    onChange={onChangeType}
                    onBlur={onTypeBlurHandler}
                />
            </div>
            <div className={css.PropertiesDialog_dialog_inputContainer}>
                <span className={css.PropertiesDialog_dialog_label}>Name</span>
                <input
                    type="text"
                    className={`input create__item--input ${cnb(
                        css.PropertiesDialog_dialog_input,
                        css.PropertiesDialog_dialog_right_input,
                    )}`}
                    placeholder="Male"
                    aria-label="Name"
                    value={name}
                    onChange={onChangeName}
                    onBlur={onNameBlurHandler}
                />
            </div>
        </div>
    );
};

export default React.memo(PropertyRow);
