import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

const MenuMobile = ({ active, setActive, pagesList }) => {
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
                        {pagesList.map((data, id) => <Link key={id} to={`/${data.url}`} className="mobile__nav--link" onClick={closeMenu}>
                            {data.name}
                        </Link>)}

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
