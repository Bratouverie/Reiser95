import React from "react";
import { Link } from "react-router-dom";

const AuthElements = ({setActive}) => {
    return (
        <>
            <Link to="/profile" className="button header__wallet--button">
                <img
                    src="/assets/img/profile-icon.png"
                    alt="Profile"
                    className="header__wallet--icon"
                />
            </Link>

            <button className="button header__wallet--button" onClick={() => setActive(true)}>
                <img src="/assets/img/wallet.png" alt="Wallet" className="header__wallet--icon"/>
            </button>
        </>
    );
};

export default AuthElements;
