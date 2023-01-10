import React, { useCallback, useEffect, useMemo, useContext } from 'react';
import Dialog from '../../common/Dialog';
import { DIALOG_TYPES } from './const';
import PersonModal from './PersonModal';
import AlcoModal from './AlcoModal';
import BrandModal from './BrandModal';
import CarModal from './CarModal';
import NrcModal from './NrcModal';
import WatchesModal from './WatchesModal';
import {
    usePatchCollectionToWhitelistMutation,
    usePostCollectionToWhitelistMutation,
} from '../../redux/api/ugcService';
import { NotificationContext } from '../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { normilizeError } from '../../utils/http/normilizeError';

const WLCreationDialog = (props) => {
    const {
        open,
        dialogType,
        onClose,
        onCreateSuccessfully,
        whiteListApplicationData,
        collectionId,
    } = props;

    const [
        postWhiteListApplication,
        {
            isLoading: isPostWhiteListApplicationLoading,
            isSuccess: isPostWhiteListApplicationSuccess,
            error: postWhiteListApplicationError,
        },
    ] = usePostCollectionToWhitelistMutation();

    const [
        patchWhiteListApplication,
        {
            isLoading: isPatchWhiteListApplicationLoading,
            isSuccess: isPatchWhiteListApplicationSuccess,
            error: patchWhiteListApplicationError,
        },
    ] = usePatchCollectionToWhitelistMutation();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const DialogComponent = useMemo(() => {
        switch (dialogType) {
            case DIALOG_TYPES.PERSONS:
                return PersonModal;
            case DIALOG_TYPES.ALCO:
                return AlcoModal;
            case DIALOG_TYPES.BRAND:
                return BrandModal;
            case DIALOG_TYPES.CAR:
                return CarModal;
            case DIALOG_TYPES.NRC:
                return NrcModal;
            case DIALOG_TYPES.WATCHES:
                return WatchesModal;
            default:
                return null;
        }
    }, [dialogType]);

    const onCreateHandler = useCallback(
        (data) => {
            if (whiteListApplicationData) {
                patchWhiteListApplication({ id: whiteListApplicationData.id, data });
            } else {
                postWhiteListApplication({ id: collectionId, data });
            }
        },
        [collectionId, whiteListApplicationData],
    );

    useEffect(() => {
        if (isPostWhiteListApplicationSuccess || isPatchWhiteListApplicationSuccess) {
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: `Collection successfully ${
                    isPatchWhiteListApplicationSuccess ? 'edited' : 'added'
                } to whitelist`,
            });
            onCreateSuccessfully();
            onClose();
        }
    }, [isPostWhiteListApplicationSuccess, isPatchWhiteListApplicationSuccess]);

    useEffect(() => {
        if (postWhiteListApplicationError || patchWhiteListApplicationError) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(
                    postWhiteListApplicationError || patchWhiteListApplicationError,
                ),
            });
        }
    }, [postWhiteListApplicationError, patchWhiteListApplicationError]);

    return (
        <Dialog
            visible={open}
            onClose={onClose}
            classes={{
                paper: 'modal__inner_paper',
            }}
        >
            {DialogComponent && (
                <DialogComponent
                    onClose={onClose}
                    onSubmit={onCreateHandler}
                    whiteListApplicationData={whiteListApplicationData}
                    isLoading={
                        isPostWhiteListApplicationLoading || isPatchWhiteListApplicationLoading
                    }
                />
            )}
        </Dialog>
    );
};

export default React.memo(WLCreationDialog);
