import React, { useMemo } from 'react';
import PopoverMui from '@mui/material/Popover';

const Popover = props => {
    const {
        open,
        className,
        classes = {},
        anchorEl,
        onClose,
        anchorOrigin,
        anchorPosition,
        container,
        elevation,
        marginThreshold,
        PaperProps,
        transformOrigin,
        children,
        sx,
    } = props;

    const currentAnchorOrigin = useMemo(() => {
        return anchorOrigin
            ? anchorOrigin
            : {
                  vertical: 'bottom',
                  horizontal: 'right',
              };
    }, [anchorOrigin]);

    const currentTransformOrigin = useMemo(() => {
        return transformOrigin
            ? transformOrigin
            : {
                  vertical: 'top',
                  horizontal: 'right',
              };
    }, [transformOrigin]);

    return (
        <PopoverMui
            className={className}
            classes={classes}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={currentAnchorOrigin}
            anchorPosition={anchorPosition}
            container={container}
            elevation={elevation}
            marginThreshold={marginThreshold}
            PaperProps={PaperProps}
            transformOrigin={currentTransformOrigin}
            sx={sx}
        >
            {children}
        </PopoverMui>
    );
};

export default React.memo(Popover);
