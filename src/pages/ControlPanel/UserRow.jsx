import React, { useState, useMemo, useContext, useCallback, useEffect } from 'react';
import { useRef } from 'react';
import Loader from '../../common/Loader';
import { Popover } from '../../common/Popover';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { NotificationContext } from '../../context/NotificationContext';
import { useDialog } from '../../hooks/useDialog';
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

    const confirmSaveTooltip = useDialog();
    const confirmDeleteTooltip = useDialog();

    const saveBtnRef = useRef();
    const deleteBtnRef = useRef();

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

    const onWalletChangeHandler = useCallback(
        e => {
            setWallet(e.target.value);

            if (confirmSaveTooltip.visible) {
                confirmSaveTooltip.onClose();
            }

            if (confirmDeleteTooltip.visible) {
                confirmDeleteTooltip.onClose();
            }
        },
        [confirmSaveTooltip.visible],
    );

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
        confirmSaveTooltip.onClose();
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

        confirmDeleteTooltip.onClose();
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
                    ref={saveBtnRef}
                    onClick={confirmSaveTooltip.onShow}
                >
                    Save
                </button>
            );
        }
        return (
            <button
                className="button control__item--confirm default__hover delete"
                ref={deleteBtnRef}
                onClick={confirmDeleteTooltip.onShow}
            >
                Delete
            </button>
        );
    }, [isEditable, isProccesing, wallet, confirmSaveTooltip, confirmDeleteTooltip]);
    console.log({ confirmDeleteTooltip });

    useEffect(() => {
        setIsProccesin(false);
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
            <Popover
                open={confirmSaveTooltip.visible}
                classes={{ paper: 'ControlPanel__popover' }}
                onClose={confirmSaveTooltip.onClose}
                anchorEl={saveBtnRef.current}
            >
                <button
                    className="button control__item--confirm default__hover ControlPanel_userRow_confirmBtn save"
                    onClick={onSaveUserHandler}
                >
                    Confirm
                </button>
            </Popover>
            <Popover
                open={confirmDeleteTooltip.visible}
                onClose={confirmDeleteTooltip.onClose}
                classes={{ paper: 'ControlPanel__popover' }}
                anchorEl={deleteBtnRef.current}
            >
                <button
                    className="button control__item--confirm default__hover ControlPanel_userRow_confirmBtn delete"
                    onClick={onDeleteUserHandler}
                >
                    Confirm
                </button>
            </Popover>
        </div>
    );
};

export default React.memo(UserRow);
