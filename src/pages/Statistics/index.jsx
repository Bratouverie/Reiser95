import React from 'react';

import './index.css';

const Statistics = () => {
    return(
        <section className="default__padding statistics">
            <div className="container">
                <div className="statistics__inner">
                    <h2 className="statistics__title">
                        Accounts
                    </h2>

                    <div className="statistics__content">
                        <div className="statistics__item titles">
                            <p className="statistics__subtitle">
                                Account
                            </p>

                            <p className="statistics__subtitle">
                                Collections
                            </p>

                            <p className="statistics__subtitle">
                                Profit
                            </p>

                            <p className="statistics__subtitle">
                                Cover
                            </p>

                            <p className="statistics__subtitle">
                                Banner Image
                            </p>

                            <p className="statistics__subtitle">
                                Description
                            </p>

                            <p className="statistics__subtitle">
                                Page
                            </p>
                        </div>

                        <div className="statistics__item">
                            <div className="statistics__collection">
                                <p className="stats__item--value">1</p>

                                <div className="stats__item--avatar--inner">
                                    <img
                                        src="/assets/img/avatar.png"
                                        alt="avatar"
                                        className="stats__item--avatar"
                                    />
                                </div>

                                <div className="stats__item--wrapper">
                                    <p className="stats__item--value">Account name</p>
                                </div>
                            </div>

                            <p className="statistics__subtitle">
                                0
                            </p>

                            <div className="statistics__profit">
                                <img src="/assets/img/eth.svg" alt="eth" className="eth" />

                                <p className="statistics__profit--val">
                                    0,000.00
                                </p>
                            </div>

                            <div className="statistics__banner">
                                <div className="statistics__banner--img cover"></div>
                            </div>

                            <div className="statistics__banner">
                                <div className="statistics__banner--img banner"></div>
                            </div>

                            <p className="statistics__text">
                                Describe of Account
                            </p>

                            <p className="statistics__page">
                                Brands
                            </p>
                        </div>

                        <div className="statistics__item">
                            <div className="statistics__collection">
                                <p className="stats__item--value">1</p>

                                <div className="stats__item--avatar--inner">
                                    <img
                                        src="/assets/img/avatar.png"
                                        alt="avatar"
                                        className="stats__item--avatar"
                                    />
                                </div>

                                <div className="stats__item--wrapper">
                                    <p className="stats__item--value">Account name</p>
                                </div>
                            </div>

                            <p className="statistics__subtitle">
                                0
                            </p>

                            <div className="statistics__profit">
                                <img src="/assets/img/eth.svg" alt="eth" className="eth" />

                                <p className="statistics__profit--val">
                                    0,000.00
                                </p>
                            </div>

                            <div className="statistics__banner">
                                <div className="statistics__banner--img cover"></div>
                            </div>

                            <div className="statistics__banner">
                                <div className="statistics__banner--img banner"></div>
                            </div>

                            <p className="statistics__text">
                                Describe of Account
                            </p>

                            <p className="statistics__page">
                                Brands
                            </p>
                        </div>

                        <div className="statistics__item">
                            <div className="statistics__collection">
                                <p className="stats__item--value">1</p>

                                <div className="stats__item--avatar--inner">
                                    <img
                                        src="/assets/img/avatar.png"
                                        alt="avatar"
                                        className="stats__item--avatar"
                                    />
                                </div>

                                <div className="stats__item--wrapper">
                                    <p className="stats__item--value">Account name</p>
                                </div>
                            </div>

                            <p className="statistics__subtitle">
                                0
                            </p>

                            <div className="statistics__profit">
                                <img src="/assets/img/eth.svg" alt="eth" className="eth" />

                                <p className="statistics__profit--val">
                                    0,000.00
                                </p>
                            </div>

                            <div className="statistics__banner">
                                <div className="statistics__banner--img cover"></div>
                            </div>

                            <div className="statistics__banner">
                                <div className="statistics__banner--img banner"></div>
                            </div>

                            <p className="statistics__text">
                                Describe of Account
                            </p>

                            <p className="statistics__page">
                                Brands
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Statistics;