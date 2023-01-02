import React, { useCallback, useEffect, useMemo, useContext } from 'react';
import Dialog from '../../common/Dialog';
import { DIALOG_TYPES } from './const';
import PersonModal from './PersonModal';
import AlcoModal from './AlcoModal';
import BrandModal from './BrandModal';
import CarModal from './CarModal';
import NrcModal from './NrcModal';
import WatchesModal from './WatchesModal';
import { usePostCollectionToWhitelistMutation } from '../../redux/api/ugcService';
import { NotificationContext } from '../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { normilizeError } from '../../utils/http/normilizeError';

const WLCreationDialog = (props) => {
    const { open, dialogType, onClose, collectionId } = props;

    const [
        postCollection,
        { isLoading, isSuccess, error },
    ] = usePostCollectionToWhitelistMutation();

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
            console.log({ data });
            // postCollection({ id: collectionId, data });
        },
        [collectionId],
    );

    useEffect(() => {
        if (isSuccess) {
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Collection successfully added to whitelist',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(error),
            });
        }
    }, [error]);

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
                    onCreate={onCreateHandler}
                    isLoading={isLoading}
                />
            )}
        </Dialog>
    );
};

export default React.memo(WLCreationDialog);
