import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

import MenuMobile from "../MenuMobile";
import MenuMobileAdmin from "../MenuMobileAdmin";
import AuthElements from '../AuthElements';
import WalletMenu from '../WalletMenu';

const Header = ({isAdminPage = false}) => {
    const [menu, setMenu] = React.useState(false);
    const [menuAdmin, setMenuAdmin] = React.useState(false);
    const [walletMenu, setWalletMenu] = React.useState(false);

    return (
        <>
            <header className={`header${isAdminPage ? ' admin' : ''}`}>
                <div className="container">
                    <div className="header__inner">
                        <Link to="/" className="header__logo">
                            <img
                                src="/assets/img/logo.png"
                                alt="logo"
                                className="header__logo--img"
                            />
                        </Link>

                        {isAdminPage
                        ? <nav className="header__nav header__admin--nav">
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
                        : <nav className="header__nav">
                            <Link to="/persons" className="header__nav--link">
                                Persons
                            </Link>

                            <Link to="/brands" className="header__nav--link">
                                Brands
                            </Link>

                            <Link to="/alco" className="header__nav--link">
                                Alcohol
                            </Link>

                            <Link to="/watches" className="header__nav--link">
                                Watches
                            </Link>

                            <Link to="/cars" className="header__nav--link">
                                Cars
                            </Link>

                            <Link to="/stats" className="header__nav--link">
                                Stats
                            </Link>

                            <Link to="/about" className="header__nav--link">
                                About
                            </Link>

                            <Link to="/admin" className="header__nav--link">
                                Admin
                            </Link>
                        </nav>}

                        <div className="header__wallet--inner">
                            <AuthElements setActive={setWalletMenu} />

                            <div className="menu__inner">
                                <img src={`/assets/img/${menu ? "cross" : "menu"}.svg`} alt="menu" className="menu" onClick={() => setMenu(!menu)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {isAdminPage
            ? <MenuMobileAdmin active={menuAdmin} setActive={setMenuAdmin} />
            : <MenuMobile active={menu} setActive={setMenu} />}

            <WalletMenu active={walletMenu} setActive={setWalletMenu} />
        </>
    );
};

export default Header;
