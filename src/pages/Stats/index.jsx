import React from "react";

import "./index.css";

const Stats = () => {
    return (
        <div className="stats default__padding">
            <div className="container">
                <div className="stats__inner">
                    <h2 className="title stats__title">Top NFTs</h2>

                    <p className="stats__text">
                        The top NFTs on CheckBrandcom, ranked by volume, floor
                        price and other statistics.
                    </p>

                    <div className="stats__content">
                        <div className="stats__item--names">
                            <div className="stats__item--collection stats__item--item stats__item--name">
                                Collection
                            </div>

                            <div className="stats__item--volume stats__item--item stats__item--name">
                                Volume
                            </div>

                            <div className="stats__item--day stats__item--item stats__item--name">
                                24h %
                            </div>

                            <div className="stats__item--week stats__item--item stats__item--name">
                                7d %
                            </div>

                            <div className="stats__item--price stats__item--item stats__item--name">
                                Floor Price
                            </div>

                            <div className="stats__item--owners stats__item--item stats__item--name">
                                Owners
                            </div>

                            <div className="stats__item--items stats__item--item stats__item--name">
                                Items
                            </div>
                        </div>

                        <div className="stats__item--values">
                            <div className="stats__item--collection stats__item--item">
                                <p className="stats__item--value">
                                    1
                                </p>

                                <div className="stats__item--avatar--inner">
                                    <img src="/assets/img/avatar.png" alt="avatar" className="stats__item--avatar" />
                                </div>

                                <p className="stats__item--value">
                                    Collection name
                                </p>
                            </div>

                            <div className="stats__item--volume stats__item--item">
                                <img
                                    src="/assets/img/eth.svg"
                                    alt="eth"
                                    className="stats__item--eth"
                                />

                                <p className="stats__item--value">18,531.52</p>
                            </div>

                            <div className="stats__item--day stats__item--item stats__item--value loss">
                                -81.93%
                            </div>

                            <div className="stats__item--week stats__item--item stats__item--value profit">
                                +119.08%
                            </div>

                            <div className="stats__item--price stats__item--item">
                                <img
                                    src="/assets/img/eth.svg"
                                    alt="eth"
                                    className="stats__item--eth"
                                />

                                <p className="stats__item--value">1.45</p>
                            </div>

                            <div className="stats__item--owners stats__item--item stats__item--value">
                                10.3K
                            </div>

                            <div className="stats__item--items stats__item--item stats__item--value">
                                20.2K
                            </div>
                        </div>

                        <div className="stats__item--values">
                            <div className="stats__item--collection stats__item--item">
                                <p className="stats__item--value">
                                    2
                                </p>

                                <div className="stats__item--avatar--inner">
                                    <img src="/assets/img/avatar.png" alt="avatar" className="stats__item--avatar" />
                                </div>

                                <p className="stats__item--value">
                                    Collection name
                                </p>
                            </div>

                            <div className="stats__item--volume stats__item--item">
                                <img
                                    src="/assets/img/eth.svg"
                                    alt="eth"
                                    className="stats__item--eth"
                                />

                                <p className="stats__item--value">18,531.52</p>
                            </div>

                            <div className="stats__item--day stats__item--item stats__item--value loss">
                                
                            </div>

                            <div className="stats__item--week stats__item--item stats__item--value">
                                ---
                            </div>

                            <div className="stats__item--price stats__item--item">
                                <img
                                    src="/assets/img/eth.svg"
                                    alt="eth"
                                    className="stats__item--eth"
                                />

                                <p className="stats__item--value">1.45</p>
                            </div>

                            <div className="stats__item--owners stats__item--item stats__item--value">
                                10.3K
                            </div>

                            <div className="stats__item--items stats__item--item stats__item--value">
                                20.2K
                            </div>
                        </div>

                        <div className="stats__item--values">
                            <div className="stats__item--collection stats__item--item">
                                <p className="stats__item--value">
                                    3
                                </p>

                                <div className="stats__item--avatar--inner">
                                    <img src="/assets/img/avatar.png" alt="avatar" className="stats__item--avatar" />
                                </div>

                                <p className="stats__item--value">
                                    Collection name
                                </p>
                            </div>

                            <div className="stats__item--volume stats__item--item">
                                <img
                                    src="/assets/img/eth.svg"
                                    alt="eth"
                                    className="stats__item--eth"
                                />

                                <p className="stats__item--value">18,531.52</p>
                            </div>

                            <div className="stats__item--day stats__item--item stats__item--value loss">
                                -81.93%
                            </div>

                            <div className="stats__item--week stats__item--item stats__item--value profit">
                                +119.08%
                            </div>

                            <div className="stats__item--price stats__item--item">
                                <img
                                    src="/assets/img/eth.svg"
                                    alt="eth"
                                    className="stats__item--eth"
                                />

                                <p className="stats__item--value">1.45</p>
                            </div>

                            <div className="stats__item--owners stats__item--item stats__item--value">
                                10.3K
                            </div>

                            <div className="stats__item--items stats__item--item stats__item--value">
                                20.2K
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
