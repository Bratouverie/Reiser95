import React from 'react';
import {Link} from 'react-router-dom';

const MenuLink = ({ hasChildren = false, link = "", closeMenu, icon = "", text }) => {
    return (
        <>
            {hasChildren ? (
                <button className="button mobile__nav--link">
                    <span className="mobile__nav--link--wrapper">
                        {icon && <img
                            src={icon}
                            alt="admin"
                            className="mobile__nav--link--icon"
                        />}

                        {text}
                    </span>

                    <img src="/assets/img/mobilemenu-arrow.svg" alt="arrow" />
                </button>
            ) : (
                <Link to={`/${link}`} className="mobile__nav--link" onClick={closeMenu}>
                    <span className="mobile__nav--link--wrapper">
                        {icon && <img
                            src={icon}
                            alt="admin"
                            className="mobile__nav--link--icon"
                        />}

                        {text}
                    </span>
                </Link>
            )}
        </>
    );
};

export default MenuLink;
