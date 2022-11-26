import { useState, useCallback } from 'react';

export const useDialog = (defaultValue = false, onCloseCallback) => {
    const [visible, setVisible] = useState(defaultValue);

    const onToggle = useCallback(
        () =>
            setVisible(p => {
                if (p && onCloseCallback) {
                    onCloseCallback();
                }
                return !p;
            }),
        [onCloseCallback],
    );
    const onShow = useCallback(() => setVisible(true), []);
    const onClose = useCallback(() => {
        if (onCloseCallback) {
            onCloseCallback();
        }
        setVisible(false);
    }, [onCloseCallback]);

    return {
        visible,
        onToggle,
        onShow,
        onClose,
    };
};
