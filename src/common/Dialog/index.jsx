import React from 'react';
import MuiDialog from '@mui/material/Dialog';

import './index.css';

const Dialog = ({ visible, title, children, classes = {}, onClose }) => {
    return (
        <MuiDialog
            open={visible}
            classes={{
                root: `root-dialog ${classes.root ? classes.root : ''}`,
                paper: `paper-dialog ${classes.paper ? classes.paper : ''}`,
            }}
            onClose={onClose}
        >
            {title && (
                <div className="title-dialog-container">
                    <h2 className="title-dialog">{title}</h2>
                </div>
            )}
            {children}
        </MuiDialog>
    );
};

export default React.memo(Dialog);
