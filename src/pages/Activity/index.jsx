import React from 'react';

import './index.css';

import StatChart from '../../components/StatChart';

const Activity = () => {
    return(
        <section className="default__padding activity">
            <div className="container">
                <div className="activity__inner">
                    <StatChart />

                    <div className="activity__content">
                        <div className="activity__item titles">
                            <p className="whitelist__item--title"></p>

                            <p className="whitelist__item--title">
                                Item
                            </p>

                            <p className="whitelist__item--title">
                                Price
                            </p>

                            <p className="whitelist__item--title">
                                Quantity
                            </p>

                            <p className="whitelist__item--title">
                                From
                            </p>

                            <p className="whitelist__item--title">
                                To
                            </p>

                            <p className="whitelist__item--title">
                                Time
                            </p>
                        </div>

                        <div className="activity__item">
                            <div className="activity__item--icon--inner">
                                <img src="/assets/img/scroller.svg" alt="scroller" className="activity__item--icon" />

                                <p className="activity__item--icon--title">
                                    Minted
                                </p>
                            </div>

                            <div className="whitelist__item--collection">
                                <div className="whitelist__item--collection--img"></div>

                                <p className="whitelist__item--collection--title">
                                    Collection name
                                </p>
                            </div>

                            <div className="activity__item--price">
                                <div className="activity__item--price--wrapper">
                                    <img src="/assets/img/eth.svg" alt="eth" className="eth" />

                                    <p className="activity__item--price--val">
                                        0.00
                                    </p>
                                </div>

                                <p className="activity__item--price--dollars">
                                    $ 000.00
                                </p>
                            </div>

                            <p className="whitelist__item--number">
                                3
                            </p>

                            <p className="whitelist__item--username">
                                CheckBrandcom
                            </p>

                            <p className="whitelist__item--username">
                                Username
                            </p>

                            <p className="whitelist__item--number">
                                2 hours ago
                            </p>
                        </div>

                        <div className="activity__item">
                            <div className="activity__item--icon--inner">
                                <img src="/assets/img/check-icon.svg" alt="check" className="activity__item--icon" />

                                <p className="activity__item--icon--title">
                                    Booked
                                </p>
                            </div>

                            <div className="whitelist__item--collection">
                                <div className="whitelist__item--collection--img"></div>

                                <p className="whitelist__item--collection--title">
                                    Collection name
                                </p>
                            </div>

                            <div className="activity__item--price">
                                <div className="activity__item--price--wrapper">
                                    <img src="/assets/img/eth.svg" alt="eth" className="eth" />

                                    <p className="activity__item--price--val">
                                        0.00
                                    </p>
                                </div>

                                <p className="activity__item--price--dollars">
                                    $ 000.00
                                </p>
                            </div>

                            <p className="whitelist__item--number">
                                3
                            </p>

                            <p className="whitelist__item--username">
                                CheckBrandcom
                            </p>

                            <p className="whitelist__item--username">
                                Username
                            </p>

                            <p className="whitelist__item--number">
                                2 hours ago
                            </p>
                        </div>

                        <div className="activity__item">
                            <div className="activity__item--icon--inner">
                                <img src="/assets/img/hand.svg" alt="hand" className="activity__item--icon" />

                                <p className="activity__item--icon--title">
                                    Booked <span className="expired">expired</span>
                                </p>
                            </div>

                            <div className="whitelist__item--collection">
                                <div className="whitelist__item--collection--img"></div>

                                <p className="whitelist__item--collection--title">
                                    Collection name
                                </p>
                            </div>

                            <div className="activity__item--price">
                                <div className="activity__item--price--wrapper">
                                    <img src="/assets/img/eth.svg" alt="eth" className="eth" />

                                    <p className="activity__item--price--val">
                                        0.00
                                    </p>
                                </div>

                                <p className="activity__item--price--dollars">
                                    $ 000.00
                                </p>
                            </div>

                            <p className="whitelist__item--number">
                                3
                            </p>

                            <p className="whitelist__item--username">
                                CheckBrandcom
                            </p>

                            <p className="whitelist__item--username">
                                Username
                            </p>

                            <p className="whitelist__item--number">
                                2 hours ago
                            </p>
                        </div>

                        <div className="activity__item">
                            <div className="activity__item--icon--inner">
                                <img src="/assets/img/smile.svg" alt="scroller" className="activity__item--icon" />

                                <p className="activity__item--icon--title">
                                    Booked Cancel
                                </p>
                            </div>

                            <div className="whitelist__item--collection">
                                <div className="whitelist__item--collection--img"></div>

                                <p className="whitelist__item--collection--title">
                                    Collection name
                                </p>
                            </div>

                            <div className="activity__item--price">
                                <div className="activity__item--price--wrapper">
                                    <img src="/assets/img/eth.svg" alt="eth" className="eth" />

                                    <p className="activity__item--price--val">
                                        0.00
                                    </p>
                                </div>

                                <p className="activity__item--price--dollars">
                                    $ 000.00
                                </p>
                            </div>

                            <p className="whitelist__item--number">
                                3
                            </p>

                            <p className="whitelist__item--username">
                                CheckBrandcom
                            </p>

                            <p className="whitelist__item--username">
                                Username
                            </p>

                            <p className="whitelist__item--number">
                                2 hours ago
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Activity;