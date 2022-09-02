import React from "react";
import { Link } from "react-router-dom";

const Account = () => {
    return (
        <div className="statistics__inner">
            <h2 className="statistics__title">Accounts</h2>

            <div className="statistics__content">
                <div className="statistics__item titles">
                    <p className="statistics__subtitle">Account</p>

                    <p className="statistics__subtitle">Collections</p>

                    <p className="statistics__subtitle">Profit</p>

                    <p className="statistics__subtitle">Cover</p>

                    <p className="statistics__subtitle">Banner Image</p>

                    <p className="statistics__subtitle">Description</p>

                    <p className="statistics__subtitle">Page</p>
                </div>

                <Link to="collection" className="statistics__item">
                    <span className="statistics__collection">
                        <p className="stats__item--value">1</p>

                        <span className="stats__item--avatar--inner">
                            <img
                                src="/assets/img/avatar.png"
                                alt="avatar"
                                className="stats__item--avatar"
                            />
                        </span>

                        <span className="stats__item--wrapper">
                            <p className="stats__item--value">Account name</p>
                        </span>
                    </span>

                    <p className="statistics__subtitle">0</p>

                    <span className="statistics__profit">
                        <img
                            src="/assets/img/eth.svg"
                            alt="eth"
                            className="eth"
                        />

                        <p className="statistics__profit--val">0,000.00</p>
                    </span>

                    <span className="statistics__banner">
                        <span className="statistics__banner--img cover"></span>
                    </span>

                    <span className="statistics__banner">
                        <span className="statistics__banner--img banner"></span>
                    </span>

                    <p className="statistics__text">Describe of Account</p>

                    <p className="statistics__page">Brands</p>
                </Link>
            </div>
        </div>
    );
};

export default Account;
