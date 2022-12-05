import React, { useState, useMemo, useContext, useCallback, useEffect } from 'react';
import Loader from '../../common/Loader';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { NotificationContext } from '../../context/NotificationContext';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';

import './index.css';

const UserRow = props => {
    const {
        wallet: walletP,
        role,
        postSaveCallback,
        postDeleteCallback,
        isEditable = false,
    } = props;

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const [isProccesing, setIsProccesin] = useState(false);
    const [wallet, setWallet] = useState(walletP);

    const { state: saveUserRS, request: onSaveUser, onClearState: clearSaveState } = useRequest({
        method: HTTP_METHODS.POST,
        requestType: REQUEST_TYPE.USER,
        isAuth: true,
    });

    const {
        state: deleteUserRS,
        request: onDeleteUser,
        onClearState: clearDeleteState,
    } = useRequest({
        method: HTTP_METHODS.DELETE,
        requestType: REQUEST_TYPE.USER,
        isAuth: true,
    });

    const onWalletChangeHandler = useCallback(e => {
        setWallet(e.target.value);
    }, []);

    const onSaveUserHandler = useCallback(() => {
        if (!wallet) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'Wallet is required',
            });
            return;
        }
        setIsProccesin(true);
        onSaveUser({
            url: `roles/${wallet}/${role}`,
        });
    }, [role, wallet]);

    const onDeleteUserHandler = useCallback(() => {
        if (!wallet) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'Wallet is required',
            });
            return;
        }

        onDeleteUser({
            url: `roles/${wallet}/${role}`,
        });
    }, [role, wallet]);

    const actionBtn = useMemo(() => {
        if (isProccesing) {
            return (
                <div className="UserRow_loader_container">
                    <Loader className="UserRow_loader" />
                </div>
            );
        }

        if (isEditable) {
            return (
                <button
                    className="button control__item--confirm default__hover save"
                    onClick={onSaveUserHandler}
                >
                    Save
                </button>
            );
        }

        return (
            <button
                className="button control__item--confirm default__hover delete"
                onClick={onDeleteUserHandler}
            >
                Delete
            </button>
        );
    }, [isEditable, isProccesing, wallet]);

    useEffect(() => {
        setIsProccesin(false);
        console.log({ result: saveUserRS });
        if (saveUserRS.result && saveUserRS.result.data) {
            postSaveCallback(role, wallet);
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'User created Successfuly',
            });
            clearSaveState();
        }

        if (saveUserRS.result && saveUserRS.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'User creation failed',
            });
        }
    }, [saveUserRS, role, wallet]);

    useEffect(() => {
        setIsProccesin(false);
        if (deleteUserRS.result && deleteUserRS.result.data) {
            postDeleteCallback(role, wallet);
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'User deleted Successfuly',
            });
            clearDeleteState();
        }

        if (deleteUserRS.result && deleteUserRS.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'User deletation failed',
            });
        }
    }, [deleteUserRS, role, wallet]);

    return (
        <div className="control__item">
            <input
                type="text"
                readOnly={!isEditable}
                value={wallet}
                onChange={onWalletChangeHandler}
                className="input control__input"
                placeholder="Admin wallet address"
            />

            <button className="button control__item--settings default__hover">
                <img
                    src="/assets/img/settings-white.svg"
                    alt="settings"
                    className="control__item--settings--icon"
                />
            </button>

            {actionBtn}
        </div>
    );
};

export default React.memo(UserRow);
