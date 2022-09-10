import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

const MenuMobile = ({ active, setActive }) => {
    const closeMenu = () => {
        setActive(false);
    }

    React.useEffect(() => {
        window.addEventListener('resize', function(){
            document.documentElement.scrollWidth > 751 && setActive(false);
        });
    }, [setActive]);

    return (
        <div className={`mobile__menu${active ? " active" : ""}`}>
            <div className="container">
                <div className="mobile__menu--content">
                    <nav className="mobile__nav">
                        <Link to="/persons" className="mobile__nav--link" onClick={closeMenu}>
                            Persons
                        </Link>

                        <Link to="/brands" className="mobile__nav--link" onClick={closeMenu}>
                            Brands
                        </Link>

                        <Link to="/alco" className="mobile__nav--link" onClick={closeMenu}>
                            Alcohol
                        </Link>

                        <Link to="/watches" className="mobile__nav--link" onClick={closeMenu}>
                            Watches
                        </Link>

                        <Link to="/cars" className="mobile__nav--link" onClick={closeMenu}>
                            Cars
                        </Link>

                        <Link to="/stats" className="mobile__nav--link" onClick={closeMenu}>
                            Stats
                        </Link>

                        <Link to="/about" className="mobile__nav--link" onClick={closeMenu}>
                            About
                        </Link>

                        <Link to="/admin" className="mobile__nav--link" onClick={closeMenu}>
                            Admin
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MenuMobile;
