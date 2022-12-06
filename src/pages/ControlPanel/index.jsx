import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Preloader from '../../common/Preloader';
import PageItem from '../../components/PageItem';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { USER_ROLES } from '../../const/users/USER_ROLES';
import UserRow from './UserRow';

import './index.css';

const ControlPanel = () => {
    const auth = useSelector(state => state.auth);
    const pages = useSelector(state => state.pages);

    const [superAdmins, setSuperAdmins] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [moderators, setModerators] = useState([]);

    const [isNewAdminCreating, setIsNewAdminCreating] = useState(false);
    const [isNewModeratorCreating, setIsNewModeratorCreating] = useState(false);

    const { state: getSuperAdminsRS, request: onGetSuperAdmins } = useRequest({
        url: '/users_by_role/super_admin',
        requestType: REQUEST_TYPE.USER,
        isAuth: true,
    });

    const { state: getAdminsRS, request: onGetAdmins } = useRequest({
        url: '/users_by_role/admin',
        requestType: REQUEST_TYPE.USER,
        isAuth: true,
    });

    const { state: getModeratorsRS, request: onGetModerators } = useRequest({
        url: '/users_by_role/moderator',
        requestType: REQUEST_TYPE.USER,
        isAuth: true,
    });

    const onNewAdminCreateStateChange = useCallback(() => {
        setIsNewAdminCreating(p => !p);
    }, []);

    const onNewModerCreate = useCallback(() => {
        setIsNewModeratorCreating(p => !p);
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

    useEffect(() => {
        if (getSuperAdminsRS.result && getSuperAdminsRS.result.data) {
            setSuperAdmins(getSuperAdminsRS.result.data.users);
        }
    }, [getSuperAdminsRS]);

    useEffect(() => {
        if (getAdminsRS.result && getAdminsRS.result.data) {
            setAdmins(getAdminsRS.result.data.users);
        }
    }, [getAdminsRS]);

    useEffect(() => {
        if (getModeratorsRS.result && getModeratorsRS.result.data) {
            setModerators(getModeratorsRS.result.data.users);
        }
    }, [getModeratorsRS]);

    useEffect(() => {
        onGetSuperAdmins({});
        onGetAdmins({});
        onGetModerators({});
    }, []);

    if (
        auth.loadAuth ||
        getAdminsRS.isProcessing ||
        getAdminsRS.isProcessing ||
        getModeratorsRS.isProcessing
    ) {
        return <Preloader />;
    }

    return (
        <div className="default__padding control">
            <div className="container">
                <div className="control__inner">
                    <h2 className="title left">Control Panel</h2>

                    <div className="control__wrapper">
                        <p className="control__text">"Reliable control is a big part of success"</p>

                        <p className="text bold left">
                            Set access rights and control all platform processes in one place
                        </p>

                        <p className="control__text m0">
                            Access to the appointment of administrators is only for the Super Admin
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

                        {!pages || !pages.pages || pages.isLoading ? (
                            <p className="control__subtext">Loading..</p>
                        ) : (
                            <>
                                {pages.pages.length > 0 ? (
                                    pages.pages.map(page => (
                                        <PageItem key={page.id} name={page.name} id={page.id} />
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
    );
};

export default ControlPanel;
