import React from "react";
import { Link } from "react-router-dom";

const Pack = () => {
    return (
        <div className="statistics__inner">
            <h2 className="statistics__title">Packs</h2>

            <div className="statistics__content">
                <div className="statistics__pack--item titles">
                    <p className="statistics__subtitle">Pack</p>

                    <p className="statistics__subtitle">Items</p>

                    <p className="statistics__subtitle">Price</p>

                    <p className="statistics__subtitle">Profit</p>

                    <p className="statistics__subtitle">Description</p>

                    <p className="statistics__subtitle">Properties</p>

                    <p className="statistics__subtitle">Levels</p>

                    <p className="statistics__subtitle">Stats</p>

                    <p className="statistics__subtitle">Unlockable Content</p>

                    <p className="statistics__subtitle">Hidden</p>

                    <p className="statistics__subtitle">Fee % Inv./Cre.</p>

                    <p className="statistics__subtitle">Blockchain</p>

                    <p className="statistics__subtitle">Freeze Metadata</p>

                    <p className="statistics__subtitle">Status</p>

                    <p className="statistics__subtitle">Action</p>
                </div>

                <Link to="../token" className="statistics__pack--item">
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
                            <p className="stats__item--value">Pack name</p>
                        </span>
                    </span>

                    <p className="statistics__creator">1000</p>

                    <span className="statistics__profit">
                        <img
                            src="/assets/img/eth.svg"
                            alt="eth"
                            className="eth"
                        />

                        <p className="statistics__profit--val">0,01</p>
                    </span>

                    <span className="statistics__profit">
                        <img
                            src="/assets/img/eth.svg"
                            alt="eth"
                            className="eth"
                        />

                        <p className="statistics__profit--val">18,531.52</p>
                    </span>

                    <p className="statistics__text">Describe of token123...</p>

                    <p className="statistics__text">Type/ Name</p>

                    <p className="statistics__text">Name/ Value</p>

                    <p className="statistics__text">Name/ Value</p>

                    <p className="statistics__text">Text text text</p>

                    <p className="statistics__account">No</p>

                    <p className="statistics__page center">4.5/0.5</p>

                    <p className="statistics__text">Ethereum</p>

                    <p className="statistics__creator">Yes</p>

                    <p className="statistics__creator">Book</p>

                    <button className="button statistics__button blue">
                        Mint
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Pack;
