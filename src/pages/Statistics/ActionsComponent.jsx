import React, { useCallback } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import css from './Statistics.module.css';

const ActionsComponent = props => {
    const { id, onEdit, onDelete } = props;

    const onEditUserHandler = useCallback(
        e => {
            e.stopPropagation();
            e.preventDefault();
            onEdit(id);
        },
        [onEdit, id],
    );

    const onDeleteUserHandler = useCallback(
        e => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(id);
        },
        [onDelete, id],
    );

    return (
        <div className={css.buttonsCell}>
            <IconButton disableRipple sx={{ padding: 0 }} onClick={onDeleteUserHandler}>
                <div className={css.trashIconBox}>
                    <DeleteIcon className={css.trashIcon} />
                </div>
            </IconButton>
            <IconButton disableRipple sx={{ padding: 0 }} onClick={onEditUserHandler}>
                <div className={css.editIconBox}>
                    <ModeEditOutlineIcon className={css.editIcon} />
                </div>
            </IconButton>
        </div>
    );
};

export default React.memo(ActionsComponent);
