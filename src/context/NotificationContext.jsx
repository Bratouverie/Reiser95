import React, { useState, useCallback, useRef, useEffect } from 'react';
import _ from 'lodash';

const TIMEOUT_IN_MS = 5000;

const NotificationContext = React.createContext({});

const NotificationProvider = props => {
    const { children, state: defaultState } = props;

    const [state, setState] = useState(defaultState);

    const removeNotificationTimer = useRef(0);

    const removeNotification = useCallback(id => {
        setState(p => ({
            ...p,
            notifications: p.notifications
                ? p.notifications.filter(notification => notification.id !== id)
                : [],
        }));
    }, []);

    const addNotification = useCallback(({ type, text }) => {
        const id = _.uniqueId('notification_');
        const newNotification = { id, type, text };

        setState(p => ({
            ...p,
            notifications: [...p.notifications, newNotification],
        }));
    }, []);

    useEffect(() => {
        if (state.notifications.length) {
            removeNotificationTimer.current = window.setTimeout(() => {
                if (state.notifications[0]) {
                    const notifications =
                        state.notifications.length > 1 ? state.notifications.slice(1) : [];
                    setState(prev => ({
                        ...prev,
                        notifications,
                    }));
                }
            }, TIMEOUT_IN_MS);
        }
        return () => {
            clearTimeout(removeNotificationTimer.current);
        };
    }, [state.notifications.length, removeNotificationTimer.current]);

    const actions = {
        removeNotification,
        addNotification,
    };

    return (
        <NotificationContext.Provider
            value={{
                state,
                actions,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

NotificationProvider.defaultProps = {
    state: {
        notifications: [],
    },
};
export { NotificationContext, NotificationProvider };
