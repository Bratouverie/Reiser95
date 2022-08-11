import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

const Header = () => {
    return (
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

                        <Link to="/collection" className="header__nav--link">
                            Collection
                        </Link>

                        <Link to="/stats" className="header__nav--link">
                            Stats
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
