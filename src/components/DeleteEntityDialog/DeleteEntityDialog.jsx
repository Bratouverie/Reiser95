import React, { useCallback } from 'react';
import { Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Dialog from '../../common/Dialog';
import Loader from '../../common/Loader';

import css from './DeleteEntityDialog.module.css';

const DeleteEntityDialog = (props) => {
    const {
        open,
        onClose,
        title,
        deleteBtnText,
        isDeletationProccessing = false,
        onDelete,
    } = props;

    const { id } = useSelector((state) => {
        return state.deleteEntityDialog;
    });

    const onDeleteHandler = useCallback(() => {
        if (id) {
            onDelete(id);
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
                        color="error"
                        onClick={onDeleteHandler}
                        className={css.deleteBtn}
                    >
                        {deleteBtnText || 'Delete'}
                    </Button>
                )}
            </Grid>
        </Dialog>
    );
};

export default React.memo(DeleteEntityDialog);
