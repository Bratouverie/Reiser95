import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

import Modal from "../Modal";
import MenuMobileAdmin from '../MenuMobileAdmin';

const HeaderAdmin = () => {
    const [modal, setModal] = React.useState(false);
    const [menu, setMenu] = React.useState(false);

    return (
        <>
            <header className="header admin">
                <div className="container">
                    <div className="header__inner">
                        <Link to="/" className="header__logo">
                            <img
                                src="/assets/img/logo.png"
                                alt="logo"
                                className="header__logo--img"
                            />
                        </Link>

                        <div className="header__wallet--inner">
                            <nav className="header__nav header__admin--nav">
                                <Link
                                    to=""
                                    className="header__admin--nav--link"
                                >
                                    Control page
                                </Link>

                                <div className="header__admin--nav--link">
                                    Stats
                                    <span className="header__admin--nav--drop">
                                        <Link
                                            to="whitelist"
                                            className="header__admin--nav--drop--link"
                                        >
                                            White List
                                        </Link>

                                        <Link
                                            to="activity"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Activity
                                        </Link>

                                        <Link
                                            to="statistics"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Statistics
                                        </Link>
                                    </span>
                                </div>

                                <div className="header__admin--nav--link">
                                    Create
                                    <span className="header__admin--nav--drop">
                                        <Link
                                            to="createpage"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Create Page
                                        </Link>

                                        <Link
                                            to="createaccount"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Create Account
                                        </Link>

                                        <Link
                                            to="createcollection"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Create Collection
                                        </Link>

                                        <Link
                                            to="createpack"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Create Pack
                                        </Link>

                                        <Link
                                            to="createitem"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Create Item
                                        </Link>
                                    </span>
                                </div>
                            </nav>

                            <div className="header__wallet--inner">
                                <Link
                                    to="/profile"
                                    className="button header__wallet--button"
                                >
                                    <img
                                        src="/assets/img/profile-icon.png"
                                        alt="Profile"
                                        className="header__wallet--icon"
                                    />
                                </Link>

                                <button
                                    className="button header__wallet--button"
                                    onClick={() => setModal(true)}
                                >
                                    <img
                                        src="/assets/img/wallet.png"
                                        alt="Wallet"
                                        className="header__wallet--icon"
                                    />
                                </button>

                                <img
                                    src={`/assets/img/${
                                        menu ? "cross" : "menu"
                                    }.svg`}
                                    alt="menu"
                                    className="menu"
                                    onClick={() => setMenu(!menu)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Modal active={modal} setActive={setModal} />

            <MenuMobileAdmin active={menu} setActive={setMenu} />
        </>
    );
};

export default HeaderAdmin;
