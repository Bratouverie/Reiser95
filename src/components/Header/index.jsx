import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

import Modal from '../Modal';

const Header = () => {
    const [modal, setModal] = React.useState(false);

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <Link to="/" className="header__logo">
                            <img
                                src="/assets/img/logo.png"
                                alt="logo"
                                className="header__logo--img"
                            />
                        </Link>

                        <nav className="header__nav">
                            <Link to="/" className="header__nav--link">
                                Persons
                            </Link>

                            <Link to="/brands" className="header__nav--link">
                                Brands
                            </Link>

                            <Link
                                to="/collection"
                                className="header__nav--link"
                            >
                                Collection
                            </Link>

                            <Link to="/stats" className="header__nav--link">
                                Stats
                            </Link>

                            <Link to="/watches" className="header__nav--link">
                                Watches
                            </Link>

                            <Link to="/about" className="header__nav--link">
                                About
                            </Link>
                        </nav>

                        <div className="header__wallet--inner">
                            <button className="button header__wallet--button">
                                <img
                                    src="/assets/img/profile.png"
                                    alt="Profile"
                                    className="header__wallet--icon"
                                />
                            </button>

                            <button className="button header__wallet--button" onClick={() => setModal(true)}>
                                <img
                                    src="/assets/img/wallet.png"
                                    alt="Wallet"
                                    className="header__wallet--icon"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <Modal active={modal} setActive={setModal} />
        </>
    );
};

export default Header;
