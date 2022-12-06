import React, { useContext, useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePage } from '../../redux/slices/pages';
import { useDialog } from '../../hooks/useDialog';
import { NotificationContext } from '../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { Popover } from '../../common/Popover';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';

const PageItem = props => {
    const { name, id } = props;

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const [loading, setLoading] = useState(false);

    const deleteBtnRef = useRef();

    const confirmDialog = useDialog();

    const { state: deletePageRS, request: onDeletePage, onClearState: clearPageState } = useRequest(
        {
            method: HTTP_METHODS.PATCH,
            requestType: REQUEST_TYPE.DATA,
            isAuth: true,
        },
    );

    const onDeletePageHandler = useCallback(() => {
        setLoading(true);
        onDeletePage({
            url: `page/hide/${id}/`,
            data: {
                hide: true,
            },
        });
        confirmDialog.onClose();
    }, [auth.accessToken, id]);

    useEffect(() => {
        if (deletePageRS.result && deletePageRS.result.data) {
            dispatch(deletePage(id));

            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Page deleted successfuly',
            });
        }

        if (deletePageRS && deletePageRS.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: deletePageRS.error,
            });
        }

        setLoading(false);
    }, [deletePageRS]);

    return (
        <div className={`control__item${loading ? ' loading' : ''}`}>
            <input type="text" readOnly placeholder={name} className="input control__input" />

            <button className="button control__item--settings default__hover">
                <img
                    src="/assets/img/settings-white.svg"
                    alt="settings"
                    className="control__item--settings--icon"
                />
            </button>

            <button
                className="button control__item--confirm default__hover delete"
                onClick={confirmDialog.onShow}
                ref={deleteBtnRef}
            >
                Delete
            </button>

            <Popover
                open={confirmDialog.visible}
                onClose={confirmDialog.onClose}
                classes={{ paper: 'ControlPanel__popover' }}
                anchorEl={deleteBtnRef.current}
            >
                <button
                    className="button control__item--confirm default__hover ControlPanel_pageRow_confirmBtn delete"
                    onClick={onDeletePageHandler}
                >
                    Confirm
                </button>
            </Popover>
        </div>
    );
};

export default PageItem;
