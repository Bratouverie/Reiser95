import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './index.css';

import MenuMobile from '../MenuMobile';
import MenuMobileAdmin from '../MenuMobileAdmin';
import AuthElements from '../AuthElements';
import WalletMenu from '../WalletMenu';
import { pagesSelectors } from '../../redux/slices/pages';

// import { getPages } from '../../functions/data';
// import { setIsAuth, setPages } from '../../redux/slices/pages';

const Header = ({ isAdminPage = false }) => {
    const [menu, setMenu] = React.useState(false);
    const [menuAdmin, setMenuAdmin] = React.useState(false);
    const [walletMenu, setWalletMenu] = React.useState(false);
    const pages = useSelector(pagesSelectors.selectAll);
    // const dispatch = useDispatch();

    // // Перенести запрос страниц с шапки в отдельную функцию, которая 100% будет подгружаться при загрузке сайта
    // React.useEffect(() => {
    //     if(pages.pages.length <= 0){
    //         dispatch(setIsAuth(true));
    //         const pagesList = getPages();

    //         pagesList.then(d => {
    //             dispatch(setPages(d.data));
    //         }).catch(e => {
    //             console.log(e);
    //         }).finally(() => {
    //             dispatch(setIsAuth(false));
    //         });
    //     }
    // }, []);

    if (!pages) {
        return ''; //Типо прелоадер
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

                        {isAdminPage ? (
                            <nav className="header__nav header__admin--nav">
                                <Link to="" className="header__admin--nav--link">
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
                        ) : (
                            <nav className="header__nav">
                                {pages.map(page => (
                                    <Link
                                        key={page.id}
                                        to={`/${page.url}`}
                                        className="header__nav--link"
                                    >
                                        {page.name}
                                    </Link>
                                ))}

                                <Link to="/stats" className="header__nav--link">
                                    Stats
                                </Link>

                                <Link to="/about" className="header__nav--link">
                                    About
                                </Link>

                                <Link to="/admin" className="header__nav--link">
                                    Admin
                                </Link>
                            </nav>
                        )}

                        <div className="header__wallet--inner">
                            <AuthElements setActive={setWalletMenu} menu={menu} setMenu={setMenu} />
                        </div>
                    </div>
                </div>
            </header>

            {isAdminPage ? (
                <MenuMobileAdmin active={menuAdmin} setActive={setMenuAdmin} />
            ) : (
                <MenuMobile active={menu} setActive={setMenu} />
            )}

            <WalletMenu active={walletMenu} setActive={setWalletMenu} />
        </>
    );
};

export default Header;
