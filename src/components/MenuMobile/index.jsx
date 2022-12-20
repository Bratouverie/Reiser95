import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { pagesSelectors } from '../../redux/slices/pages';

import './index.css';

const MenuMobile = ({ active, setActive }) => {
    const pages = useSelector(pagesSelectors.selectAll);

    const closeMenu = () => {
        setActive(false);
    };

    React.useEffect(() => {
        window.addEventListener('resize', function() {
            document.documentElement.scrollWidth > 751 && setActive(false);
        });
    }, [setActive]);

    return (
        <div className={`mobile__menu${active ? ' active' : ''}`}>
            <div className="container">
                <div className="mobile__menu--content">
                    <nav className="mobile__nav">
                        {pages.map(page => (
                            <Link
                                key={page.id}
                                to={`/${page.url}`}
                                className="mobile__nav--link"
                                onClick={closeMenu}
                            >
                                {page.name}
                            </Link>
                        ))}

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
