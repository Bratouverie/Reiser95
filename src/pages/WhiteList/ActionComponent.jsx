import React, { useCallback } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import css from './WhiteList.module.css';

const ActionComponent = (props) => {
    const { id, status, onConfirm, onReject } = props;

    const onConfirmUserHandler = useCallback(
        (e) => {
            e.stopPropagation();
            e.preventDefault();
            onConfirm(id);
        },
        [onConfirm, id],
    );

    const onRejectUserHandler = useCallback(
        (e) => {
            e.stopPropagation();
            e.preventDefault();
            onReject(id);
        },
        [onReject, id],
    );

    return (
        <div className={css.buttonsCell}>
            <IconButton disableRipple sx={{ padding: 0 }} onClick={onConfirmUserHandler}>
                <div className={css.confirmIconBox}>
                    <CheckOutlinedIcon classes={{ root: css.confirmIcon }} />
                </div>
            </IconButton>
            <IconButton disableRipple sx={{ padding: 0 }} onClick={onRejectUserHandler}>
                <div className={css.rejectIconBox}>
                    <DeleteIcon classes={{ root: css.rejectIcon }} />
                </div>
            </IconButton>
        </div>
    );
};

export default React.memo(ActionComponent);
