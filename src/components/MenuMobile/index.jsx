import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { pagesSelectors } from '../../redux/slices/pages';

import LayerMenu from '../../components/LayerMenu';
import MenuLink from '../../components/MenuLink';

import './index.css';

const pages2 = [
    {
        id: 0,
        icon: "",
        name: "Rankings",
        url: "rankings"
    },
    {
        id: 1,
        icon: "",
        name: "Opportunities",
        url: "opportunities"
    },
    {
        id: 2,
        icon: "",
        name: "Withdraw",
        url: "withdraw"
    },
    {
        id: 3,
        icon: "",
        name: "About",
        url: "about"
    },
    {
        id: 4,
        icon: "",
        name: "White paper",
        url: "whitepaper"
    }
]

const MenuMobile = ({ active, setActive, setActiveConnect }) => {
    const pages = useSelector(pagesSelectors.selectAll);
    const auth = useSelector((state) => state.auth);

    const [activeExplore, setActiveExplore] = React.useState(false);
    const [activeResources, setActiveResources] = React.useState(false);

    const closeMenu = () => {
        setActive(false);
    };

    React.useEffect(() => {
        window.addEventListener('resize', function() {
            document.documentElement.scrollWidth > 751 && setActive(false);
        });
    }, [setActive]);

    return (
        <>
            <div className={`mobile__menu${active ? ' active' : ''}`}>
                <div className="container">
                    <div className="mobile__menu--content">
                        <div className="menu__search--inner">
                            <input type="text" className="input header__search" placeholder="Search brand" />

                            <img
                                src="/assets/img/search.svg"
                                alt="search"
                                className="header__search--icon"
                            />
                        </div>

                        <nav className="mobile__nav">
                            <button className="button mobile__nav--link" onClick={() => setActiveExplore(true)}>
                                <span className="mobile__nav--link--wrapper">
                                    <img src="/assets/img/mobilemenu1.svg" alt="admin" className="mobile__nav--link--icon" />

                                    Explore
                                </span>

                                <img src="/assets/img/mobilemenu-arrow.svg" alt="arrow" />
                            </button>

                            <button className="button mobile__nav--link" onClick={() => setActiveResources(true)}>
                                <span className="mobile__nav--link--wrapper">
                                    <img src="/assets/img/mobilemenu2.svg" alt="admin" className="mobile__nav--link--icon" />

                                    Resources
                                </span>

                                <img src="/assets/img/mobilemenu-arrow.svg" alt="arrow" />
                            </button>

                            <MenuLink link="profile" closeMenu={closeMenu} text="Account" icon="/assets/img/mobilemenu3.svg" />
                            <MenuLink closeMenu={() => setActiveConnect(true)} text="My Wallet" icon="/assets/img/mobilemenu4.svg" />
                            <MenuLink link="admin" closeMenu={closeMenu} text="Admin" icon="/assets/img/mobilemenu5.svg" />
                        </nav>

                        {!auth.isAuth && <button className="button mobile__menu--connect" onClick={() => setActiveConnect(true)}>
                            Connect wallet
                        </button>}
                    </div>
                </div>
            </div>

            <LayerMenu mainMenu={active} active={activeExplore} setActive={setActiveExplore} closeMenu={closeMenu} pages={pages} backText="Explore" />
            <LayerMenu mainMenu={active} active={activeResources} setActive={setActiveResources} closeMenu={closeMenu} pages={pages2} backText="Resources" />
        </>
    );
};

export default MenuMobile;
