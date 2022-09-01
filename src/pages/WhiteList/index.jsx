import React from 'react';

import './index.css';

import StatChart from '../../components/StatChart';

const WhiteList = () => {
    return(
        <section className="default__padding whitelist">
            <div className="container">
                <div className="whitelist__inner">
                    <StatChart />

                    <div className="whitelist__content">
                        <div className="whitelist__item">
                            <p className="whitelist__item--title"></p>

                            <p className="whitelist__item--title">
                                Collection
                            </p>

                            <p className="whitelist__item--title">
                                From
                            </p>

                            <p className="whitelist__item--title">
                                Number
                            </p>

                            <p className="whitelist__item--title">
                                In work
                            </p>

                            <p className="whitelist__item--title">
                                Action
                            </p>
                        </div>

                        <div className="whitelist__item">
                            <div className="whitelist__item--list">
                                <div className="whitelist__item--list--circle white"></div>

                                <p className="whitelist__item--list--title">
                                    White List
                                </p>
                            </div>

                            <div className="whitelist__item--collection">
                                <div className="whitelist__item--collection--img"></div>

                                <p className="whitelist__item--collection--title">
                                    Collection name
                                </p>
                            </div>

                            <p className="whitelist__item--username">
                                Username
                            </p>

                            <p className="whitelist__item--number">
                                3
                            </p>

                            <div className="whitelist__item--inwork progress"></div>

                            <div className="whitelist__item--buttons">
                                <button className="button whitelist__item--button confirm">
                                    Conferm
                                </button>
                            </div>
                        </div>

                        <div className="whitelist__item">
                            <div className="whitelist__item--list">
                                <div className="whitelist__item--list--circle purple"></div>

                                <p className="whitelist__item--list--title">
                                    Reserve List
                                </p>
                            </div>

                            <div className="whitelist__item--collection">
                                <div className="whitelist__item--collection--img"></div>

                                <p className="whitelist__item--collection--title">
                                    Collection name
                                </p>
                            </div>

                            <p className="whitelist__item--username">
                                Username
                            </p>

                            <p className="whitelist__item--number">
                                2
                            </p>

                            <div className="whitelist__item--inwork"></div>

                            <div className="whitelist__item--buttons">
                                <button className="button whitelist__item--button delete">
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="whitelist__item del">
                            <div className="whitelist__item--list">
                                <div className="whitelist__item--list--circle red"></div>

                                <p className="whitelist__item--list--title">
                                    Deleted
                                </p>
                            </div>

                            <div className="whitelist__item--collection">
                                <div className="whitelist__item--collection--img"></div>

                                <p className="whitelist__item--collection--title">
                                    Collection name
                                </p>
                            </div>

                            <p className="whitelist__item--username">
                                Username
                            </p>

                            <p className="whitelist__item--number">
                                1
                            </p>

                            <div className="whitelist__item--inwork"></div>

                            <div className="whitelist__item--buttons">
                                <button className="button whitelist__item--button cansel">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhiteList;