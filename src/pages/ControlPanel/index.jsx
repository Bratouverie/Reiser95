import React from 'react';

import './index.css'

const ControlPanel = () => {
    const [confirm, setConfirm] = React.useState(false);

    return(
        <div className="default__padding control">
            <div className="container">
                <div className="control__inner">
                    <h2 className="title left">
                        Control Panel
                    </h2>

                    <div className="control__wrapper">
                        <p className="control__text">
                            "Reliable control is a big part of success"
                        </p>

                        <p className="text bold left">
                            Set access rights and control all platform processes in one place
                        </p>

                        <p className="control__text m0">
                            Access to the appointment of administrators is only for the Super Admin
                        </p>
                    </div>

                    <div className="control__wrapper">
                        <p className="text bold left m0">
                            Super Admin
                        </p>

                        <p className="control__text m0">
                            Super administrator manages all platform processes.
                        </p>

                        <p className="control__text m0">
                            Enter super admin wallet address:
                        </p>

                        <div className="control__item">
                            <input type="text" className="input control__input" placeholder="Super admin wallet address" />

                            <button className="button control__item--settings default__hover" onClick={() => setConfirm(!confirm)}>
                                <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />

                                {confirm && <span className="control__button--confirm">
                                    Edit
                                </span>}
                            </button>

                            <button className="button control__item--confirm default__hover">
                                Conferm
                            </button>
                        </div>
                    </div>

                    <div className="control__wrapper">
                        <p className="text bold left m0">
                            Administrator
                        </p>

                        <p className="control__text m0">
                            Has a limited list of powers.
                        </p>

                        <p className="control__text m0">
                            Enter Admin wallet address:
                        </p>

                        <div className="control__item">
                            <input type="text" className="input control__input" placeholder="Admin wallet address" />

                            <button className="button control__item--settings default__hover">
                                <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                            </button>

                            <button className="button control__item--confirm default__hover">
                                Conferm
                            </button>
                        </div>

                        <button className="button control__add default__hover">
                            + add new Admin
                        </button>
                    </div>

                    <div className="control__wrapper">
                        <p className="text bold left m0">
                            Moderator
                        </p>

                        <p className="control__text m0">
                            Has a limited list of powers.
                        </p>

                        <p className="control__text m0">
                            Enter Moderator wallet address:
                        </p>

                        <div className="control__item">
                            <input type="text" readOnly value="04388fs8v7dfv7d8g878d7g8vd89g89dg89d789fa" className="input control__input" placeholder="Admin wallet address" />

                            <button className="button control__item--settings default__hover">
                                <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                            </button>

                            <button className="button control__item--confirm default__hover delete">
                                Delete
                            </button>
                        </div>

                        <div className="control__item">
                            <input type="text" className="input control__input" placeholder="Admin wallet address" />

                            <button className="button control__item--settings default__hover">
                                <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                            </button>

                            <button className="button control__item--confirm default__hover save">
                                Save
                            </button>
                        </div>

                        <button className="button control__add default__hover">
                            + add new Moder
                        </button>
                    </div>

                    <div className="control__wrapper">
                        <p className="text bold left m0">
                            Create Page
                        </p>

                        <p className="control__text m0">
                            Enter page name.
                        </p>

                        <p className="control__text m0">
                            Set preferences.
                        </p>

                        <div className="control__item">
                            <input type="text" readOnly value="Stats" className="input control__input" placeholder="Admin wallet address" />

                            <button className="button control__item--settings default__hover">
                                <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                            </button>

                            <button className="button control__item--confirm default__hover delete">
                            Delete
                            </button>
                        </div>

                        <div className="control__item">
                            <input type="text" readOnly value="Brsnds" className="input control__input" placeholder="Admin wallet address" />

                            <button className="button control__item--settings default__hover">
                                <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                            </button>

                            <button className="button control__item--confirm default__hover delete">
                            Delete
                            </button>
                        </div>

                        <button className="button control__add default__hover">
                            + add new Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlPanel;