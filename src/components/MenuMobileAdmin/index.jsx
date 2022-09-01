import React from "react";
import { Link } from "react-router-dom";

const MenuMobileAdmin = ({ active, setActive }) => {
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
                        <Link to="" className="mobile__nav--link" onClick={closeMenu}>
                            Control Page
                        </Link>

                        <Link to="whitelist" className="mobile__nav--link" onClick={closeMenu}>
                            White List
                        </Link>

                        <Link to="alco" className="mobile__nav--link" onClick={closeMenu}>
                            Activity
                        </Link>

                        <Link to="watches" className="mobile__nav--link" onClick={closeMenu}>
                            Statistics
                        </Link>

                        <Link to="createpage" className="mobile__nav--link" onClick={closeMenu}>
                            Create Page
                        </Link>

                        <Link to="createaccount" className="mobile__nav--link" onClick={closeMenu}>
                            Create Account
                        </Link>

                        <Link to="createcollection" className="mobile__nav--link" onClick={closeMenu}>
                            Create Collection
                        </Link>

                        <Link to="about" className="mobile__nav--link" onClick={closeMenu}>
                            Create Pack
                        </Link>

                        <Link to="about" className="mobile__nav--link" onClick={closeMenu}>
                            Create Item
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MenuMobileAdmin;
