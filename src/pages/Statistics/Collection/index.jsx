import React from "react";
import { Link } from "react-router-dom";

const Collection = () => {
    return (
        <div className="statistics__inner">
            <h2 className="statistics__title">Collections</h2>

            <div className="statistics__content">
                <div className="statistics__collection--item titles">
                    <p className="statistics__subtitle">Collection</p>

                    <p className="statistics__subtitle">Items</p>

                    <p className="statistics__subtitle">Profit</p>

                    <p className="statistics__subtitle">Featured Image</p>

                    <p className="statistics__subtitle">Banner Image</p>

                    <p className="statistics__subtitle">Description</p>

                    <p className="statistics__subtitle">OpenSea Category</p>

                    <p className="statistics__subtitle">Page</p>

                    <p className="statistics__subtitle">Account</p>

                    <p className="statistics__subtitle">Blockchain</p>

                    <p className="statistics__subtitle">Creator Fee %</p>

                    <p className="statistics__subtitle">Creator Profit</p>

                    <p className="statistics__subtitle">Owners</p>
                </div>

                <Link to="../pack" className="statistics__collection--item">
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
                            <p className="stats__item--value">
                                Collection name
                            </p>
                        </span>
                    </span>

                    <p className="statistics__subtitle">100</p>

                    <span className="statistics__profit">
                        <img
                            src="/assets/img/eth.svg"
                            alt="eth"
                            className="eth"
                        />

                        <p className="statistics__profit--val">0,000.00</p>
                    </span>

                    <span className="statistics__banner">
                        <span className="statistics__banner--img feature"></span>
                    </span>

                    <span className="statistics__banner">
                        <span className="statistics__banner--img banner"></span>
                    </span>

                    <p className="statistics__text">Describe of Account</p>

                    <p className="statistics__text">Collectibles</p>

                    <p className="statistics__page center">Brands</p>

                    <p className="statistics__account">Armani</p>

                    <p className="statistics__text">Ethereum</p>

                    <p className="statistics__creator">5</p>

                    <span className="statistics__profit">
                        <img
                            src="/assets/img/eth.svg"
                            alt="eth"
                            className="eth"
                        />

                        <p className="statistics__profit--val">0,000.00</p>
                    </span>

                    <p className="statistics__text">100</p>
                </Link>
            </div>
        </div>
    );
};

export default Collection;
