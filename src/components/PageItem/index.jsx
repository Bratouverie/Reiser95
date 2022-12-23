import React, { useCallback } from 'react';

const PageItem = props => {
    const { name, id, onDelete, onEdit, url } = props;

    const onDeletePageHandler = useCallback(() => {
        onDelete(id);
    }, [onDelete, id]);

    const onEditPageHandler = useCallback(() => {
        onEdit(url);
    }, [onEdit, url]);

    return (
        <div className={`control__item`}>
            <input type="text" readOnly placeholder={name} className="input control__input" />

            <button
                className="button control__item--settings default__hover"
                onClick={onEditPageHandler}
            >
                <img
                    src="/assets/img/settings-white.svg"
                    alt="settings"
                    className="control__item--settings--icon"
                />
            </button>

            <button
                className="button control__item--confirm default__hover delete"
                onClick={onDeletePageHandler}
            >
                Delete
            </button>
        </div>
    );
};

export default React.memo(PageItem);
