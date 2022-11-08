import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';

const AuthElements = ({setActive}) => {
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
        </>
    );
};

export default AuthElements;
