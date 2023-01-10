import React, { useCallback } from 'react';
import { Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Dialog from '../../common/Dialog';
import Loader from '../../common/Loader';

import css from './ConfirmDialog.module.css';

const ConfirmDialog = (props) => {
    const {
        open,
        onClose,
        title,
        confirmBtnText,
        isDeletationProccessing = false,
        onConfirm,
    } = props;

    const { id } = useSelector((state) => state.confirmAplicationDialog);

    const onConfirmHandler = useCallback(() => {
        if (id) {
            onConfirm(id);
        }
    }, [id]);

    return (
        <Dialog
            visible={open}
            onClose={onClose}
            classes={{
                paper: 'LevelsDialog_dialog_paper',
            }}
            title={title}
        >
            <Grid
                container
                direction="row"
                wrap="nowrap"
                justifyContent="center"
                alignItems="center"
                className={css.btnsContainer}
            >
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={onClose}
                    className={css.cancelBtn}
                >
                    Cancel
                </Button>
                {isDeletationProccessing ? (
                    <div className={css.loaderContainer}>
                        <Loader className={css.loader} />
                    </div>
                ) : (
                    <Button
                        variant="contained"
                        size="large"
                        color="success"
                        onClick={onConfirmHandler}
                        className={css.confirmBtn}
                    >
                        {confirmBtnText || 'Confirm'}
                    </Button>
                )}
            </Grid>
        </Dialog>
    );
};

export default React.memo(ConfirmDialog);
