import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

import Modal from "../Modal";
import MenuMobile from "../MenuMobile";

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
                                    to="/"
                                    className="header__admin--nav--link"
                                >
                                    Control page
                                </Link>

                                <Link
                                    to="/brands"
                                    className="header__admin--nav--link"
                                >
                                    Stats
                                    <span className="header__admin--nav--drop">
                                        <Link
                                            to="/"
                                            className="header__admin--nav--drop--link"
                                        >
                                            White List
                                        </Link>

                                        <Link
                                            to="/"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Activity
                                        </Link>

                                        <Link
                                            to="/"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Statistics
                                        </Link>
                                    </span>
                                </Link>

                                <Link
                                    to="/alco"
                                    className="header__admin--nav--link"
                                >
                                    Create
                                    <span className="header__admin--nav--drop">
                                        <Link
                                            to="/"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Create Page
                                        </Link>

                                        <Link
                                            to="/"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Create Account
                                        </Link>

                                        <Link
                                            to="/"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Create Collection
                                        </Link>

                                        <Link
                                            to="/"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Create Pack
                                        </Link>

                                        <Link
                                            to="/"
                                            className="header__admin--nav--drop--link"
                                        >
                                            Create Item
                                        </Link>
                                    </span>
                                </Link>
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

            <MenuMobile active={menu} setActive={setMenu} />
        </>
    );
};

export default HeaderAdmin;
