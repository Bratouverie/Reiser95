import React, { forwardRef } from 'react';
import { cnb } from 'cnbuilder';
import MuiTooltip from '@mui/material/Tooltip';

import css from './Tooltip.module.css';

const Tooltip = forwardRef((props, ref) => {
    const {
        open,
        className,
        classes = {},
        title,
        placement,
        arrow,
        componentsProps,
        PopperComponent,
        PopperProps,
        TransitionComponent,
        TransitionProps,
        disableInteractive,
        children,
        disableHoverListener,
        disableFocusListener,
    } = props;

    const tooltipClasses = {
        arrow: classes.arrow || css.arrow,
        tooltip: classes.tooltip ? cnb(css.tooltip, classes.tooltip) : css.tooltip,
    };

    return (
        <MuiTooltip
            ref={ref}
            open={open}
            className={cnb(css.container, className)}
            classes={tooltipClasses}
            title={title}
            placement={placement}
            disableInteractive={disableInteractive}
            arrow={arrow}
            componentsProps={componentsProps}
            PopperComponent={PopperComponent}
            PopperProps={PopperProps}
            TransitionComponent={TransitionComponent}
            TransitionProps={TransitionProps}
            disableHoverListener={disableHoverListener}
            disableFocusListener={disableFocusListener}
        >
            {children}
        </MuiTooltip>
    );
});

Tooltip.displayName = 'Tooltip';

export default React.memo(Tooltip);
