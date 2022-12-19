import React, { forwardRef, useRef, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { cnb } from 'cnbuilder';
import Dotdotdot from 'react-dotdotdot';
import { Tooltip } from '../Tooltip';

import css from './OverflowTooltip.module.css';

const OverflowTooltip = forwardRef((props, ref) => {
    const {
        children,
        classes = {},
        customClasses = {},
        title,
        maxLines,
        placement,
        disableFocusListener,
        disableHoverListener,
        isFileName,
    } = props;

    const [isOverflowed, setIsOverflow] = useState(false);
    const textElementRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const tooltipClasses = useMemo(() => {
        if (customClasses.tooltipContainer) {
            return {
                ...classes,
                tooltipContainer: customClasses.tooltipContainer,
            };
        }

        return classes;
    }, [customClasses, classes]);

    useEffect(() => {
        if (textElementRef.current) {
            if (maxLines) {
                const el = textElementRef.current.firstElementChild;

                if (el && el.textContent) {
                    const isClamped =
                        el.textContent.slice(-1) === '…' ||
                        (el.textContent.slice(-1) === '.' && !isFileName);
                    setIsOverflow(isClamped);
                }
            } else {
                setIsOverflow(
                    textElementRef.current.scrollWidth > textElementRef.current.clientWidth,
                );
            }
        }
    }, [maxLines, isFileName, containerWidth]);

    useLayoutEffect(() => {
        if (!textElementRef.current) {
            return;
        }

        const updateSize = () => {
            setContainerWidth(textElementRef.current.clientWidth || 0);
        };

        window.addEventListener('resize', updateSize);
        textElementRef.current.addEventListener('resize', updateSize);

        updateSize();

        return () => {
            if (textElementRef.current) {
                window.removeEventListener('resize', updateSize);
                textElementRef.current.removeEventListener('resize', updateSize);
            }
        };
    }, [textElementRef.current, isOverflowed]);

    if (maxLines) {
        return (
            <Tooltip
                ref={ref}
                classes={tooltipClasses}
                title={title}
                placement={placement}
                disableFocusListener={disableFocusListener}
                disableHoverListener={disableHoverListener || !isOverflowed}
            >
                <div
                    ref={textElementRef}
                    className={cnb({
                        [customClasses.childrenWrapper]: customClasses.childrenWrapper,
                    })}
                >
                    <Dotdotdot key={containerWidth} clamp={maxLines}>
                        {children}
                    </Dotdotdot>
                </div>
            </Tooltip>
        );
    }

    return (
        <Tooltip
            ref={ref}
            classes={tooltipClasses}
            title={title}
            placement={placement}
            disableFocusListener={disableFocusListener}
            disableHoverListener={disableHoverListener || !isOverflowed}
        >
            <div
                ref={textElementRef}
                className={cnb(css.wrapper, {
                    [customClasses.childrenWrapper]: customClasses.childrenWrapper,
                })}
            >
                {children}
            </div>
        </Tooltip>
    );
});

OverflowTooltip.displayName = 'OverflowTooltip';

export default React.memo(OverflowTooltip);
