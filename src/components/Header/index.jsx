import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

import MenuMobile from "../MenuMobile";
import MenuMobileAdmin from "../MenuMobileAdmin";
import AuthElements from '../AuthElements';
import WalletMenu from '../WalletMenu';
import { useSelector } from "react-redux";

import {getPages} from '../../functions/data';

const Header = ({isAdminPage = false}) => {
    const [menu, setMenu] = React.useState(false);
    const [menuAdmin, setMenuAdmin] = React.useState(false);
    const [walletMenu, setWalletMenu] = React.useState(false);
    const [pagesList, setPagesList] = React.useState([]);
    const [pagesLoading, setPagesLoading] = React.useState(false);

    const auth = useSelector(state => state.auth);

    React.useEffect(() => {
        if(auth.accessToken){
            setPagesLoading(true);
            const res = getPages(auth.accessToken);
            res.then(data => setPagesList(data.data)).finally(() => setPagesLoading(false));
        }
    }, [auth]);

    if(pagesLoading){
        return "";
    }

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

                        {auth.isAuth && (isAdminPage
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
                            {pagesList.map((data, id) => 
                                <Link key={id} to={`/${data.url}`} className="header__nav--link">
                                    {data.name}
                                </Link>
                            )}

                            <Link to="/stats" className="header__nav--link">
                                Stats
                            </Link>

                            <Link to="/about" className="header__nav--link">
                                About
                            </Link>

                            <Link to="/admin" className="header__nav--link">
                                Admin
                            </Link>
                        </nav>)}

                        <div className="header__wallet--inner">
                            <AuthElements setActive={setWalletMenu} menu={menu} setMenu={setMenu} />
                        </div>
                    </div>
                </div>
            </header>

            {isAdminPage
            ? <MenuMobileAdmin active={menuAdmin} setActive={setMenuAdmin} />
            : <MenuMobile active={menu} setActive={setMenu} pagesList={pagesList} />}

            <WalletMenu active={walletMenu} setActive={setWalletMenu} />
        </>
    );
};

export default Header;
