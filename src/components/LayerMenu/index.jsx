import React from 'react';
import { Link } from 'react-router-dom';
import MenuLink from '../../components/MenuLink';

const LayerMenu = ({active, setActive, closeMenu, backText, pages, mainMenu}) => {
    return (
        <div className={`mobile__menu${(active && mainMenu) ? ' active' : ''}`}>
            <div className="container">
                <div className="mobile__menu--content">
                    <button
                        className="button mobile__menu--back"
                        onClick={() => setActive(false)}
                    >
                        <img
                            src="/assets/img/back.svg"
                            alt="back"
                            className="mobile__menu--back--icon"
                        />

                        {backText}
                    </button>

                    <nav className="mobile__nav">
                        {pages.map((page) => (
                            <MenuLink key={page.id} closeMenu={closeMenu} icon={page.icon} text={page.name} link={page.url} />
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};
 export default LayerMenu;