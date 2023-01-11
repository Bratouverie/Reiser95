import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../common/Preloader';
import PageItem from '../../components/PageItem';
import { USER_ROLES } from '../../const/users/USER_ROLES';
import UserRow from './UserRow';
import {
    useGetAdminsQuery,
    useGetModeratorsQuery,
    useGetSuperAdminsQuery,
} from '../../redux/api/userService';
import { useGetPagesQuery, useHidePageMutation } from '../../redux/api/dataService';
import DeleteEntityDialog from '../../components/DeleteEntityDialog/DeleteEntityDialog';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { NotificationContext } from '../../context/NotificationContext';
import { onClose, onOpen } from '../../redux/dialogs/deleteEntityDialog';

import './index.css';
import { normilizeError } from '../../utils/http/normilizeError';
import { EDIT_PAGE_PAGE } from '../../const/http/CLIENT_URLS';

const ControlPanel = () => {
    const auth = useSelector(state => state.auth);
    const { isOpen, id: deletedPageId } = useSelector(state => state.deleteEntityDialog);

    const dispatch = useDispatch();
    const navigator = useNavigate();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const { data: superAdminsReq, isLoading: isSuperAdminsLoading } = useGetSuperAdminsQuery();
    const { data: adminsReq, isLoading: isAdminLoading } = useGetAdminsQuery();
    const { data: moderatorsReq, isLoading: isModeratorsLoading } = useGetModeratorsQuery();
    const { data: pagesReq, isLoading: isPagesLoading } = useGetPagesQuery();

    const [
        hidePage,
        {
            isSuccess,
            isLoading: isDeletationProccessing,
            error: hidePageError,
            reset: resetDeletationState,
        },
    ] = useHidePageMutation();

    const [isNewAdminCreating, setIsNewAdminCreating] = useState(false);
    const [isNewModeratorCreating, setIsNewModeratorCreating] = useState(false);

    const [superAdmins, setSuperAdmins] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [pages, setPages] = useState([]);

    const onNewAdminCreateStateChange = useCallback(() => {
        setIsNewAdminCreating(p => !p);
    }, []);

    const onNewModerCreate = useCallback(() => {
        setIsNewModeratorCreating(p => !p);
    }, []);

    const onDeleteHandler = useCallback(id => {
        hidePage({ id, isHide: true });
    }, []);

    const onDeletePage = useCallback(id => {
        dispatch(onOpen(id));
    }, []);

    const closeDialogHandler = useCallback(() => {
        dispatch(onClose());
    }, []);

    const postSaveCallback = useCallback((role, wallet) => {
        if (role === USER_ROLES.ADMIN) {
            onNewAdminCreateStateChange();
            setAdmins(p => [...p, wallet]);
            return;
        }

        if (role === USER_ROLES.MODERATOR) {
            onNewModerCreate();
            setModerators(p => [...p, wallet]);
        }
    }, []);

    const postDeleteCallback = useCallback((role, wallet) => {
        if (role === USER_ROLES.ADMIN) {
            setAdmins(p => p.filter(w => w !== wallet));
            return;
        }

        if (role === USER_ROLES.MODERATOR) {
            setModerators(p => p.filter(w => w !== wallet));
        }
    }, []);

    const onEditPage = useCallback(url => {
        navigator(EDIT_PAGE_PAGE({ url }));
    }, []);

    useEffect(() => {
        if (hidePageError) {
            closeDialogHandler();
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(hidePageError),
            });
        }
    }, [hidePageError]);

    useEffect(() => {
        if (isSuccess && deletedPageId) {
            setPages(p => p.filter(a => a.id !== deletedPageId));

            closeDialogHandler();
            resetDeletationState();
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Page deleted successfuly',
            });
        }
    }, [isSuccess, deletedPageId]);

    useEffect(() => {
        if (superAdminsReq && superAdminsReq.users && superAdminsReq.users.length) {
            setSuperAdmins(superAdminsReq.users);
        }
    }, [superAdminsReq]);

    useEffect(() => {
        if (adminsReq && adminsReq.users && adminsReq.users.length) {
            setAdmins(adminsReq.users);
        }
    }, [adminsReq]);

    useEffect(() => {
        if (moderatorsReq && moderatorsReq.users && moderatorsReq.users.length) {
            setModerators(moderatorsReq.users);
        }
    }, [moderatorsReq]);

    useEffect(() => {
        if (pagesReq) {
            setPages(pagesReq);
        }
    }, [pagesReq]);

    if (
        auth.loadAuth ||
        isSuperAdminsLoading ||
        isAdminLoading ||
        isModeratorsLoading ||
        isPagesLoading
    ) {
        return <Preloader />;
    }

    return (
        <>
            <div className="default__padding control">
                <div className="container">
                    <div className="control__inner">
                        <h2 className="title left">Control Panel</h2>

                        <div className="control__wrapper">
                            <p className="control__text">
                                "Reliable control is a big part of success"
                            </p>

                            <p className="text bold left">
                                Set access rights and control all platform processes in one place
                            </p>

                            <p className="control__text m0">
                                Access to the appointment of administrators is only for the Super
                                Admin
                            </p>
                        </div>

                        <div className="control__wrapper">
                            <p className="text bold left m0">Super Admin</p>

                            <p className="control__text m0">
                                Super administrator manages all platform processes.
                            </p>

                            <p className="control__text m0">Enter super admin wallet address:</p>

                            {superAdmins.map(sa => (
                                <UserRow key={sa} wallet={sa} role={USER_ROLES.SUPER_ADMIN} />
                            ))}
                        </div>

                        <div className="control__wrapper">
                            <p className="text bold left m0">Administrator</p>

                            <p className="control__text m0">Has a limited list of powers.</p>

                            <p className="control__text m0">Enter Admin wallet address:</p>

                            {admins.map(sa => (
                                <UserRow
                                    key={sa}
                                    wallet={sa}
                                    role={USER_ROLES.ADMIN}
                                    postDeleteCallback={postDeleteCallback}
                                />
                            ))}

                            {!isNewAdminCreating ? (
                                <button
                                    className="button control__add default__hover"
                                    onClick={onNewAdminCreateStateChange}
                                >
                                    + add new Admin
                                </button>
                            ) : (
                                <UserRow
                                    wallet=""
                                    role={USER_ROLES.ADMIN}
                                    isEditable={true}
                                    postSaveCallback={postSaveCallback}
                                />
                            )}
                        </div>

                        <div className="control__wrapper">
                            <p className="text bold left m0">Moderator</p>

                            <p className="control__text m0">Has a limited list of powers.</p>

                            <p className="control__text m0">Enter Moderator wallet address:</p>

                            {moderators.map(sa => (
                                <UserRow
                                    key={sa}
                                    wallet={sa}
                                    role={USER_ROLES.MODERATOR}
                                    postDeleteCallback={postDeleteCallback}
                                />
                            ))}

                            {!isNewModeratorCreating ? (
                                <button
                                    className="button control__add default__hover"
                                    onClick={onNewModerCreate}
                                >
                                    + add new Moder
                                </button>
                            ) : (
                                <UserRow
                                    wallet=""
                                    role={USER_ROLES.MODERATOR}
                                    isEditable={true}
                                    postSaveCallback={postSaveCallback}
                                />
                            )}
                        </div>

                        <div className="control__wrapper">
                            <p className="text bold left m0">Create Page</p>

                            <p className="control__text m0">Enter page name.</p>

                            <p className="control__text m0">Set preferences.</p>

                            {!pages ? (
                                <p className="control__subtext">Loading..</p>
                            ) : (
                                <>
                                    {pages.length > 0 ? (
                                        pages.map(page => (
                                            <PageItem
                                                key={page.id}
                                                name={page.name}
                                                onDelete={onDeletePage}
                                                onEdit={onEditPage}
                                                id={page.id}
                                                url={page.url}
                                            />
                                        ))
                                    ) : (
                                        <p className="control__subtext">Pages not found</p>
                                    )}

                                    <Link to="createpage" className="control__add default__hover">
                                        + add new Page
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <DeleteEntityDialog
                    open={isOpen}
                    isDeletationProccessing={isDeletationProccessing}
                    onClose={closeDialogHandler}
                    onDelete={onDeleteHandler}
                    title={'Are you sure you want to delete page?'}
                />
            )}
        </>
    );
};

export default ControlPanel;
