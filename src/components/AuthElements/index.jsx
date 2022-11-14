import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';

const AuthElements = ({setActive, menu, setMenu}) => {
    const auth = useSelector((state) => state.auth);

    return (
        <>
            {auth.isAuth
            ? <Link to="/profile" className="header__wallet--button">
                <img src="/assets/img/profile-icon.png" alt="Profile" className="header__wallet--icon" />
            </Link>
            : <button onClick={() => setActive(true)} className="button header__wallet--button">
                <img src="/assets/img/profile-icon.png" alt="Profile" className="header__wallet--icon" />
            </button>}

            <button className="button header__wallet--button" onClick={() => setActive(true)}>
                <img src="/assets/img/wallet.png" alt="Wallet" className="header__wallet--icon"/>
            </button>
            
            {auth.isAuth
            ? <div className="menu__inner">
                <img src={`/assets/img/${menu ? "cross" : "menu"}.svg`} alt="menu" className="menu" onClick={() => setMenu(!menu)}/>
            </div>
            : <div className="menu__inner" onClick={() => setActive(true)}>
                <img src={`/assets/img/${menu ? "cross" : "menu"}.svg`} alt="menu" className="menu" />
            </div>}
        </>
    );
};

export default AuthElements;
