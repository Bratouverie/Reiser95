import React, { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
import MuiAlert from '@mui/material/Alert';
import './index.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationsContainer = props => {
    const { children } = props;

    const {
        state: { notifications },
        actions: { removeNotification },
    } = useContext(NotificationContext);

    return (
        <>
            {children}
            <div className="notificationsContainer">
                {notifications.map(n => (
                    <Alert
                        key={n.id}
                        onClose={() => removeNotification(n.id)}
                        severity={n.type}
                        classes={{
                            action: 'notificationsContainer_action',
                        }}
                        sx={{ width: '100%' }}
                    >
                        <span className="notificationsContainer_text">{n.text}</span>
                    </Alert>
                ))}
            </div>
        </>
    );
};

export default React.memo(NotificationsContainer);
